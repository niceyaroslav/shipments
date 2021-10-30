import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createShipment } from "../actions/shipments";
import { v4 as uuidv4 } from 'uuid';
import ShipmentForm from "./ShipmentForm";


const AddShipment = () => {
    const initialShipmentState = {
        orderNo: "",
        date: "",
        customer: "",
        trackingNo: "",
        status: "",
        consignee: "",
        id: uuidv4()
      };
      const [shipment, setShipment] = useState(initialShipmentState);
      const [submitted, setSubmitted] = useState(false);
      const dispatch = useDispatch();
      
      const handleInputChange = event => {
        const { name, value } = event.target;
        setShipment({ ...shipment, [name]: value });
      };
    
      const saveShipment = () => {
        const { orderNo, date, customer, trackingNo, status, consignee } = shipment;

        dispatch(createShipment( orderNo, date, customer, trackingNo, status, consignee ))
            .then(data => {
                setShipment({
                orderNo: data.orderNo,
                date: data.date,
                customer: data.customer,
                trackingNo: data.trackingNo,
                status: data.status,
                consignee: data.consignee
                });
                setSubmitted(true);
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
        };
        const newShipment = () => {
            setShipment(initialShipmentState);
            setSubmitted(false);
          };
    return (
        <>
            <div className="submit-form">
                {submitted ? (
                    <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newShipment}>
                        Add
                    </button>
                    </div>
                ) : (
                    <div>
                    <ShipmentForm shipment={shipment} saveShipment={saveShipment} handleInputChange={handleInputChange} create={"create"}/>
                    </div>
                )}
                </div>
        </>
    );
};
export default AddShipment;