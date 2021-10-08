import React, { useReducer } from "react";
import axios from "axios";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import {
  ADD_NOTE,
  CHANGE_COMPLETED,
  FETCH_NOTES,
  REMOVE_NOTE,
  SHOW_LOADER,
} from "../types";

const url = process.env.REACT_APP_DB_URL;
let initialState = {
  notes: [],
  loading: false,
};

export const FirebaseState = ({ children }) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchNotes = async () => {
    const res = await axios.get(`${url}/notes.json`);
    if (res.data === null || res.data === undefined) {
      return showLoader();
    } else {
      const payload = Object.keys(res.data).map((key) => {
        return {
          ...res.data[key],
          id: key,
        };
      });

      dispatch({
        type: FETCH_NOTES,
        payload,
      });
    }
  };

  const addNote = async (title) => {
    const note = {
      title,
      completed: false,
      date: new Date().toLocaleString(),
    };
    try {
      const res = await axios.post(`${url}/notes.json`, note);

      const payload = {
        ...note,
        id: res.data.name,
      };

      dispatch({
        type: ADD_NOTE,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const removeNote = async (id) => {
    await axios.delete(`${url}/notes/${id}.json`);

    dispatch({
      type: REMOVE_NOTE,
      payload: id,
    });
  };
  const toggleCompleted = async (id, completed, title) => {
    const note = {
      title,
      completed: completed,
      date: new Date().toLocaleString(),
    };
    try {
      await axios.put(`${url}/notes/${id}.json`, note);
      dispatch({
        type: CHANGE_COMPLETED,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        showLoader,
        addNote,
        removeNote,
        fetchNotes,
        toggleCompleted,
        loading: state.loading,
        notes: state.notes,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
