import React, {useState} from 'react'
import {db, storage} from '../Firebase/Firebase'
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app'
import { Dialog, 
    DialogTitle,
    DialogActions, 
    DialogContent, 
    TextField, 
    Button, 
    Box, 
    LinearProgress, 
    Typography,
    makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    thumbnail : {
        width: theme.spacing(40),
        objectFit: 'contain'
    }
}))

const ImageUpload = ({ setState, file }) => {

    const classes = useStyles();

    const [dialog,setDialog] = useState(true);
    const [caption, setCaption] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [progressBar, setProgressBar] = useState({ display: "none" });
    const params = useParams();

    const handleCloseDialog = () => {
        setDialog(false);
        setState();
    };

    const sendMsg = (downloadURL) => {
        if (params.id) {

            const userData = JSON.parse(localStorage.getItem("userDetails"));
            // console.log(userData);
            if (userData) {
                const displayName = userData.displayName;
                const imgUrl = userData.imgURL;
                const uid = userData.uid;
                const postImg = downloadURL;

                const obj = {
                    text: caption,
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

            setCaption("");
        }
    }

    const handleImageUpload = e => {
        e.preventDefault();
        setProgressBar({ display: "block" });
        const uploadRef = storage.ref(`images/${file.name}`).put(file);
        uploadRef.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            let uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(uploadProgress);
          },
          (error) => {
            // on error
            console.log(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
              sendMsg(downloadURL);
            });
            handleCloseDialog();
          }
        );
    }

    const fileObj = URL.createObjectURL(file);

    return (
        <div>
            <Dialog
                onClose={handleCloseDialog}
                PaperProps={{
                    style: {
                      background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                      boxShadow: "none"
                    },
                  }}
                // style={{backgroundColor:'transparent'}}
                open={dialog}
            >
                <DialogTitle>Upload Image</DialogTitle>
                <DialogContent>
                <form
                    autoComplete="off"
                    onSubmit={(e) => {
                        handleImageUpload(e);
                    }}
                >
                    <img 
                        alt="user_file"
                        src={fileObj}
                        className={classes.thumbnail}
                    />
                    <TextField
                        fullWidth
                        label="Add Caption"
                        margin="dense"
                        name="caption"
                        onChange={(e) => {
                            setCaption(e.target.value);
                        }}
                        value={caption}
                    />
                </form>

                <div style={progressBar}>
                    <Box display="flex" alignItems="center">
                    <Box width="100%" mr={1}>
                        <LinearProgress variant="determinate" value={uploadProgress} />
                    </Box>
                    <Box minWidth={35}>
                        <Typography variant="body2">{Math.round(uploadProgress)}%</Typography>
                    </Box>
                    </Box>
                </div>
                </DialogContent>
                <DialogActions>
                    <Button 
                        color="secondary"
                        onClick={handleCloseDialog}
                    >
                        Cancel
                    </Button>
                    <Button
                        autoFocus
                        type="submit"
                        color="default"
                        onClick={(e) => handleImageUpload(e)}
                        variant="outlined"
                    >
                        Upload
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}

export default ImageUpload
