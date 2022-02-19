import React, { useEffect, useState } from 'react';
import { List, ListSubheader, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { getJoinedUsers } from '../../api';

const JoinedUsersList = () => {
    const [joinedUsers, setJoinedUsers] = useState([]);

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('profile')).result._id;
        getJoinedUsers(userId)
            .then(({ data }) => {
                setJoinedUsers(data);
            });

        return () => setJoinedUsers([]);
    }, []);

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListSubheader>Users in current session</ListSubheader>

            {joinedUsers.length !== 0 ?
                joinedUsers.map(user => {
                    return (
                        <ListItem key={user.email} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="User Profile Picture" src={user.img} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.name}
                                secondary={user.email}
                            />
                        </ListItem>
                    )
                }) : null
            }

        </List>
    );
}


export default JoinedUsersList;
