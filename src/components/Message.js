import React, {useState} from 'react'
import { Avatar, makeStyles, Typography, Card, CardContent, CardHeader, IconButton, CardMedia } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteDialog from './DeleteDialog';
import {db} from '../Firebase/Firebase';

const useStyles = makeStyles((theme)=> ({
    container:{
        background: "linear-gradient(to right, rgba(72, 85, 99, 0.5), rgba(41, 50, 60, 0.5))",
        "&:hover": {
            background: "linear-gradient(to right, rgba(70, 87, 98, 0.9), rgba(40, 51, 61, 0.9))",
        },
    },
    header:{
        textAlign: 'left'
    },
    text:{
        textAlign: 'left',
        marginLeft: theme.spacing(5),
        color: "white"
    },
    media : {
        marginTop: theme.spacing(2)
    },
    post_img: {
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(80),
        },
        width: theme.spacing(40),
        objectFit: 'contain'
    }
}))

const Message = ({ values, msgId }) => {

    const classes = useStyles();
    // const params = useParams();
    const uid = JSON.parse(localStorage.getItem("userDetails")).uid;
    const ownerUid = values.uid;
    const date = values.timestamp.toDate();
    let day = date.getDate().toString();
    day = day.length < 2 ? "0"+day : day;
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    month = month.length < 2 ? "0"+month : month;
    let hour = date.getHours().toString();
    hour = hour.length < 2 ? "0"+hour : hour;
    let minute = date.getMinutes().toString();
    minute = minute.length < 2 ? "0"+minute : minute;
    const time = `${day}/${month}/${year}   ${hour}:${minute}`;


    const postImg = values.postImg;
    const channelId = useParams().id;
    const [deleteDialog, setDeleteDialog] = useState(false);

    const handleDeleteDialog = () => {
        setDeleteDialog(!deleteDialog);
    }

    const deleteMsg = (id) => {
        db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .doc(id)
        .delete()
        .then((res) => {
        console.log("deleted successfully");
        })
        .catch((err) => {
        console.log(err);
        });
    }

    return (
        <div>
            {/* <p>{JSON.stringify(values)}</p> */}
            {deleteDialog && <DeleteDialog
                msgId={msgId}
                text={values.text}
                postImg={postImg}
                deleteMsg={deleteMsg}
                handleDialog={handleDeleteDialog}
            />}
             <Card className={classes.container}>
                <CardHeader
                    avatar={
                    <Avatar 
                        aria-label="user-pic" 
                        className={classes.avatar}
                        alt={values.userName}
                        src={values.userImg}
                    >
                    </Avatar>
                    }
                    action={
                    <IconButton 
                        aria-label="delete"
                        onClick={handleDeleteDialog}
                    >
                        {uid===ownerUid && <DeleteIcon />}
                    </IconButton>
                    }
                    title={values.userName}
                    subheader={time}
                    className={classes.header}
                />
                <CardContent>
                    <Typography 
                        variant="body2" 
                        color="textSecondary" 
                        component="p"
                        className={classes.text}
                    >
                        {values.text}
                    </Typography>
                    {postImg && <CardMedia
                        className={classes.media}
                        title="post_img"
                    >
                        <img src={postImg} alt="post_img" className={classes.post_img}/>
                    </CardMedia>}
                </CardContent>
            </Card>
        </div>
    )
}

export default Message
