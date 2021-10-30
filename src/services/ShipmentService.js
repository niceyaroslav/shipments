import http from "../http-common";

const getAll = () => {
  return http.get("/shipments");
};

const get = id => {
  return http.get(`/shipments/${id}`);
};

const create = data => {
  return http.post("/shipments", data);
};

const update = (id, data) => {
  return http.put(`/shipments/${id}`, data);
};

const remove = id => {
  return http.delete(`/shipments/${id}`);
};

const removeAll = () => {
  return http.delete(`/shipments`);
};

const filterByAny = (data) => {
  return http.get(`/shipments?customer=${data}`);
};

const ShipmentService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  filterByAny
};

export default ShipmentService;