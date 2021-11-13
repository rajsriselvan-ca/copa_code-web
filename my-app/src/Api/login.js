import Axios from 'axios';
import configData from '../config.json';

export const registerLogin = (payload) => {
   return Axios.post(`${configData.SERVER_URL}/${'register'}`, payload);
}