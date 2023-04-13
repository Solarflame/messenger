const createBtn = document.querySelector('#create_btn');
async function makeQuery(endpoint, method='GET', payload='') {
    const APP_ID = '642d744dbbe6ab9e89b5ba54';
    const BASE_URL = 'https://dummyapi.io/data/v1/'
    const options = {
        method,
        headers: {
            'app-id': APP_ID,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // ...(method.toLowerCase() == 'post' && { body: JSON.stringify(payload) })
    };

    if(method.toLowerCase() == 'put' || method.toLocaleLowerCase() == 'post'){
        options.body = JSON.stringify(payload);
    };
    
    let response = await fetch(BASE_URL + endpoint, options);
    let { data } = await response.json();
    return data;
};

async function drawUsers() {
    const users = await makeQuery('user?created=1');
    document.querySelector("#users").innerHTML = '';
    users.forEach(user => {
        document.querySelector("#users").innerHTML += `
            <input id="firstName-${user.id}" value="${user.firstName}"> 
            <input id="lastName-${user.id}" value="${user.lastName}">
            <button onclick="updateUser('${user.id}')">Update</button>
            <button onclick="deleteUser('${user.id}')">Delete</button>
            <hr>
        `;
    });
};

drawUsers();

createBtn.addEventListener('click', async () =>{
    const firstName = document.querySelector('#firstName_input').value;
    const lastName = document.querySelector('#lastName_input').value;
    const email = document.querySelector('#email_input').value;
    
    let payload = {
        firstName,
        lastName,
        email,
    };

    await makeQuery('user/create', 'post', payload);
    drawUsers();
});

async function deleteUser(userId) {
   await makeQuery('user/' + userId, 'delete');
   drawUsers();
};

async function updateUser(userId){
    const newFirstName = document.querySelector(`#firstName-${userId}`).value;
    const newLastName = document.querySelector(`#lastName-${userId}`).value;
    const payload = {
        firstName: newFirstName,
        lastName: newLastName,
    }
   await makeQuery('user/' + userId, 'put', payload);
   drawUsers();
};