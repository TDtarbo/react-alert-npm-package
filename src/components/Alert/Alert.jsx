// Alert.js
import React from "react";
import { useContext, useEffect, useRef } from "react";
import { AlertContext } from "../AlertProvider/AlertProvider.jsx";
import "../styles.css"

const Alert = ({ data }) => {

  const ref = useRef()
  const { removeAlert } = useContext(AlertContext);

  const { type, title, description, btn, id } = data;

  const optionalAction = btn?.optionalAction;
  const mandatoryAction = btn?.mandatoryAction;

  //Adding animation
  useEffect(() => {

    const timer = setTimeout(() => {
        ref.current.classList.add("show");
    }, 10);

    return (() => clearTimeout(timer))
  },[]);
  
  const closeAlert = () => {
    ref.current.classList.remove("show");
    setTimeout(() => {
      removeAlert(id);
    }, 200);
  }

  //Add timer to dismiss the alert
  if (!btn) {
    useEffect(() => {
      const timer = setTimeout(() => {
        closeAlert()
      }, 3000);

      return () => clearTimeout(timer);
    }, []);
  }

  const handleOptionalBtn = () => {
    closeAlert();
    if (optionalAction) optionalAction();
  };

  const handleMandatoryBtn = () => {
    closeAlert();
    if (mandatoryAction) mandatoryAction();
  };
  
  return (

    <table className="custom-alert" ref={ ref } >
      <tbody>
        <tr>
          <td>
            {(() => {
              switch (type) {
                case "success":
                  return (
                    
                    <svg
                      className="svg svg-success"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  );
                case "error":
                  return (
            
                    <svg
                      className="svg svg-error"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  );
                default:
                  return null; // If type doesn't match, return null
              }
            })()}
          </td>
          <td>
            <div className="alert-content">
              <div>
                <h3 className="title">{title}</h3>
                {description && <div className="description">{description}</div>}
              </div>
              { 
                btn && (

                  <div className="btn-container">

                    {/* Action button */}
                    {(mandatoryAction || optionalAction) &&
                      <button 
                        onClick={ 
                          mandatoryAction ? 
                          handleMandatoryBtn : handleOptionalBtn}
                          className="alert-button"
                      >
                        {btn.title}
                      </button>
                    }

                    {/* Close button */}
                    {!mandatoryAction && 
                      <button
                        onClick={closeAlert}
                        className={
                          `alert-button 
                          ${type == "error" ? "button-red-outline" : "button-indigo-outline"}`}
                      >
                        {optionalAction ? "Close" : btn.title}
                      </button>
                    }
                  </div>
              )
              } 
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Alert;
