import React, { Component } from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link, Redirect,useParams,useNavigate, useInRouterContext} from 'react-router-dom';
import HomePage from "./components/HomePage";
import ResultsPage from "./components/ResultsPage";
import RoomPage from "./components/RoomPage";
function App() {
  return (
    <Router>
        <Routes>
            <Route path="/room/:code" element = {<RoomPage/>}/>
            <Route path="/results/:code" element = {<ResultsPage/>}/>
            <Route path="/" element = {<HomePage/>}/> 
        </Routes>  
    </Router>
  )
}


export default App;
