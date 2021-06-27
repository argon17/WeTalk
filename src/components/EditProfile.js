import React, {useEffect, useState} from 'react'
import { Dialog } from '@material-ui/core'
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Button } from '@material-ui/core';
import { db } from "../Firebase/Firebase";

const EditProfile = ({toggle, alert}) => {

    const [dialog,setDialog] = React.useState(true);
    const [userName, setUserName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [uid, setUid] = useState("");

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userDetails"));
        setUserName(userData.name);
        setDisplayName(userData.displayName);
        setEmail(userData.email);
        setUid(userData.uid);
    }, []);

    function handleCloseDialog(){
        setDialog(false);
        toggle();
    }

    const updateProfile = () => {
        db.collection("users")
          .doc(uid)
          .update({
            displayName: displayName,
          })
          .then((res) => {
            alert();
          })
          .catch((err) => {
            console.log(err);
          });
    
        setDialog(false);
        toggle();
    };

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
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Display Name"
                        margin="dense"
                        name="displayName"
                        onChange={(e) => {
                          setDisplayName(e.target.value);
                        }}
                        value={displayName}
                    />
                    <TextField
                        fullWidth
                        disabled
                        label="Email"
                        margin="dense"
                        name="email"
                        value={email}
                    />
                    <TextField
                        fullWidth
                        disabled
                        margin="dense"
                        label="Name"
                        name="name"
                        value={userName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button 
                        color="secondary"
                        onClick={handleCloseDialog}
                    >
                        Cancel
                    </Button>
                    <Button 
                        color="default"
                        onClick={updateProfile}
                        variant="outlined"
                    >
                        Update
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}

export default EditProfile
