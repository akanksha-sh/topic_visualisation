import React, { useEffect, useState } from "react";
import D3Component from "./components/D3Component";
import "./App.css";
import Sidebar from "./components/sidebar";
import {withRouter} from "react-router-dom"


function App(props) {
  const [category, setCategory] = useState("All");
  const [year, setYear] = useState("All");

  useEffect(() => {
  }, [category, year]);

  const triplesCallBack = React.useCallback((cId, cat, y) => {
    props.history.push(`/clusterData/${cat}/${y}/${cId}`)
  }, []);

  return (
    <div className="App">
      <header className="App-header">TOPIC CLUSTERING</header>
      <div className="Main">
        <section className="Vis">
          <D3Component
            setYear={setYear}
            setCategory={setCategory}
            triplesCallBack={triplesCallBack}
          />
        </section>
        <section className="SideBar">
          <Sidebar year={year} category={category} />
        </section>
      </div>
    </div>
  );
}

export default withRouter(App);
