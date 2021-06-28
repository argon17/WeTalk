import { Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
    container:{
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        backgroundColor: "transparent",
    }
}))

const Promo = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography variant="h4">
                Welcome to WeTalk
            </Typography>
            <Typography variant="h6">
                Let's Communicate !!
            </Typography>
        </div>
    )
}

export default Promo
