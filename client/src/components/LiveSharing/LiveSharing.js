import { Box, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { isSharingActive, stopSharing } from "../../api";
import { removeHost } from "./api";
import SessionInfoDialog from "./SessionInfoDialog";
import StartLiveSharingDialog from "./StartLiveSharingDialog";

const LiveSharing = ({ user }) => {
    const history = useHistory();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (user && !isActive) {
            isSharingActive(user._id)
                .then(({ data }) => {
                    const { active } = data;
                    if (!active) {
                        history.push('/');
                    } else {
                        setIsActive(true);
                    }
                });
        }
    }, [user]);

    const onStopSharingClicked = () => {
        stopSharing(user._id);
        removeHost(user._id);
        setIsActive(false);
    };

    return user ? (
        <>
            {isActive ?
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                    <SessionInfoDialog />
                    <Button id="stopSharing" variant="contained" color="secondary" onClick={onStopSharingClicked}>Stop Sharing</Button>
                </Box> : <StartLiveSharingDialog setIsLive={() => setIsActive(true)} user={user}/>}
        </>
    ) : null;
};

export default LiveSharing;