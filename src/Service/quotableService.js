import axios from "axios";

const API_URL = "https://api.quotable.io"; 


export const getPhrase = async () => {
    return await axios.get(`${API_URL}/random` );
};

