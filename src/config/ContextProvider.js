import React, {Component} from "react";
import Context from "./Context";
import $ from "jquery";

class ContextProvider extends Component {

    constructor(props){
        super(props);

        this.state = {
            jsonData: JSON.parse(localStorage.getItem("jsonData")),
            jsonDataVisible: JSON.parse(localStorage.getItem("jsonData")),
            itemModal: false,
            searchModal: false,
            itemParentId: -1
        };
    }

    exportData = () => {
        $(".copyMessage").removeClass("animateMessage");

        const el = document.createElement('textarea');
        el.value = JSON.stringify(this.state.jsonData);
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        
        $(".copyMessage .copyData").html("EXPORTED DATA");

        $(".copyMessage").addClass("animateMessage");
    }

    importData = () => {
        var importedData = prompt("Please paste the data string");
        this.setState({
            jsonData: JSON.parse(importedData)
        }, ()=>{
            localStorage.setItem("jsonData",JSON.stringify(this.state.jsonData));
        });
    }

    toggleItemModal = (id=this.state.itemParentId) => {

        this.setState({
            itemModal: !this.state.itemModal,
            itemParentId: id
        }, () => {
            $("#addItemName").focus();
        });

    }

    addItem = (name,value) => {
        
        let tmp_type;
        let tmp_data;
        let tmp_json;
        const parent_id = this.state.itemParentId;

        if(value.length > 0){
            tmp_type = "text";
            tmp_data = value;
        }else{
            tmp_type = "array";
            tmp_data = [];
        }

        if(parent_id === -1){
            tmp_json = [...this.state.jsonData,{
            name:name,
            data:tmp_data,
            type: tmp_type,
            id: Math.random()
            }];

        }else{

            tmp_json = [...this.state.jsonData.slice()];

        
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

        this.setState({ jsonData: tmp_json, jsonDataVisible: tmp_json }, ()=>{
            localStorage.setItem("jsonData",JSON.stringify(this.state.jsonData));
            
            $(".itemName").val("");
            $(".itemValue").val("");
            this.toggleItemModal();
        });

    }

    setParentId = id => {
        this.setState({
            itemParentId: id
        });
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

        this.setState({ jsonData: tmp_json, jsonDataVisible: tmp_json }, ()=>{
            localStorage.setItem("jsonData",JSON.stringify(this.state.jsonData));
        });

    }

    searchItem = () => {
        const searchValue = $("#searchItemName").val();

        const tmpData = [...this.state.jsonData];
        let filteredData = null

        this.state.jsonData.forEach(item=>{
            if(item.name.toLowerCase().includes(searchValue.toLowerCase())){
                filteredData = tmpData.filter(item=>item.name.toLowerCase().includes(searchValue.toLowerCase()));
            }
        });

        if(filteredData === null){
            filteredData = tmpData;
        }

        this.setState({
            jsonDataVisible: filteredData
        })
        
    }

    toggleSearch = () => {
        $("#searchItemName").val("");
        $("#searchItemName").focus();
        this.setState({
            searchModal: !this.state.searchModal
        });
    }

    processItemSubmission = (e) => {
        e.preventDefault();
        
        const name = e.target.querySelector(".itemName").value;
        const value = e.target.querySelector(".itemValue").value;

        this.addItem(name, value);
    }

    as(){
        alert("ASA");
    }

    render(){
        return(
            <Context.Provider value={{
                ...this.state,
                exportData: this.exportData,
                importData: this.importData,
                toggleItemModal: this.toggleItemModal,
                addItem: this.addItem,
                setParentId: this.setParentId,
                deleteItem: this.deleteItem,
                searchItem: this.searchItem,
                processItemSubmission: this.processItemSubmission,
                toggleSearch: this.toggleSearch
                }}>
                {this.props.children}
            </Context.Provider>
        );
    }

}

export default ContextProvider;
