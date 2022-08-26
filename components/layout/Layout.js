import { useContext } from "react"

import MainNavigation from "./MainNavigation"
import Notification from "../ui/Notification"
import NotificationContext from "../../store/notification-context"

import classes from "./Layout.module.css"

const Layout = props => {
    const notificationCtx = useContext(NotificationContext)
    const activeNotif = notificationCtx.notification

    return (
        <div>
            <MainNavigation />
            <main className={classes.main}>{props.children}</main>
            {activeNotif && (
                <Notification
                    title={activeNotif.title}
                    message={activeNotif.message}
                    status={activeNotif.status}
                />
            )}
        </div>
    )
}

export default Layout
