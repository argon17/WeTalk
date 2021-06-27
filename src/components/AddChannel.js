import React, {useState} from 'react'
import { Dialog } from '@material-ui/core'
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Button } from '@material-ui/core';

const AddChannel = ({create, toggle}) => {

    const [dialog,setDialog] = useState(true);
    const [cName, setCName] = useState("");

    function handleCloseDialog(){
        setDialog(false);
        toggle();
    }

    const handleNewRoom = (e) => {
        e.preventDefault();
        if (cName) {
          create(cName);
          toggle();
        }
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
                <DialogTitle>Add Channel</DialogTitle>
                <DialogContent>
                <TextField
                    fullWidth
                    label="Channel Name"
                    margin="dense"
                    name="cName"
                    onChange={(e) => {
                        setCName(e.target.value);
                    }}
                    value={cName}
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
                        onClick={e => handleNewRoom(e)}
                        variant="outlined"
                    >
                        Add Channel
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}

export default AddChannel
