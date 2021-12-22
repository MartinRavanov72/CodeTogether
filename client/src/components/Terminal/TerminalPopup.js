import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Popup from 'reactjs-popup';
import TerminalController from './TerminalController';

const TerminalPopup = () => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    return (
        <div>
          <Button variant="contained" onClick={() => setOpen(o => !o)}>
            Launch Terminal
          </Button>
          
          <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <TerminalController />
          </Popup>
        </div>
    );
}

export default TerminalPopup;