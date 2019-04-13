import React from "react";
import SearchBar from "../components/searchBar";
import "../styles/topBar.scss";

class TopBar extends React.Component {

    render(){

        return (
            <div className="ui top fixed menu blue inverted huge">
                <a onClick={()=>this.props.toggleItemModal(-1)} className="item">
                    <i className={ this.props.itemModal? "remove icon" : "add icon"}></i>
                </a>
                <a className="item">
                    <i className="search icon"></i>
                </a>
            </div>
        )

    }
}

export default TopBar;