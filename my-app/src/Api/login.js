import Axios from 'axios';
import configData from '../config.json';

export const loginUserDetails = (payload) => {
   return Axios.post(`${configData.SERVER_URL}/${'loginUserDetailsPost'}`, payload);
}
export const registerLogin = (payload) => {
   return Axios.post(`${configData.SERVER_URL}/${'register'}`, payload);
}
