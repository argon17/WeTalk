import React from 'react'
import { Avatar, makeStyles, Typography, Card, CardContent, CardHeader, IconButton, CardMedia } from '@material-ui/core';
// import { useParams } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const time = `${day}/${month}/${year}   ${hour}:${minute}`;


    const postImg = values.postImg;

    // const channelId = useParams().id;

    return (
        <div>
            {/* <p>{JSON.stringify(values)}</p> */}
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
                    <IconButton aria-label="more">
                        {uid===ownerUid && <MoreVertIcon />}
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
