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

    let localStorageCode = localStorage.getItem("code");

    if (currentUser && currentUser.code && currentUser.code !== localStorageCode) {
        localStorageCode = currentUser.code;
    } else {
        localStorageCode = localStorageCode || "console.log('Hello World!');";
    }

    localStorage.setItem('code', localStorageCode);

    if (!window.isCtrlSSet) {
        window.isCtrlSSet = true;
        document.addEventListener('keydown', function (e) {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                saveCodeToDb();
            }
        });
    }

    function saveCodeToDb() {
        let options = {
            'presets': ['es2016']
        };

        localStorageCode = localStorage.getItem("code");

        try {
            localStorageCode = window.Babel.transform(localStorageCode, options).code;
        } catch (e) {
            
        }
        localStorage.setItem('code', localStorageCode);

        const profile = JSON.parse(localStorage.getItem("profile"));
        
        if (profile) {
            dispatch(saveCode(profile.result._id, { code: localStorageCode } ));
        }
    }

    function onChange(newVal) {
        localStorage.setItem('code', newVal);
        localStorageCode = newVal;
    }

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {user && <Button id="saveButton" variant="contained" onClick={saveCodeToDb}>SAVE</Button>}
                <TerminalPopup />
            </Box>
            <Editor
                height="70vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                onChange={onChange}
                value={localStorageCode}
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

