import React from "react";
import "../styles/mainView.scss";
import "../styles/copyMessage.scss";
import Item from "../components/item";

class MainView extends React.Component {

    render(){

        const itemList = this.props.jsonData.map(item=>{
            
            return <Item setParentId={this.props.setParentId} deleteItem={this.props.deleteItem} toggleItemModal={this.props.toggleItemModal} level="1" id={item.id} key={item.id} type={item.type} data={item.data} name={item.name} />
            
        });

        return (
            <div className="ui card fluid mainView">
                <div className="content">
                    <ul>
                        {itemList}
                    </ul>
                </div>
                <div className="copyMessage">You copied - <span className="copyData">123</span></div>
            </div>
        )

    }
}

export default MainView;