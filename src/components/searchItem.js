import React from "react";
import Context from "../config/Context";

class SearchItem extends React.Component {

    processItemSubmission = e =>{
        e.preventDefault();
    }

    render(){

        return (
            <Context.Consumer>
                {
                    data => (
                        <div className={ data.searchModal ? "searchItemWrapper" : "searchItemWrapper searchItemWrapper--hidden"}>
                            <form>
                                <input onKeyUp={data.searchItem} autoComplete="off" className="itemName" id="searchItemName" autoFocus="on" tabIndex="0" type="text" placeholder="Type something" />
                                <button onClick={data.toggleSearch} type="button">Close</button>
                            </form>
                        </div>
                    )
                }
            </Context.Consumer>
        )
    }

}

export default SearchItem;