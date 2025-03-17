import { useContext } from "react"
import { AlertContext } from "../AlertProvider/AlertProvider.jsx"


    //Error Types
    const ERROR = "error";
    const SUCCESS = "success";

    const ANIMATION_TYPES = {
        scale: "scale",
        slide: "slide",
        drop: "drop"
    }

    // Success Titles
    const TITLE_SUCCESS = {

        operationSuccessful: "Operation Successful",
        actionCompleted: "Action Completed",
        taskExecutedSuccessfully: "Task Executed Successfully",
        processFinished: "Process Finished",
        success: "Success!",
        done: "Done!",
    };

    // Error Titles
    const TITLE_ERRORS = {

        somethingWentWrong: "Something went wrong",
        unexpectedErrorOccurred: "An unexpected error occurred",
        problemOccurred: "Oops! There was a problem",
        actionFailed: "Action failed",
        unableToCompleteRequest: "Unable to complete request",
        errorProcessingRequest: "Error processing your request",
    };

    const generateAlert = (alertData) => {
    
        if(!alertData.type || !alertData.title) return null;

        if (alertData.type !== ERROR && alertData.type !== SUCCESS) {
            console.error(
                `Alert Error (Unexpected alert type):\n` +
                `sendAlert({ type: "${alertData.type}" })\n\n` +
                `Expected: { type: "success" } or { type: "error" }`
            );
        }


        if (alertData.animation) {
            const { type, duration } = alertData.animation;
        
            if (type && !ANIMATION_TYPES[type]) {
                console.error(`Alert Error(Wrong Animation Type): \n\nExpected: alert.animation.scale, alert.animation.slide, alert.animation.drop`);
                return;
            }
        
            if (duration !== undefined && typeof duration !== "number") {
                console.error(`Alert Error(Wrong Animation Duration): \n\nExpected: Number`);
                return;
            }
        }
        
        const alert = {

            id: Date.now(),
            type: alertData.type,
            title: alertData.title,
            description: alertData.description || null,
            btn: alertData.btn ? {
                title: alertData.btn.title || null,
                optionalAction: alertData.btn.optionalAction || null,
                mandatoryAction: alertData.btn.mandatoryAction || null
            } : null,
            animation: alertData.animation ? { 
                type: alertData.animation.type || null, 
                duration: alertData.animation.duration || null, 
            } : null
        };
    
        return alert;
    };

const useAlert = () => {

    const { displayAlert } = useContext(AlertContext)


    const alert = {

        error: ERROR,

        success: SUCCESS,

        text: {

            custom: (text) => { return text },
            success: {...TITLE_SUCCESS},
            error: {...TITLE_ERRORS}
        },

        animation: {...ANIMATION_TYPES}
        
    };


    const sendAlert = (alertData) => {

        if(!alertData) return console.error(`Alert Error(Missing Object[]): \nsendAlert(alertData: ${alertData})`);

        const generatedAlert = generateAlert(alertData)

        if(!generatedAlert) return console.error(`Alert Error(Missing values): \n{type: ${alertData.type}, title: ${alertData.title}}`);
        
        displayAlert(generatedAlert)

    }


    return { sendAlert, alert }
}

export default useAlert