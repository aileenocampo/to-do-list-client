import NavBar from "./components/NavBar";
import AddBar from "./components/AddBar";
import ToDoList from "./components/ToDoList";
import React from "react";
import {  BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <AddBar />
      <Switch>
        <Route exact path="/">
          <ToDoList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
