import Axios from 'axios';
import configData from '../config.json';

export const registerLogin = (payload) => {
    Axios.post(`${configData.SERVER_URL}/${'register'}`, payload).then((response) => {
        console.log("registerLogin api response---", response)
    })
}