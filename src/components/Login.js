import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { auth, provider } from "../Firebase/Firebase"

const useStyles = makeStyles(theme=>({
    main:{
        height:'100',
    },
    lgn_btn:{
        marginTop: theme.spacing(40)
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
            <Button 
                color="primary"
                variant="contained"
                className={classes.lgn_btn}
                onClick={signInWithGoogle}
            >
                Get Started
            </Button>
        </div>
    )
}

export default Login
