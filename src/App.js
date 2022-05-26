import React, { useEffect } from "react";
import D3Component from "./D3Component";
import './App.css';
import Sidebar from "./sidebar"

function App() {

  return (
    <div className="App">
      <header className="App-header">
        Visualising News
      </header>
      <div className="Main"> 
      <section className="Vis">
        <D3Component/>
      </section>
      <section className="SideBar">
        <Sidebar/>
      </section>
      </div>
    </div>
  );
}

export default App;