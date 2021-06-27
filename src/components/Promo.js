import { Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
    container:{
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        boxShadow:
          "0px 3px 4px -1px rgb(0 0 0 / 17%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 92%)",
        color: "rgb(220, 221, 222)",
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
