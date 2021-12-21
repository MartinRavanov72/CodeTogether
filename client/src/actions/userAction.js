import { AUTH, FETCH_USER, START_LOADING } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchUser(id);

    dispatch({ type: FETCH_USER, payload: { user: data.user } });
  } catch (error) {
    console.log(error);
  }
};

export const signIn = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data, error: undefined });

    router.push('/');
  } catch (error) {
    dispatch({ type: AUTH, data: undefined, error: error.response.data.message });
  }
};

export const signUp = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data, error: undefined });

    router.push('/');
  } catch (error) {
    dispatch({ type: AUTH, data: undefined, error: error.response.data.message });
  }
};


