import React from "react";
import Context from "../config/Context";

class AddItem extends React.Component {

    processItemSubmission = e =>{
        e.preventDefault();
        
        // const name = e.target.querySelector(".itemName").value;
        // const value = e.target.querySelector(".itemValue").value;

        // this.props.addItem(name, value);
    }

    render(){
        return (
            <Context.Consumer>
                {
                    data => (

                        <div className={ data.itemModal ? "addItemWrapper" : "addItemWrapper addItemWrapper--hidden"}>
                            <form onSubmit={data.processItemSubmission}>
                                <input autoComplete="off" className="itemName" id="addItemName" autoFocus="on" tabIndex="0" type="text" placeholder="Name" />
                                <input autoComplete="off" className="itemValue" type="text" placeholder="Value" />
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                        
                    )
                }
            </Context.Consumer>
        )
    }

}

export default AddItem;