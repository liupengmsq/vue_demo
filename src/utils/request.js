import axios from 'axios';

export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(url, data, {
            baseURL: 'http://localhost:9090',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            resolve(response.data);
        }, err => {
            console.log('error in post', err);
            reject(err);
        })
    });
}
