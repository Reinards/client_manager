import React from "react";
import $ from "jquery";

class AddItem extends React.Component {

    processItemSubmission = e =>{
        e.preventDefault();
        
        const name = e.target.querySelector(".itemName").value;
        const value = e.target.querySelector(".itemValue").value;

        this.props.addItem(name, value);
    }

    render(){

        return (
            <div className={ this.props.visible ? "addItemWrapper" : "addItemWrapper addItemWrapper--hidden"}>
                <form onSubmit={this.processItemSubmission}>
                    <input className="itemName" id="addItemName" autoFocus="on" tabIndex="0" type="text" placeholder="Name" />
                    <input className="itemValue" type="text" placeholder="Value" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }

}

export default AddItem;