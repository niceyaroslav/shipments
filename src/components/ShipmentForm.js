import React from "react";

const ShipmentForm = (props) => {
    let mapper = {
        'orderNo': 'Order number',
        'date': 'Date',
        'customer': "Customer",
        'trackingNo': 'Tracking number',
        'status': 'Status',
        'consignee': 'Consignee'
    }
    return (
        <div>{Object.keys(props.shipment).map(k => {
            if (k !== "id") {
                return (
                    <div className="form-group" key={mapper[k]}>
                    <label htmlFor={k}>{mapper[k]}</label>
                    <input
                    type="text"
                    className="form-control"
                    id={k}
                    required
                    value={props.shipment[k]}
                    onChange={props.handleInputChange}
                    name={k}
                    />
                </div>
                )
            };
        })}
            {props.create ? 
            <button onClick={props.saveShipment} className="btn btn-success">
                Submit
             </button> :
             <div>
                <button
                    type="submit"
                    className="btn btn-success mr-2"
                    onClick={props.updateContent}
                >
                    Update
                </button>
                <button className="btn btn-danger mr-2" onClick={props.removeShipment}>
                    Delete
                </button>
                
            <p>{props.message}</p>
          </div>}
        </div>
    )
};

export default ShipmentForm;