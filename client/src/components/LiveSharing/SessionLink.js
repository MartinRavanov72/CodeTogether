import React, { useState } from "react";
import {
    Snackbar,
    TextField,
    Button
} from "@material-ui/core";

const SessionLink = () => {
    const sessionLink = localStorage.getItem('sharingUrl')
    const [open, setOpen] = useState(false);

    const handleSessionLinkClick = () => {
        navigator.clipboard.writeText(sessionLink);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="primary" size="small" onClick={handleClose}>
                Close
            </Button>
        </React.Fragment>
    );


    return (
        <>
            <TextField
                fullWidth
                id="session-link"
                label="Session Link"
                variant="filled"
                size="medium"
                color="primary"
                value={sessionLink}
                onClick={handleSessionLinkClick}
            />
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Copied to Clipboard"
                action={action}
            />
        </>
    );
}

export default SessionLink;