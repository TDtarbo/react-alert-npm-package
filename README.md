# react-alert-npm-package


A customizable, reusable alert system for React applications. This package provides a context-based alert provider, an alert component, and a custom hook to display success or error alerts with animations and optional buttons.

### **Features**

- **Context-Based Alerts**: Manage alerts globally using React Context.
- **Custom Animations**: Supports scale, slide, and drop animations for alert entry/exit.
- **Alert Types**: Predefined success and error types with customizable titles and descriptions.
- **Optional Buttons**: Add buttons with optional or mandatory actions.
- **Automatic Dismissal**: Alerts without buttons dismiss automatically after 3 seconds.
- **Responsive Design**: Alerts adjust dynamically to content height.

<br>

### See it in motion — **[**Live Demo**](https://tdtarbo.github.io/react-alert-demo/) is just a click away**

<br>

# Installation

```sh
npm i @tdtarbo/react-alert
```

<br>

# Usage

### 1. Wrap Your App with `AlertProvider`  

Place the `AlertProvider` at the root of your application to enable the alert system.  

```jsx
import React from "react";
import AlertProvider from "./AlertProvider/AlertProvider.jsx";
import App from "./App";

function Root() {
  return (
    <AlertProvider>
      <App />
    </AlertProvider>
  );
}

export default Root;
```
<br>

### 2. Use the `useAlert` Hook  

Import and use the `useAlert` hook in any component to trigger alerts.

```jsx
import React from "react";
import useAlert from "./hooks/useAlert";

function MyComponent() {
  const { sendAlert, alert } = useAlert();

  const handleSuccess = () => {
    sendAlert({
      type: alert.success,
      title: alert.text.success.operationSuccessful,
      description: "Your action was completed successfully!",
      animation: { type: alert.animation.scale, duration: 0.3 },
    });
  };

  const handleError = () => {
    sendAlert({
      type: alert.error,
      title: alert.text.error.somethingWentWrong,
      description: "Please try again later.",
      btn: {
        title: "Retry",
        optionalAction: () => console.log("Retrying..."),
      },
    });
  };

  return (
    <div>
      <button onClick={handleSuccess}>Trigger Success</button>
      <button onClick={handleError}>Trigger Error</button>
    </div>
  );
}

export default MyComponent;
```
<br>

# API

### `AlertProvider`

- **Props**: `{ children }` - The components that will have access to the alert context.  
- **Purpose**: Provides the alert context and manages the alert state and animations.  

### `useAlert`

- **Returns**: `{ sendAlert, alert }`
  
  - `sendAlert(alertData)`: Function to display an alert.  
  - `alert`: Object containing alert types, text, and animation options.  

### ``alertData`` Structure  

```javascript
{
  type: "success" | "error",              // Required
  title: string,                          // Required
  description?: string,                   // Optional
  btn?: {
    title: string,                        // Required if btn is present
    optionalAction?: () => void,          // Optional callback
    mandatoryAction?: () => void          // Optional callback
  },
  animation?: {
    type?: "scale" | "slide" | "drop",    // Optional, defaults to "scale"
    duration?: number                     // Optional, in seconds, defaults to 0.3
  }
}
```

## Predefined Titles  

### Success Titles: `alert.text.success`  
- `operationSuccessful`  
- `actionCompleted`  
- etc.  

### Error Titles: `alert.text.error`  
- `somethingWentWrong`  
- `unexpectedErrorOccurred`  
- etc.  

## Animation Types  

- `alert.animation.scale`: Scales the alert in/out.  
- `alert.animation.slide`: Slides the alert from the right.  
- `alert.animation.drop`: Drops the alert from the top.  

## Notes  

- Alerts without buttons auto-dismiss after **3 seconds**.  
- Animation duration defaults to **0.3 seconds** if not specified.  
- Errors are logged to the console if invalid type or animation values are provided.  
