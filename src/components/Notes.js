import React, { useContext } from "react";
import { AlertContext } from "../context/alert/alertContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export const Notes = ({ notes, onRemove, toggleCompleted, fetchNotes }) => {
  const alert = useContext(AlertContext);

  return (
    <TransitionGroup component="ul" className="list-group">
      {notes.map((note) => (
        <CSSTransition key={note.id} classNames="note" timeout={1000}>
          <li className="list-group-item notes">
            <div>
              <span className={note.completed ? "done" : " "}>
                <input
                  checked={note.completed}
                  className="form-check-input me-1"
                  type="checkbox"
                  onChange={() =>
                    toggleCompleted(
                      note.id,
                      note.completed === false ? true : false,
                      note.title
                    ).then(() => {
                      fetchNotes();
                    })
                  }
                />
                <strong>{note.title}</strong>
              </span>
              <small>{note.date}</small>
            </div>
            <button
              type="button"
              onClick={() =>
                onRemove(note.id).then(() => {
                  alert.show("Заметка была удалена", "danger");
                })
              }
              className="btn btn-danger btn-sm"
            >
              &times;
            </button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
