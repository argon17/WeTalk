import React from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import { auth, provider } from "../Firebase/Firebase"
import identity from '../assets/identity.png'

const useStyles = makeStyles(theme=>({
    main:{
        height:'100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lgn_btn:{
        width: theme.spacing(20),
        margin: theme.spacing(5),
        borderRadius: '180px'
    },
    main_text:{
        fontWeight: 'bold'
    },
    avatar:{
        height:25,
        objectFit: 'contain'
    },
    info:{
        // marginRight:50
        display:'flex',
        right:40,
        marginTop: theme.spacing(20)
    }
}));

const Login = () => {
    
    const classes = useStyles();

    const signInWithGoogle = () => {
        auth
        .signInWithPopup(provider)
        .then((res) => {
        // console.log(res);
        })
        .catch((err) => {
        console.log(err);
        });
    };

    return (
        <div className={classes.main}>
            <Typography className={classes.main_text} variant="h2">
                Welcome to
                WeTalk    
            </Typography>
            <Button 
                color="primary"
                variant="contained"
                className={classes.lgn_btn}
                onClick={signInWithGoogle}
            >
                Get Started
            </Button>
            <div className={classes.info}>
                <Typography variant="h6" color="inherit">
                    Developed and designed by argon &nbsp;
                </Typography>
                <a href="https://github.com/argon17" >
                    <img src={identity} className={classes.avatar} alt="argon" />
                </a>
            </div>
        </div>
    )
}

export default Login
