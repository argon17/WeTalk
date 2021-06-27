import React, { useState } from 'react'
import { Dialog, 
    DialogTitle,
    DialogActions, 
    DialogContent,
    DialogContentText,
    Button,
    makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    thumbnail : {
        width: theme.spacing(40),
        objectFit: 'contain'
    }
}))

const DeleteDialog = ({ msgId, text, deleteMsg, handleDialog, postImg }) => {

    const [dialog, setDialog] = useState(true);
    const classes = useStyles();

    const handleClose = () => {
        setDialog(false);
        handleDialog();
      };
    
      const handleDelete = () => {
        deleteMsg(msgId);
        handleDialog();
      };

    return (
        <div>
                <Dialog
                    open={dialog}
                    PaperProps={{
                        style: {
                          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                          boxShadow: "none"
                        },
                    }}
                    onClose={handleClose}
                >
                    <DialogTitle> Delete Message ? </DialogTitle>

                    <DialogContent>
                    <DialogContentText>
                        {text}
                    </DialogContentText>
                        {postImg && <img
                            src={postImg}
                            alt="post_img"
                            className={classes.thumbnail}
                        />}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>

                    <Button
                        onClick={handleDelete}
                        color="primary"
                        autoFocus
                        variant="contained"
                    >
                        Delete
                    </Button>
                    </DialogActions>
                </Dialog>
        </div>
    )
}

export default DeleteDialog
