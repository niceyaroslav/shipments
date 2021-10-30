import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateShipment, deleteShipment } from "../actions/shipments";
import { v4 as uuidv4 } from 'uuid';
import ShipmentForm from "./ShipmentForm";
import ShipmentService from "../services/ShipmentService";

const Shipment = (props) => {
    const initialShipmentState = {
        orderNo: "",
        date: "",
        customer: "",
        trackingNo: "",
        status: "",
        consignee: "",
        id: uuidv4()
      };
    const [currentShipment, setCurrentShipment] = useState(initialShipmentState);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const getShipment = id => {
        ShipmentService.get(id)
            .then(response => {
            setCurrentShipment(response.data);
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
            });
    };

    useEffect(() => {
    getShipment(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentShipment({ ...currentShipment, [name]: value });
    };

    const updateContent = () => {
        console.log(currentShipment)
    dispatch(updateShipment(currentShipment.id, currentShipment))
        .then(response => {
        console.log(response);

        setMessage("The shipment was updated successfully!");
        })
        .catch(e => {
        console.log(e);
        });
    };

    const removeShipment = () => {
    dispatch(deleteShipment(currentShipment.id))
        .then(() => {
        props.history.push("/shipments");
        })
        .catch(e => {
        console.log(e);
        });
    };
    return (
        <div>
        {currentShipment ? (
            <div className="edit-form">
            <h4>Shipment</h4>
            <ShipmentForm shipment={currentShipment} create=""  removeShipment={removeShipment} 
            updateContent={updateContent} message={message} handleInputChange={handleInputChange}/>
            </div>) 
            : (
            <div>
            <br />
            <p>Please click on a Shipment...</p>
            </div>
            )}
    </div>
  )
};

export default Shipment;