// Alert.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { AlertContext } from "../AlertProvider/AlertProvider.jsx";
import "../styles.css";

const Alert = ({ data }) => {
  const ref = useRef();
  const { removeAlert } = useContext(AlertContext);

  const { type, title, description, btn, id, animation } = data;


  const optionalAction = btn?.optionalAction;
  const mandatoryAction = btn?.mandatoryAction;
  const animationType = animation?.type || "scale";
  const duration = animation?.duration || .3;


  useEffect(() => {
    
    const wrapper = document.getElementById(`${id}`);
    wrapper.style.transition = `all ${animationType == "slide" ? duration - .12 : duration || .3}s ease-out`;

    ref.current.classList.add(`${animationType}-initial`);
    ref.current.style.transition= `all ${duration}s ease-in-out`; 

    const timer = setTimeout(() => {
      ref.current.classList.add(`${animationType}`);


    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const closeAlert = () => {
    ref.current.classList.remove(`${animationType}`);
    removeAlert(id)
  };


  useEffect(() => {
    if (!btn) {
      const timer = setTimeout(() => {
        closeAlert();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [btn]);

  const handleOptionalBtn = () => {
    closeAlert();
    if (optionalAction) optionalAction();
  };

  const handleMandatoryBtn = () => {
    closeAlert();
    if (mandatoryAction) mandatoryAction();
  };

  return (
    <table className="custom-alert" ref={ref}>
      <tbody>
        <tr>
          <td>
            {type === "success" ? (
              <svg className="svg svg-success" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : type === "error" ? (
              <svg className="svg svg-error" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : null}
          </td>
          <td>
            <div className="alert-content">
              <div>
                <h3 className="title">{title}</h3>
                {description && <div className="description">{description}</div>}
              </div>
              {btn && (
                <div className="btn-container">
                  {(mandatoryAction || optionalAction) && (
                    <button
                      onClick={mandatoryAction ? handleMandatoryBtn : handleOptionalBtn}
                      className="alert-button"
                    >
                      {btn.title}
                    </button>
                  )}
                  {!mandatoryAction && (
                    <button
                      onClick={closeAlert}
                      className={`alert-button ${
                        type === "error" ? "button-red-outline" : "button-indigo-outline"
                      }`}
                    >
                      {optionalAction ? "Close" : btn.title}
                    </button>
                  )}
                </div>
              )}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Alert;