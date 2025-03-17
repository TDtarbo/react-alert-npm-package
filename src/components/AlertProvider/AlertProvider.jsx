import React, { createContext, useState, useEffect } from "react";
import Alert from "../Alert/Alert.jsx";
import "../styles.css";

const AlertContext = createContext({});

const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]); // Renamed 'alert' to 'alerts' for clarity

  const [pendingAnimations, setPendingAnimations] = useState(0);
  const [pendingAlertsIds, setPendingAlertsIds] = useState([]);

  useEffect(() => {
    const wrappers = document.querySelectorAll(".alert-wrapper");
    wrappers.forEach((wrapper) => {
      const alert = wrapper.querySelector(".custom-alert");
      if (alert) {
        wrapper.style.height = `${alert.clientHeight + 10}px`;
      }
    });

  }, [alerts]);

  const displayAlert = (newAlert) => {
    setAlerts((previousAlerts) => [newAlert, ...previousAlerts]);
  };

  const removeAlert = (id) => {

    const result = alerts.find(item => item.id === id);

    const wrapper = document.getElementById(`${id}`);
    
    wrapper.style.height = `0px`;
    wrapper.style.margin = `0px`;

    setPendingAlertsIds((prev) => [...prev, id]);
    setPendingAnimations((p) => p + 1);

    
    setTimeout(() => {
      setPendingAnimations((p) => p - 1);
    }, result?.animation?.duration * 1000 || 300);
  };

  useEffect(() => {
    if (pendingAnimations === 0 && pendingAlertsIds.length > 0) {
      setAlerts((prevData) => {
        return prevData.filter((alert) => !pendingAlertsIds.includes(alert.id));
      });

      setPendingAlertsIds([]);
    }
  }, [pendingAnimations]);

  return (
    <AlertContext.Provider value={{ displayAlert, removeAlert }}>
      {alerts.length ? (
        <div className="alert-container">
          {alerts.map((data) => (
            <div className="alert-wrapper" id={data.id} key={data.id}>
              <Alert data={data} />
            </div>
          ))}
        </div>
      ) : null}
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
export { AlertContext };
