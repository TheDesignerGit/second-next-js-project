import { useContext } from 'react';

import classes from './Notification.module.css';
import NotificationContext from '../../store/notification-context';

function Notification(props) {
    const notificationCtx = useContext(NotificationContext);

    const { title, message, status } = props;

    let statusClasses = '';
        // 3*s - add to Anki. pattern

    if (status === 'success') {
        statusClasses = classes.success;
        // setTimeout( () => {notificationCtx.hideNotification()}, 5000)
    }

    if (status === 'error') {
        statusClasses = classes.error;
        // setTimeout( () => {notificationCtx.hideNotification()}, 5000)
    }

    if (status === 'pending') {
        statusClasses = classes.pending;
    }

    const activeClasses = `${classes.notification} ${statusClasses}`;

    return (
        <div className={activeClasses} onClick={notificationCtx.hideNotification}>
            <h2 className={classes.mainText}>{title}</h2>
            <p>{message}</p>
        </div>
    );
}

export default Notification;