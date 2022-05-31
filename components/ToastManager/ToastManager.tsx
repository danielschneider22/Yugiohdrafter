import { useEffect } from 'react';

import styles from './Toast.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSortedToasts } from '../../data/toasts/selectors';
import checkIcon from '../../assets/check.svg';
import errorIcon from '../../assets/error.svg';
import infoIcon from '../../assets/info.svg';
import warningIcon from '../../assets/warning.svg';
import { Toast } from '../../constants/Toast';
import { removeToast } from '../../data/toasts/actions';
import Image from 'next/image';

import { CgClose } from 'react-icons/cg';

interface ParentProps {
    position: "top-right" | "bottom-right" | "top-left" | "bottom-left",
    autoDelete: boolean,
    dismissTime: number
}

function getIcon(toast: Toast) {
    switch(toast.type){
        case "Success":
            return checkIcon
        case "Danger":
            return errorIcon
        case "Info":
            return infoIcon
        case "Warning":
            return warningIcon
    }
}

function ToastManager(props: ParentProps) {
    const dispatch = useDispatch();
    const { position, autoDelete, dismissTime } = props;
    const toastList = useSelector(getSortedToasts)

    const deleteToast = (id: string) => {
        dispatch(removeToast(id))
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length && toastList.length) {
                deleteToast(toastList[0].id);
            }
        }, dismissTime);
        
        return () => {
            clearInterval(interval);
        }

    }, [toastList, autoDelete, dismissTime]); // eslint-disable-line react-hooks/exhaustive-deps

    

    return (
        <>
            <div className={`${styles["notification-container"]} ${styles[position]}`}>
                {
                    toastList.map((toast, i) =>     
                        <div 
                            key={i}
                            className={`${styles.notification} ${styles.dToast} ${styles[position]}`}
                            style={{ backgroundColor: toast.backgroundColor }}
                        >
                            <button onClick={() => deleteToast(toast.id)}>
                                <CgClose />
                            </button>
                            <div className={styles["notification-image"]}>
                                <Image src={getIcon(toast)} alt={toast.type} />
                            </div>
                            <div>
                                <p className={styles["notification-title"]}>{toast.title}</p>
                                <p className={styles["notification-message"]}>
                                    {toast.description}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default ToastManager;
