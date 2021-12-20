import Axios from 'axios';
import configData from '../config.json';

export const getNotesType = () => {
    return Axios.get(`${configData.SERVER_URL}/${'dashboard/notes-type'}`);
 }
export const getProgramLanguage = () => {
    return Axios.get(`${configData.SERVER_URL}/${'dashboard/get-program-language'}`);
 }
 export const getNotes = (id) => {
    return Axios.get(`${configData.SERVER_URL}/${`dashboard/get-notes/${id}`}`);
 }
 export const getAllNotes = () => {
   return Axios.get(`${configData.SERVER_URL}/${`dashboard/get-all-notes/`}`);
}
export const createNotes = (payload) => {
    return Axios.post(`${configData.SERVER_URL}/${'dashboard/create-notes'}`, payload);
}
export const deleteNote = (id) => {
    return Axios.delete(`${configData.SERVER_URL}/${`dashboard/delete-note/${id}`}`);
 }
 export const updateNote = (id, payload) => {
    return Axios.put(`${configData.SERVER_URL}/${`dashboard/update-note/${id}`}`, payload);
 }