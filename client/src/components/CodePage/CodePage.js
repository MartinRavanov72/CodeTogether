import React, { useState, useEffect } from 'react';
import { Box, Button } from "@material-ui/core";
import Editor from "@monaco-editor/react";
import TerminalPopup from "../Terminal/TerminalPopup";
import { useDispatch } from 'react-redux';
import { saveCode } from '../../actions/userAction';
import { connect } from "react-redux";

const CodePage = ({ currentUser }) => {
    const user = localStorage.getItem("profile");
    const dispatch = useDispatch();

    const [code, setCode] = useState(() => {
        const localStorageSaved = localStorage.getItem("code");
        if (currentUser && currentUser.code && currentUser.code !== localStorageSaved) {
            return currentUser.code;
        }

        return localStorageSaved || "console.log('Hello World!');";
    });

    useEffect(() => {
        localStorage.setItem('code', code);
    }, [code]);

    function saveCodeToDb() {
        const profile = JSON.parse(localStorage.getItem("profile"));
        if (profile) {
            dispatch(saveCode(profile.result._id, { code }));
        }
    }

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {user && <Button variant="contained" onClick={saveCodeToDb}>SAVE</Button> }
                <TerminalPopup />
            </Box>
            <Editor
                height="70vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue={code}
                onChange={setCode}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.users.currentUser
    };
};

export default connect(mapStateToProps)(CodePage);

