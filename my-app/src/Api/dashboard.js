import Axios from 'axios';
import configData from '../config.json';

export const getEmployeeList = () => {
    return Axios.get(`${configData.SERVER_URL}/${'dashboard/get-employee-list'}`);
 }
export const createEmployee = (payload) => {
    return Axios.post(`${configData.SERVER_URL}/${'dashboard/create-employee'}`, payload);
}
export const deleteEmployee = (id) => {
    return Axios.delete(`${configData.SERVER_URL}/${`dashboard/delete-employee/${id}`}`);
 }
 export const updateEmployee = (id, payload) => {
    return Axios.put(`${configData.SERVER_URL}/${`dashboard/update-employee/${id}`}`, payload);
 }