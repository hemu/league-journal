import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Entry } from "./Entry";

const fakeEntries = [
  {
    id: "1"
  },
  {
    id: "2"
  }
];

console.log("ahlloooooooooooooo");

class App extends Component {
  render() {
    return <Entry entries={fakeEntries} />;
  }
}

export default App;
