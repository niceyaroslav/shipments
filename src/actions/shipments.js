import { 
    CREATE_SHIPMENT,
    RETRIEVE_SHIPMENTS,
    UPDATE_SHIPMENT,
    DELETE_SHIPMENT,
    DELETE_ALL_SHIPMENTS
} from './types';

import ShipmentService from '../services/ShipmentService';

export const createShipment = ( orderNo, date, customer, trackingNo, status, consignee ) => async (dispatch) => {
    try {
      const res = await ShipmentService.create({ orderNo, date, customer, trackingNo, status, consignee });
      dispatch({
        type: CREATE_SHIPMENT,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveShipments = () => async (dispatch) => {
    try {
      const res = await ShipmentService.getAll();
  
      dispatch({
        type: RETRIEVE_SHIPMENTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateShipment = (id, data) => async (dispatch) => {
    try {
      const res = await ShipmentService.update(id, data);
  
      dispatch({
        type: UPDATE_SHIPMENT,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteShipment = (id) => async (dispatch) => {
    try {
      await ShipmentService.remove(id);
  
      dispatch({
        type: DELETE_SHIPMENT,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllShipments = () => async (dispatch) => {
    try {
      const res = await ShipmentService.removeAll();
  
      dispatch({
        type: DELETE_ALL_SHIPMENTS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
