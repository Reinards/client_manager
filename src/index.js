import React from 'react';
import ReactDOM from 'react-dom';
import ContextProvider from "./config/ContextProvider";
import TopBar from "./components/topBar";
import MainView from "./components/mainView";
import AddItem from "./components/addItem";
import SearchItem from "./components/searchItem";
import './styles/index.scss';
import $ from "jquery";



class App extends React.Component {

    componentDidMount(){
        const lstest = localStorage.getItem("jsonData");

        if(lstest=== null || lstest === undefined){
            localStorage.setItem("jsonData","[]");
        }
    }


    render(){
        return (
            <ContextProvider>
                <div className="appWrapper">
                    <TopBar />
                    <MainView/>
                    <AddItem />
                    <SearchItem />
                </div>
            </ContextProvider>
        )
    }
}

window.onload = () => {
    $(".item_content").toggle();
}

var app = ReactDOM.render(<App/>, document.getElementById('root'));