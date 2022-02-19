import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import JoinedUsersList from './JoinedUsersList';
import SessionLink from './SessionLink';
import { connect } from 'react-redux';

const SessionInfoDialog = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button variant="outlined" onClick={() => setOpen(true)}>
                Session Info
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Session Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here you can copy the link for the current session and see who joined.
                    </DialogContentText>
                    <SessionLink />
                    <JoinedUsersList />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


const mapStateToProps = state => {
    return {
        sharingUrl: state.users.sharingUrl
    };
};

export default connect(mapStateToProps)(SessionInfoDialog);
