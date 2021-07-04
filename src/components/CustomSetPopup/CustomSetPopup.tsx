import './CustomSetPopup.css';

interface ParentProps{
    toggleCustomSetPopupVisiblity: () => void
}

function CustomSetPopup(props: ParentProps) {

    const placeHolderText = `Jinzo
Dark Magician
Blue-Eyes White Dragon
  `;
    return (
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <nav id="navbar" className="navbar navbar-mobile customSet">
                <ul className="form-group">
                    <div className="container contact">
                        <div className="row h-100">
                            <div className="col-lg-12">
                                <div className="contact-form h-100">
                                    <div className="InfoBlurb">
                                        Create a Custom Set
                                    </div>
                                    <div className="form-group setName">
                                        <label className="control-label col-6" htmlFor="fname">Set Name:</label>
                                        <div className="col-6">          
                                            <input type="text" className="form-control" id="fname" placeholder="Enter Set Name" name="fname"/>
                                        </div>
                                    </div>
                                    <div className="form-group CreateSetTextArea cardList">
                                        <label className="control-label col-6" htmlFor="comment">Card List:</label>
                                        <div className="col-12">
                                            <textarea className="form-control" placeholder={placeHolderText} id="comment"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group submit">        
                                        <button type="submit" className="btn-lg btn-default">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
                <i className={"bi mobile-nav-toggle bi-list bi-x"} onClick={props.toggleCustomSetPopupVisiblity}></i>
            
            </nav>
        </div>
    );
}

export default CustomSetPopup;
