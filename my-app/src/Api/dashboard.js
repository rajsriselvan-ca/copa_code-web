import Axios from 'axios';
import configData from '../config.json';

export const getNotesType = () => {
    return Axios.get(`${configData.SERVER_URL}/${'dashboard/notes-type'}`);
 }
export const getProgramLanguage = () => {
    return Axios.get(`${configData.SERVER_URL}/${'dashboard/get-program-language'}`);
 }