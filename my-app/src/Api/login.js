import Axios from 'axios';
import configData from '../config.json';

export const registerLogin = (payload) => {
   return Axios.post(`${configData.SERVER_URL}/${'register'}`, payload);
}
export const getUsers = () => {
   return Axios.get(`${configData.SERVER_URL}/${'getUsers'}`);
}