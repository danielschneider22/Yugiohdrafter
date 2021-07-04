import { useState } from 'react';
import './CustomSetPopup.css';

interface ParentProps{
    toggleCustomSetPopupVisiblity: () => void
}

function CustomSetPopup(props: ParentProps) {

    const placeHolderText = `Jinzo
Dark Magician
Blue-Eyes White Dragon
  `;

    const [setName, setSetName] = useState("")
    const [cardList, setCardList] = useState("")
    return (
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <nav id="navbar" className="navbar navbar-mobile customSet">
                <ul className="form-group">
                    <div className="container contact">
                        <div className="row h-100">
                            <div className="col-lg-12">
                                <div className="contact-form h-100">
                                    <div className="CreateCustomSetTitle">
                                        Create a Custom Set
                                    </div>
                                    <div className="form-group setName">
                                        <label className="control-label col-6" htmlFor="setName">Set Name:</label>
                                        <div className="col-6">          
                                            <input value={setName} type="text" className="form-control" placeholder="Enter Set Name" name="setName"/>
                                        </div>
                                    </div>
                                    <div className="form-group CreateSetTextArea cardList">
                                        <label className="control-label col-6" htmlFor="cardList">Card List:</label>
                                        <div className="col-12">
                                            <textarea value={cardList} className="form-control" placeholder={placeHolderText} name="cardList"></textarea>
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
