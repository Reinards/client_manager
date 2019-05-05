import React from "react";
import "../styles/mainView.scss";
import "../styles/copyMessage.scss";
import Item from "../components/item";
import Context from "../config/Context";
import $ from "jquery";

class MainView extends React.Component {

    componentDidMount = () => {
        
        document.onkeyup = (e) => {
            e = e || window.event;

            if(e.key==="="){
                if(this.context.itemModal===false && this.context.searchModal===false){
                    e.preventDefault();
                    this.context.toggleItemModal();
                }
            }

            if(e.shiftKey===true && e.key==="F"){
                $(".item_content").toggle();
            }

            if(e.key==="f"){
                e.preventDefault();
                if(this.context.itemModal===false && this.context.searchModal===false){
                    this.context.toggleSearch();
                }
            }


            if(e.key === "Escape"){
                e.preventDefault();
                if(this.context.itemModal) this.context.toggleItemModal();
                if(this.context.searchModal) this.context.toggleSearch();
            }
        };
    }

    render(){

        const itemList = this.context.jsonDataVisible.map(item=>{ 
            return <Item 
            level="1"
            id={item.id} 
            key={item.id} 
            type={item.type} 
            data={item.data} 
            name={item.name} />
        });

        return (
            <div className="ui card fluid mainView">
                <div className="content">
                    {itemList.length === 0 ? (
                        <div className="centeredContainer">
                            <i className="ui bug icon"></i>
                            <span>No items yet</span>
                        </div> 
                        ) : (
                        <div className="itemList">
                            {itemList}
                        </div>
                    )}
                </div>
                <div className="copyMessage">You copied - <span className="copyData">123</span></div>
            </div>
        )

    }
}

MainView.contextType = Context;

export default MainView;