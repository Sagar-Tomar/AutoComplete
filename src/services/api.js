import axios from 'axios';


let instance = axios.create({
    baseURL: "http://localhost:8888/",
    headers: {Accept: 'application/json'},
    timeout: 30000,
});


let cancelToken;

export async function fetchNameAutoComplete(name) {
    try {
        if (typeof cancelToken !== typeof undefined) {
            cancelToken.cancel("New Request initiated, hence cancelling it")
        }

        cancelToken = axios.CancelToken.source();

        let response = await instance.get(`https://rickandmortyapi.com/api/character/?name=${name}`, {
            cancelToken: cancelToken.token
        });

        return response.data;


    } catch (error) {
        throw error;
    }
}

