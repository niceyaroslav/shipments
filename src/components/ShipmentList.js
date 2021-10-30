import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  retrieveShipments,
  deleteAllShipments,
} from "../actions/shipments";

const ShipmentList = () => {
  const [currentShipment, setCurrentShipment] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchAny, setSearchAny] = useState("");
  const shipments = useSelector(state => state.shipments);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(retrieveShipments());
  }, []);

  const onChangeFilter = event => {
    const searchFilter = event.target.value;
    setSearchAny(searchFilter);
  };

  const refreshData = () => {
    setCurrentShipment(null);
    setCurrentIndex(-1);
  };

  const setActiveShipment = (shipment, index) => {
    setCurrentShipment(shipment);
    setCurrentIndex(index);
  };

  const removeAllShipments = () => {
    dispatch(deleteAllShipments())
      .then(response => {
        console.log(response);
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const filteredShipments = shipments.filter(s => s.customer.includes(`${searchAny.charAt(0).toLowerCase()}${searchAny.slice(1, searchAny.length)}`) 
  || s.customer.includes(`${searchAny.charAt(0).toUpperCase()}${searchAny.slice(1,searchAny.length)}`));

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by customer"
            value={searchAny}
            onChange={onChangeFilter}
          />
        </div>
      </div>
      <div className="col-md-6">
        <h4>Shipment List</h4>

        <ul className="list-group">
          {filteredShipments &&
            filteredShipments.map((shipment, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveShipment(shipment, index)}
                key={index}
              >
                <strong>Order number: </strong>{shipment.orderNo}<br/>
                <strong>Customer: </strong>{shipment.customer}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllShipments}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentShipment ? (
          <div>
            <h4>Shipment</h4>
            {Object.keys(currentShipment).map(k => {
                let mapper = {
                    'orderNo': 'Order number',
                    'date': 'Date',
                    'customer': "Customer",
                    'trackingNo': 'Tracking number',
                    'status': 'Status',
                    'consignee': 'Consignee'
                }
                if (k !== 'id') {
                    return(
                        <div key={mapper[k]}>
                            <label>
                                <strong>{mapper[k]}:</strong>
                            </label>{" "}
                                {currentShipment[k]}
                        </div>
                    )
                }
            })}
            <button className="btn btn-warning btn-sm">
                <Link
                    style={{
                            'color': 'white',
                            'textDecoration':'none'
                        }}
                    to={"/shipments/" + currentShipment.id} 
                >
                Edit
                </Link>
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Shipment...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentList;