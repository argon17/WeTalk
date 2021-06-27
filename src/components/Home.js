import React, {useState, useEffect} from 'react'
import { db } from '../Firebase/Firebase';
import { Grid, 
    Card, 
    CardActionArea,
    CardContent,
    Avatar,
    Typography,
    makeStyles } from '@material-ui/core';
import Promo from './Promo';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme=>({
    container:{
        padding: theme.spacing(2),
    },
    content:{
        display:'flex',
        justifyContent:'space-between',
        background: "linear-gradient(to right, rgba(72, 85, 99, 0.5), rgba(41, 50, 60, 0.5))"
    },
    card_container:{
        padding: theme.spacing(2),
    },
    card:{
        display: "flex",
        padding: theme.spacing(10),
        height: theme.spacing(30),
    },
    channel_avatar:{
        height: theme.spacing(10),
        width: theme.spacing(10),
        backgroundColor:theme.palette.primary.main,
        fontSize:'2rem',
        color:'#ffffff'
    },
    channel_name:{
        paddingTop: theme.spacing(5)
    }
}));

const Home = ({user}) => {

    const [channelList, setChannelList] = useState([]);
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
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
    }, [user]);

    const navigateToChat = (id) => {
      history.push(`/channel/${id}`);
    };

    return (
      <div>
        <Promo/>
        {/* {console.log(channelList.length)} */}
        {channelList.length > 0 ?
        <Grid container className={classes.container}>
        {channelList.map((channel) => (
          <Grid
            item
            xs={6}
            md={3} 
            className={classes.card_container}
            key={channel.id}
          >
            <Card className={classes.content} variant="outlined">
              <CardActionArea 
                className={classes.card} 
                onClick={() => navigateToChat(channel.id)}
              >
                <CardContent>
                  <Avatar
                    variant="square"
                    className={classes.channel_avatar}
                  >
                    {channel.channelName.substr(0, 1).toUpperCase()}
                  </Avatar>
                  <Typography className={classes.channel_name} >
                    {channel.channelName}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        </Grid> : 
        <div>
          <Typography>
            Seems, there are no channels, create a channel first.
          </Typography>
        </div>}
      </div>
    )
}

export default Home
