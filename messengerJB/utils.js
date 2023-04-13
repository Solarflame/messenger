const BASE_URL = 'http://10.60.10.16:8080/api/'
async function makeQuery(endpoint, method = 'get', payload= {}) {
    const options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    if(method.toLowerCase() == 'put' || method.toLowerCase() == 'post'){
        options.body = JSON.stringify(payload);
    };
    const responce = await fetch(BASE_URL + endpoint, options);
    return await responce.json();
};