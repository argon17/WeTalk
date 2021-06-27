import React, {useState, useEffect} from 'react'
import AddChannel from './AddChannel'
import { Button, Divider } from '@material-ui/core'
import {AddBoxOutlined} from '@material-ui/icons'
import { db } from '../Firebase/Firebase'
import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import firebase from 'firebase/app'
import { useHistory } from 'react-router-dom'
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles((theme)=>({
    addChannelButton:{
        margin: theme.spacing(2)
    },
    channel:{
        paddingLeft: theme.spacing(5),
        boxShadow: '1px 1px black'
    }
}))

const Channels = ({user}) => {

    const [addChannelDialog, setAddChannelDialog] = useState(false);
    const [channelList, setChannelList] = useState([]);
    const history = useHistory();
    const classes = useStyles();

    const handleAddChannel = () => {
        setAddChannelDialog(!addChannelDialog);
    };

    const addChannel = (cName) => {
        if (cName) {
          // channels => channelname, messages, members
          console.log(cName);
          let users = [];
          users.push(user);
          db.collection("channels")
            .add({ 
                channelName: cName,
                members: users
            })
            .then((chRef) => {
              const obj = {
                  channelName: cName,
                  id: chRef.id
              }
              console.log("added new channel", chRef.id);
              db.collection("users").doc(user).update({
                channels: firebase.firestore.FieldValue.arrayUnion(obj)
              })
            })
            .then((err) => {
              console.log(err);
            });
        }
    };

    const navigateToChat = (id) => {
        history.push(`/channel/${id}`);
    };

    useEffect(() => {
        if(user){
            db.collection("users").doc(user)
            .onSnapshot((doc) => {
                // console.log("Current data: ", doc.data().channels)
                setChannelList(
                    doc.data().channels.map((channel, key)=>({
                        channelName : channel.channelName,
                        id: channel.id
                    }))
                )
            });
        }
    }, [user]);

    return (
        <div>
            {addChannelDialog ? 
                <AddChannel create = {addChannel} toggle = {handleAddChannel} /> :
                null
            }
            <Button
                className={classes.addChannelButton}
                color="primary"
                endIcon={<AddBoxOutlined/>}
                onClick={handleAddChannel}
                variant="contained"
            >
                Add Channel
            </Button>
            <Divider/>
            <List component="div" disablePadding>
                {channelList.map((channel) => (
                    <ListItem 
                        key={channel.id} 
                        button 
                        onClick={() => navigateToChat(channel.id)}
                        className={classes.channel}
                    >
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary={channel.channelName} />
                    </ListItem>
                ))}
            </List>
            
        </div>
    )
}

export default Channels

