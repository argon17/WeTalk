import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import {db} from '../Firebase/Firebase'
import firebase from 'firebase/app'
import { Typography, Grid, TextField, IconButton, makeStyles } from '@material-ui/core';
import ScrollableFeed from "react-scrollable-feed";
import Message from './Message'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonTwoToneIcon from '@material-ui/icons/InsertEmoticonTwoTone';
import ImageUpload from './ImageUpload';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme)=>({

    inputFile: {
        display: "none",
    },
    footer: {
        [theme.breakpoints.up('sm')]: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
    },
    footerContent: {
        display: "flex",
        backgroundColor: theme.palette.primary.main,
        alignItems: "center",
        borderRadius: "5px",
    },
    form:{
        display:"flex",
        width:'100%'
    },
    chat: {
        position: "relative",
        height: "calc(100vh - 150px)",
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
    },
    channel_name:{
        backgroundColor:"#2C5364",
        // margin: theme.spacing(3)
    },
    empty:{
        color: 'grey',
        margin: theme.spacing(10)
    }
}))

const Chat = () => {

    const classes = useStyles();
    const params = useParams();
    const history = useHistory();
    const [allMessages, setAllMessages] = useState([]);
    const [channelName, setChannelName] = useState("");
    const [userNewMsg, setUserNewMsg] = useState("");
    const [dialogState, setDialogState] = useState(false);
    const [file, setFileName] = useState(null);

    useEffect(() => {

        const userData = JSON.parse(localStorage.getItem("userDetails"));
        
        // params.id => channel id
        if (params.id && userData) {
            // console.log(userData);
            const uid = userData.uid;
            const userChannels = userData.channels;
                      
            db.collection("channels")
            .doc(params.id)
            .onSnapshot((doc) => {
                // console.log(JSON.stringify(doc.data()));
                if(doc.data()){
                    setChannelName(doc.data().channelName);
                }
            });
    
            db.collection("channels")
            .doc(params.id)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => {
              setAllMessages(
                snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
              );
            });
            if (userChannels.indexOf(params.id) === -1) {
                // console.log("user doesn't exist, adding user to this channel");
                db.collection("channels")
                .doc(params.id).get()
                .then((doc) => {
                    if (doc.exists) {
                        // console.log("Document data:", doc.data());
                        const cName = doc.data().channelName;
                        const obj = {
                            channelName: cName,
                            id: params.id
                        }
                        db.collection("users").doc(uid).update({
                            channels: firebase.firestore.FieldValue.arrayUnion(obj)
                        })
                        db.collection("channels").doc(params.id).update({
                            members: firebase.firestore.FieldValue.arrayUnion(uid)
                        })
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            } 

        }
    }, [params, history]);

    const sendMsg = (e) => {
        e.preventDefault();
        if (userNewMsg && params.id) {

            const userData = JSON.parse(localStorage.getItem("userDetails"));
            // console.log(userData);
            if (userData) {
                const displayName = userData.displayName;
                const imgUrl = userData.imgURL;
                const uid = userData.uid;
                const postImg = null;

                const obj = {
                    text: userNewMsg,
                    timestamp: firebase.firestore.Timestamp.now(),
                    userImg: imgUrl,
                    userName: displayName,
                    uid: uid,
                    postImg: postImg,
                };

                db.collection("channels")
                    .doc(params.id)
                    .collection("messages")
                    .add(obj)
                    .then((res) => {
                        console.log("message sent");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }

            setUserNewMsg("");
        }
    };

    const handleUploadDialog = () => {
        setDialogState(!dialogState);
    };

    const handelFileUpload = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
          setFileName(e.target.files[0]);
          handleUploadDialog();
        }
        e.target.value = null;
    };

    return (
        <div>
            {dialogState && <ImageUpload setState={handleUploadDialog} file={file} /> }
            <Grid item xs={12} className={classes.channel_name}>
                <Typography>{channelName}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.chat}>
                <ScrollableFeed>
                    {allMessages.length > 0 ? 
                        allMessages.map((message) => (
                            <Message
                                key={message.id}
                                values={message.data}
                                msgId={message.id}
                            />
                        )) : 
                        <Typography className={classes.empty}>
                            Add People. Start Chatting :)
                            <br/>
                            You can add people using the URL of this chat.
                        </Typography>
                    }
                </ScrollableFeed>
            </Grid>
            <div className={classes.footer}>
                <Grid item xs={12} className={classes.footerContent} >
                    <input
                        accept="image/*"
                        id="input-file"
                        className={classes.inputFile}
                        type="file"
                        onChange={(e) => handelFileUpload(e)}
                    />
                    <label htmlFor="input-file">
                        <IconButton
                            aria-label="upload picture"
                            component="span"
                        >
                            <AttachFileIcon/>
                        </IconButton>
                    </label>

                    <IconButton
                        component="button"
                    >
                        <InsertEmoticonTwoToneIcon/>
                    </IconButton>
                    <form
                        autoComplete="off"
                        onSubmit={(e) => sendMsg(e)}
                        className={classes.form}
                    >
                        <TextField 
                            required
                            fullWidth
                            multiline
                            rows={1}
                            rowsMax={2}
                            value={userNewMsg}
                            onChange={(e) => {
                                setUserNewMsg(e.target.value);
                            }}
                            margin="normal"
                            placeholder="Enter Message"
                        />
                        <IconButton type="submit" component="button">
                            <SendIcon/>
                        </IconButton>
                    </form>
                </Grid>
            </div>
        </div>
    )
}

export default Chat
