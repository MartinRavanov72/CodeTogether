import { AUTH, START_LOADING, LOGOUT, SHARING_ROOM, JOINED_USER } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isLoading: false, sharingUrl: null, joinedUsers: [], loading: false, errors: undefined }, action) => {
  switch (action.type) {
    case AUTH:
      if (!action.error) {
        localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      }

      return { ...state, loading: false, errors: action.error };
    case LOGOUT:
      localStorage.clear();
      return { ...state, loading: false, errors: undefined };
    case START_LOADING:
      return { ...state, isLoading: true };
    case SHARING_ROOM:
      localStorage.setItem('sharingUrl', action.data?.sharingUrl);
      return { ...state, loading: false, sharingUrl: action.data?.sharingUrl }
    case JOINED_USER:
      const newUser = action.data.user;
      const updatedUsers = state.joinedUsers.filter(joinedUser => joinedUser.email !== newUser.email).concat(newUser);
      return { ...state, joinedUsers: updatedUsers };
    default:
      return state;

  }
};

