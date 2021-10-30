import { 
    CREATE_SHIPMENT,
    RETRIEVE_SHIPMENTS,
    UPDATE_SHIPMENT,
    DELETE_SHIPMENT,
    DELETE_ALL_SHIPMENTS
} from '../actions/types';

const initialState = [];

function shipmentReducer(shipments = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_SHIPMENT:
        return [...shipments, payload];
  
      case RETRIEVE_SHIPMENTS:
        return payload;
  
      case UPDATE_SHIPMENT:
        return shipments.map((shipment) => {
          if (shipment.id === payload.id) {
            return {
              ...shipment,
              ...payload,
            };
          } else {
            return shipment;
          }
        });
  
      case DELETE_SHIPMENT:
        return shipments.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_SHIPMENTS:
        return [];
  
      default:
        return shipments;
    }
  };
  
  export default shipmentReducer;