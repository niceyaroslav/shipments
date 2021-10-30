import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

import Shipment from "./components/Shipment";
import AddShipment from "./components/AddShipment";
import ShipmentList from "./components/ShipmentList";


const App = () => {

  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/shipments" className="navbar-brand" style={{'paddingLeft':'10px'}}>
          Shipments App
        </a>
        <div className="navbar-nav">
          <li className="nav-item">
            <Link to={"/shipments"} className="nav-link">
              List of shipments
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add new shipment
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/shipments"]} component={ShipmentList} />
          <Route exact path="/add" component={AddShipment} />
          <Route path="/shipments/:id" component={Shipment} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
