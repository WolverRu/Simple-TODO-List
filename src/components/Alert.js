import React, { useContext } from "react";
import { AlertContext } from "../context/alert/alertContext";
import { CSSTransition } from "react-transition-group";

export const Alert = () => {
  const { alert, hide } = useContext(AlertContext);

  return (
    <CSSTransition
      in={alert.visible}
      timeout={850}
      classNames={"alert"}
      mountOnEnter
      unmountOnExit
    >
      <div
        className={`alert alert-${
          alert.type || "warning"
        } alert-dismissible alert`}
      >
        <strong>Внимание!</strong>
        {alert.text}
        <button
          onClick={hide}
          type="button"
          className="btn-close"
          aria-label="Close"
        >
          <span aria-hidden="true"></span>
        </button>
      </div>
    </CSSTransition>
  );
};
