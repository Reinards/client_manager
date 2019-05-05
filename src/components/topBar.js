import React from "react";
import Context from "../config/Context";
import "../styles/topBar.scss";

class TopBar extends React.Component {

    render(){

        return (
            <Context.Consumer>
                {
                    data => (
                        <div className="ui top fixed menu blue inverted huge">
                            <button onClick={()=>data.toggleItemModal(-1)} className="item topBarItem">
                                <i className={ data.itemModal? "remove icon" : "add icon"}></i>
                            </button>
                            <button onClick={data.toggleSearch} className="item topBarItem">
                                <i className="search icon"></i>
                            </button>
                            <button onClick={data.exportData} className="item topBarItem">
                                <i className="download icon"></i>
                            </button>
                            <button onClick={data.importData} className="item topBarItem">
                                <i className="folder open icon"></i>
                            </button>
                        </div>
                    )
                }
            </Context.Consumer>
        )

    }
}

export default TopBar;