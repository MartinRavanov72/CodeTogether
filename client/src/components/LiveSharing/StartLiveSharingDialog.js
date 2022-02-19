import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormGroup,
    FormControlLabel,
    Switch
} from '@material-ui/core';

import { startSharing } from '../../actions/userAction';
import { addHost } from './api';

const StartLiveSharingDialog = ({ user, setIsLive }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [guestSwitch, setGuestSwitch] = useState(true);
    const [userTypeSwitch, setUserTypeSwitch] = useState(true);
    const [requestedUsers, setRequestedUsers] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        return () => setRequestedUsers([]);
    }, [requestedUsers]);

    const onSubscribe = () => {
        setIsLive();
        dispatch(startSharing({ userId: user._id, guest: guestSwitch, userType: userTypeSwitch, live: true }));
        addHost(user._id);
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Start Live Sharing
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Start Live Sharing Code</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        After you click submit a link will be generated which you can share with a user.
                    </DialogContentText>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked
                                    onClick={() => setGuestSwitch(!guestSwitch)}
                                    color="primary" />
                            }
                            label="Allow Guests to join" />
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked
                                    onClick={() => setUserTypeSwitch(!userTypeSwitch)}
                                    color="primary" />
                            } label="Allow user to type" />
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={onSubscribe}>Start sharing</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default StartLiveSharingDialog;