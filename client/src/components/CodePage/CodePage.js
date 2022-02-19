import React, { useState, useEffect } from 'react';
import { Box } from "@material-ui/core";
import Editor from "@monaco-editor/react";
import TerminalPopup from "../Terminal/TerminalPopup";
import LiveSharing from '../LiveSharing/LiveSharing';
import { subscribeToCodeEditor, saveCode, addSpectator } from '../LiveSharing/api';
import { getSharing, joinSharing } from '../../api';
import { useHistory } from 'react-router-dom';

const CodePage = (props) => {
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [code, setCode] = useState('');
    const existingCode = localStorage.getItem('code');
    const [localStorageCode, setLocalStorageCode] = useState(existingCode ? existingCode : 'console.log(\'Hello World!\');');
    const [isHost, setIsHost] = useState(true);
    const [allowUserType, setAllowUserType] = useState(true);

    useEffect(() => {
        localStorage.setItem('code', localStorageCode);
    }, [localStorageCode]);


    useEffect(() => {
        const sharingId = props.match.params.sharingId;

        if (sharingId) {
            getSharing(sharingId)
                .then(({ data }) => {
                    const { live, guest, userType } = data;

                    if (!live) {
                        history.push('/not-found');
                        return;
                    } else {
                        const localStorageUser = localStorage.getItem('profile');
                        if (!guest && !localStorageUser) {
                            history.push('/signIn');
                        } else {
                            setAllowUserType(userType);

                            let joiningUser = {};
                            let spectatorId;

                            if (localStorageUser) {
                                const user = JSON.parse(localStorageUser).result;
                                spectatorId = user.email;
                                joiningUser = {
                                    name: user.name,
                                    email: user.email,
                                    img: user.img,
                                };
                            }

                            joinSharing(sharingId, joiningUser);
                            addSpectator(spectatorId, sharingId)
                            subscribeToCodeEditor(sharingId, ({ code }) => {
                                setCode(code);
                            });
                            setIsHost(false);
                        }
                    }
                })
                .catch(() => {
                    history.push('/not-found');
                })
        } else {
            const localStorageUser = localStorage.getItem('profile');
            if (!localStorageUser) return;

            const user = JSON.parse(localStorageUser).result;
            if (!!user && Object.keys(user) !== 0) {
                setIsHost(true);
                setUser(user);
                subscribeToCodeEditor(user._id, (data) => {
                    const { code } = data;
                    setCode(code);
                });
            }
        }

        return () => {
            setLocalStorageCode('');
            setCode('');
            setUser(null);
        }
    }, []);

    function onChange(newVal) {
        if (!allowUserType) {
            const currentCode = code;
            setCode(' ');
            setCode(currentCode);
            return;
        }

        const sharingId = props.match.params.sharingId;

        if (sharingId) {
            saveCode(sharingId, newVal);
        } else if (!!user && Object.keys(user).length !== 0) {
            saveCode(user._id, newVal);
        }

        setLocalStorageCode(newVal);
    }

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {isHost ? (
                    <LiveSharing user={user} />
                ) : <div />}
                <TerminalPopup />
            </Box>

            <Editor
                height="70vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                onChange={onChange}
                value={code ? code : localStorageCode}
            />
        </div>
    )
}

export default CodePage;

