import { useState, useEffect } from 'react';

import './Toast.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSortedToasts } from '../../data/toasts/selectors';
import checkIcon from '../../assets/check.svg';
import errorIcon from '../../assets/error.svg';
import infoIcon from '../../assets/info.svg';
import warningIcon from '../../assets/warning.svg';
import { Toast } from '../../constants/Toast';
import { removeToast } from '../../data/toasts/actions';

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

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length && toastList.length) {
                deleteToast(toastList[0].id);
            }
        }, dismissTime);
        
        return () => {
            clearInterval(interval);
        }

    }, [toastList, autoDelete, dismissTime, toastList]);

    const deleteToast = (id: string) => {
        dispatch(removeToast(id))
    }

    return (
        <>
            <div className={`notification-container ${position}`}>
                {
                    toastList.map((toast, i) =>     
                        <div 
                            key={i}
                            className={`notification dToast ${position}`}
                            style={{ backgroundColor: toast.backgroundColor }}
                        >
                            <button onClick={() => deleteToast(toast.id)}>
                                X
                            </button>
                            <div className="notification-image">
                                <img src={getIcon(toast)} alt="" />
                            </div>
                            <div>
                                <p className="notification-title">{toast.title}</p>
                                <p className="notification-message">
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
