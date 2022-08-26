import { createContext, useState, useEffect } from "react"

// .:. 1. create context w/ initial value
const NotificationContext = createContext({
    notification: null,
    showNotification: notificationData => {},
    hideNotification: () => {},
})

// .:. 3. context provider component
export const NotificationContextProvider = props => {
    // .:. 4. manage context-related state
    const [activeNotification, setActiveNotification] = useState()

    useEffect(() => {
        let timerID = null
    
        if (
            activeNotification &&
            (activeNotification.status === "success" ||
                activeNotification.status === "error")
        ) {
            timerID = setTimeout(() => setActiveNotification(null), 5000)
        }

        return () => {
            clearTimeout(timerID)
        }
    }, [activeNotification])

    function showNotificationHandler(notificationData) {
        setActiveNotification({
            title: notificationData.title,
            message: notificationData.message,
            status: notificationData.status,
        })
    }

    function hideNotificationHandler() {
        setActiveNotification(null)
    }

    // .:. 5. data and functions into single bundle
    const ctx = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
    }

    // .:. 6. return provider & set context bundle as current value
    return (
        <NotificationContext.Provider value={ctx}>
            {props.children}
        </NotificationContext.Provider>
    )
}

// .:. 2. export context as default
export default NotificationContext
