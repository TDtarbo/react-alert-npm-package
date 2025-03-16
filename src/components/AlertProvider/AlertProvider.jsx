import React from "react";
import { createContext, useState } from "react";
import Alert from "../Alert/Alert.jsx";
import "../styles.css"

const AlertContext = createContext({});

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState([]);

  const displayAlert = (newAlert) => {
    setAlert(previousAlerts => {return [ newAlert,...previousAlerts]})
  }

  const removeAlert = (id) => {
      setAlert((prevData) => prevData.filter((alert) => alert.id !== id));
  }

  return (
    <AlertContext.Provider value={{ displayAlert, removeAlert }}>
      {
        !alert.length ? null: <div className="alert-container">
        {alert.map((data, key) => (
          <Alert key={data.id} data={{ ...data, key }} />
        ))}
      </div>
      }
      
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider
export { AlertContext };
