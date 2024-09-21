import axios from 'axios';

export default async function fetch(set, endpoint) {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}`);
        set(res.data);
    } catch (err) {
        console.log(err);
    }
}