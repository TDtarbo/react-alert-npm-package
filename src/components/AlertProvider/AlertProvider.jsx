import React, {
  createContext,
  useState,
  useEffect,
  useRef,
} from "react";
import ReactDOM from "react-dom";
import Alert from "../Alert/Alert.jsx";
import "../styles.css";

const AlertContext = createContext({});

const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const [pendingAnimations, setPendingAnimations] = useState(0);
  const [pendingAlertsIds, setPendingAlertsIds] = useState([]);

  const portalRef = useRef(null);

  useEffect(() => {
    let portalRoot = document.getElementById("alert-portal-root");
    if (!portalRoot) {
      portalRoot = document.createElement("div");
      portalRoot.id = "alert-portal-root";
      document.body.appendChild(portalRoot);
    }
    portalRef.current = portalRoot;
  }, []);

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
    const result = alerts.find((item) => item.id === id);
    const wrapper = document.getElementById(`${id}`);
    if (wrapper) {
      wrapper.style.height = `0px`;
      wrapper.style.margin = `0px`;
    }

    setPendingAlertsIds((prev) => [...prev, id]);
    setPendingAnimations((p) => p + 1);

    setTimeout(() => {
      setPendingAnimations((p) => p - 1);
    }, result?.animation?.duration * 1000 || 300);
  };

  useEffect(() => {
    if (pendingAnimations === 0 && pendingAlertsIds.length > 0) {
      setAlerts((prevData) =>
        prevData.filter((alert) => !pendingAlertsIds.includes(alert.id))
      );
      setPendingAlertsIds([]);
    }
  }, [pendingAnimations]);

  const alertPortalContent = alerts.length ? (
    <div className="alert-container">
      {alerts.map((data) => (
        <div className="alert-wrapper" id={data.id} key={data.id}>
          <Alert data={data} />
        </div>
      ))}
    </div>
  ) : null;

  return (
    <AlertContext.Provider value={{ displayAlert, removeAlert }}>
      {portalRef.current && ReactDOM.createPortal(alertPortalContent, portalRef.current)}
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
export { AlertContext };
