import React, { useContext, useEffect } from "react";
import { Form } from "../components/Form";
import { Loader } from "../components/Loader";
import { Notes } from "../components/Notes";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Home = () => {
  const {
    loading,
    notes,
    fetchNotes,
    removeNote,
    toggleCompleted,
    showLoader,
  } = useContext(FirebaseContext);
  useEffect(() => {
    fetchNotes();
    showLoader();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Form />
      <hr />

      {loading ? (
        <Loader />
      ) : (
        <Notes
          notes={notes}
          onRemove={removeNote}
          toggleCompleted={toggleCompleted}
          fetchNotes={fetchNotes}
        />
      )}
    </div>
  );
};
