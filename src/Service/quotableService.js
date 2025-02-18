import axios from "axios";

// URL de la API
const API_URL = "https://api.quotable.io"; 

// Obtenemos una frase aleatoria
export const getPhrase = async () => {
    return await axios.get(`${API_URL}/random` );
};

