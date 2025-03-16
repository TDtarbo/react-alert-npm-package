import { useContext } from "react"
import { AlertContext } from "../AlertProvider/AlertProvider.jsx"


    //Error Types
    const ERROR = "error";
    const SUCCESS = "success";

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
    
        const alert = {

            id: Date.now(),
            type: alertData.type,
            title: alertData.title,
            description: alertData.description || null,
            btn: alertData.btn ? {
                title: alertData.btn.title || null,
                optionalAction: alertData.btn.optionalAction || null,
                mandatoryAction: alertData.btn.mandatoryAction || null
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
        
    };


    const sendAlert = (alertData) => {

        if(!alertData) return console.error(`Alert Error(Missing Object[]): \nsendAlert(alertData: ${alertData})`);

        const generatedAlert = generateAlert(alertData)

        if(!generatedAlert) return console.error(`Alert Error(Missing values): \n{type: ${alertData.type}, title: ${alertData.title}}`);
        console.log(generatedAlert);
        
        displayAlert(generatedAlert)

    }


    return { sendAlert, alert }
}

export default useAlert