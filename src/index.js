import React from 'react';
import ReactDOM from 'react-dom';
import TopBar from "./components/topBar";
import MainView from "./components/mainView";
import AddItem from "./components/addItem";
import './styles/index.scss';
import $ from "jquery";

class App extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            jsonData: JSON.parse(localStorage.getItem("jsonData")),
            itemModal: false,
            itemParentId: -1
        }

    }

    setParentId = id => {
        this.setState({
            itemParentId: id
        });
    }

    toggleItemModal = (id=this.state.itemParentId) => {

        this.setState({
            itemModal: !this.state.itemModal,
            itemParentId: id
        });

        $(".itemName").focus();
    }

    deleteItem = id => {

        if(id === this.state.itemParentId){
            this.setState({
                itemParentId: -1
            });
        }

        let tmp_json = [...this.state.jsonData];
        let filtered_array = null;

        tmp_json.forEach(item=>{

            if(id===item.id){
                filtered_array = tmp_json.filter(item=>item.id!==id);
                tmp_json = filtered_array;
            }else{
                item.data.forEach(item2=>{
                    if(id===item2.id){
                        filtered_array = item.data.filter(item2=>item2.id!==id);
                        item.data = filtered_array;
                    }else{
                        item2.data.forEach(item3=>{
                            if(id===item3.id){
                                filtered_array = item2.data.filter(item3=>item3.id!==id);
                                item2.data = filtered_array;
                            }       
                        });
                    }
                })
            }

        });

        this.setState({ jsonData: tmp_json }, ()=>{
            localStorage.setItem("jsonData",JSON.stringify(this.state.jsonData));
        });

    }

    addItem = (name,value) => {
        
        var tmp_type;
        var tmp_data;
        var tmp_json;
        var parent_id = this.state.itemParentId;

        if(value.length > 0){
            tmp_type = "text";
            tmp_data = value;
        }else{
            tmp_type = "array";
            tmp_data = Array();
        }

        if(parent_id === -1){

            tmp_json = [...this.state.jsonData,{
            name:name,
            data:tmp_data,
            type: tmp_type,
            id: Math.random()
            }];

        }else{

            var tmp_json = [...this.state.jsonData.slice()];

            // console.log(tmp_data);
            tmp_json.forEach(item=>{
                if(item.id === parent_id){

                    item.data.push({
                        name:name,
                        data:tmp_data,
                        type: tmp_type,
                        id: Math.random()
                        });

                }else{
                    item.data.forEach(item2=>{
                        if(item2.id === parent_id){

                            item2.data.push({
                                name:name,
                                data:tmp_data,
                                type: tmp_type,
                                id: Math.random()
                                });
        
                        }else{
                            item2.data.forEach(item3=>{
                                if(item3.id === parent_id){

                                    item3.data.push({
                                        name:name,
                                        data:tmp_data,
                                        type: tmp_type,
                                        id: Math.random()
                                        });
                
                                }
                            });
                        }
                    });
                }
            });

        }



        this.setState({ jsonData: tmp_json }, ()=>{
            localStorage.setItem("jsonData",JSON.stringify(this.state.jsonData));
            
            $(".itemName").val("");
            $(".itemValue").val("");
            this.toggleItemModal();
        });
    }

    render(){
        return (
            <div className="appWrapper">
                <TopBar itemModal={this.state.itemModal} toggleItemModal={this.toggleItemModal} />
                <MainView setParentId={this.setParentId} deleteItem={this.deleteItem} toggleItemModal={this.toggleItemModal} jsonData = {this.state.jsonData} />
                <AddItem visible={this.state.itemModal} addItem={this.addItem} />
            </div>
        )
    }
}
window.onload = function(){

    // var contents = document.querySelectorAll(".item_content");

    // contents.forEach(c => {
    //    $(c).toggle(); 
    // });

    // console.log(contents);

    // $(".item_content").toggle();
}

document.onkeypress = e =>{
    e = e || window.event;
    if(e.key=="="){
        e.preventDefault();
        app.toggleItemModal();
    }
}

var app = ReactDOM.render(<App/>, document.getElementById('root'));
