import styles from './CustomSetPopup.module.css';
import BulkAddForm from '../CustomSetBuilder/BulkAdd/BulkAddForm';

interface ParentProps{
    toggleCustomSetPopupVisiblity: (isQuickCreate: boolean) => void
    isQuickCreate: boolean
}

function CustomSetPopup(props: ParentProps) {
    const {isQuickCreate, toggleCustomSetPopupVisiblity} = {...props}

    return (
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <nav id="navbar" className={`navbar navbar-mobile customSet`}>
                <ul className="form-group" style={!isQuickCreate ? {bottom: "50%"} : {}}>
                    <div className={`container ${styles.contactPopup}`}>
                        <div className="row h-100">
                            <div className="col-lg-12">
                                <BulkAddForm isQuickCreate={isQuickCreate} toggleCustomSetPopupVisiblity={toggleCustomSetPopupVisiblity}/>
                            </div>
                        </div>
                    </div>
                </ul>
                <i className={"bi mobile-nav-toggle bi-list bi-x"} onClick={() => toggleCustomSetPopupVisiblity(isQuickCreate)}></i>
            </nav>
        </div>
    );
}

export default CustomSetPopup;
