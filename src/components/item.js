import React from "react";
import $ from "jquery";

class Item extends React.Component {

    toggleContent = e =>{
        $(e.target.parentElement).find(".item_content").toggle();
        this.props.setParentId(this.props.id);
    }

    copyItem(data){
        
        $(".copyMessage").removeClass("animateMessage");

        const el = document.createElement('textarea');
        el.value = data;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        
        $(".copyMessage .copyData").html(data);

        $(".copyMessage").addClass("animateMessage");
    }

    render(){

        if(this.props.showAdd === "true"){
            return (
                <li key="-1" className="addItem">
                    <form className="ui form fluid" onSubmit={this.props.submitNewClient}>
                        <div className="ui action input fluid">
                                <input id="addItemInput" autoFocus="on" type="text" placeholder="Name" />
                        </div>
                    </form>
                </li>
            );
        }else{

            if(this.props.type !== "array"){
                return (
                    <li onClick={()=>this.copyItem(this.props.data)} className={"level_last"}>
                        <span>{this.props.name}</span> - <span className="ui blue label">{this.props.data}</span>
                    </li>
                );
            }else{

                const nestedItemData = this.props.data.map(item=>{
            
                    return <Item setParentId={this.props.setParentId} deleteItem={this.props.deleteItem} toggleItemModal={this.props.toggleItemModal} id={item.id} key={item.id} level={Number(this.props.level)+1} type={item.type} data={item.data} name={item.name} />
                    
                });

                return (
                    <li key={this.props.id} className={"level_"+this.props.level}>
                        <span onDoubleClick={()=>this.props.toggleItemModal(this.props.id)} onClick={this.toggleContent} className="item_name">{this.props.name} <i onClick={()=>this.props.deleteItem(this.props.id)} className="itemIcon trash small icon"></i> </span>
                        <div className="item_content">
                            
                            {nestedItemData}
                        </div>
                    </li>
                );
            }


        }
    }

}

export default Item;