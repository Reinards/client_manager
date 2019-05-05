import React from "react";
import $ from "jquery";
import Context from "../config/Context";

class Item extends React.Component {

    toggleContent = e =>{
        $(e.target.parentElement).find(".item_content").toggle();
        this.context.setParentId(this.props.id);
    }

    copyItem(data){
        console.log(this.context);
        
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
        if(this.props.type !== "array"){
            return (    
                <Context.Consumer>
                    {
                        data => (
                            <div onClick={()=>this.copyItem(this.props.data)} className={"level_last"}>
                                <span onClick={()=>this.context.deleteItem(this.props.id)}><i className="ui minus icon small"></i></span> <span>{this.props.name}</span> - <span className="ui blue label">{this.props.data}</span>
                            </div>
                        )
                    }
                </Context.Consumer>
            );
        }else{

            const nestedItemData = this.props.data.map(item=>{
        
                return <Item 
                id={item.id} 
                key={item.id} 
                level={Number(this.props.level)+1} 
                type={item.type} 
                data={item.data} 
                name={item.name} />
                
            });

            return (
                <div key={this.props.id} className={"level_"+this.props.level}>
                    <span onDoubleClick={()=>this.context.toggleItemModal(this.props.id)} onClick={this.toggleContent} className="item_name">{this.props.name} <i onClick={()=>this.context.deleteItem(this.props.id)} className="itemIcon trash small icon"></i> </span>
                    <div className="item_content">
                        
                        {nestedItemData}
                    </div>
                </div>
            );
        }

    }

}

Item.contextType = Context;

export default Item;