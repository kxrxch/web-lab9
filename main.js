let selectedImage = null;
const name = document.getElementById('name')
name.addEventListener('input', function (){
    checker(this,"^([А-ЯЁA-Z][а-яёa-z]+)(\\s[А-ЯЁA-Z][а-яёa-z]+)?(\\s[А-ЯЁA-Z][а-яёa-z]+)?$")
})
const fileInput = document.getElementById('file-input');
const image = document.querySelector('.photo img');
const text = document.querySelector('.photo span');

fileInput.addEventListener('change', function(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.addEventListener('load', function() {
            image.src = reader.result;
            text.textContent = selectedFile.name;
        });
        reader.readAsDataURL(selectedFile);
    }
});

const right = document.querySelector('.right')
const inputFields = right.querySelectorAll("input, select");

function saveData() {
    inputFields.forEach((field) => {
        const fieldName = field.id;
        const fieldValue = field.value;
        localStorage.setItem(fieldName, fieldValue);
    });
}

function loadData() {
    inputFields.forEach((field) => {
        const fieldName = field.id;
        const fieldValue = localStorage.getItem(fieldName);
        if (fieldValue) {
            field.value = fieldValue;
        }
    });
}

inputFields.forEach((field) => {
    field.addEventListener("input", saveData);
});

let usersData = {};
loadData();

function saveUserData() {
    const userName = document.getElementById('name').value;
    const userDate = document.getElementById('date').value;
    const userSex = document.getElementById('sex').value;
    const userSign = document.getElementById('zodiacthekiller').value;
    const userPet = document.getElementById('pet').value;
    const userHobby = document.getElementById('hobby').value;

    usersData[userName] = {
        name: userName,
        date: userDate,
        sex: userSex,
        sign: userSign,
        pet: userPet,
        hobby: userHobby,
    };

    document.getElementById('name').value = '';
    document.getElementById('date').value = '';
    document.getElementById('sex').value = '';
    document.getElementById('zodiacthekiller').value = '';
    document.getElementById('pet').value = '';
    document.getElementById('hobby').value = '';

    updateDropdown();
    saveUsersDataToLocal();
}

function loadUserData() {
    const selectedUser = document.getElementById('userSelect').value;

    if (selectedUser in usersData) {
        const userData = usersData[selectedUser];
        document.getElementById('userName').value = selectedUser;
        document.getElementById('name').value = userData.name;
        document.getElementById('date').value = userData.date;
        document.getElementById('sex').value = userData.sex;
        document.getElementById('zodiacthekiller').value = userData.sign;
        document.getElementById('pet').value = userData.pet;
        document.getElementById('hobby').value = userData.hobby;
    } else {
        document.getElementById('userName').value = '';
        document.getElementById('name').value = '';
        document.getElementById('date').value = '';
        document.getElementById('sex').value = '';
        document.getElementById('zodiacthekiller').value = '';
        document.getElementById('pet').value = '';
        document.getElementById('hobby').value = '';
    }
}

function createDropdown() {
    const userSelect = document.getElementById('userSelect');
    userSelect.innerHTML = '';
    for (const userName in usersData) {
        const option = document.createElement('option');
        option.value = userName;
        option.text = userName;
        userSelect.appendChild(option);
    }
}

function updateDropdown() {
    createDropdown();
}

function onSelectChange() {
    loadUserData();
}

function loadUser(selectedUser) {
    const userData = usersData[selectedUser];

    document.getElementById('name').value = userData.name;
    document.getElementById('date').value = userData.date;
    document.getElementById('sex').value = userData.sex;
    document.getElementById('zodiacthekiller').value = userData.sign;
    document.getElementById('pet').value = userData.pet;
    document.getElementById('hobby').value = userData.hobby;
}

const userSelect = document.getElementById('userSelect');
userSelect.addEventListener('change', function () {
    const selectedUser = this.value;
    loadUser(selectedUser);
});

function saveUsersDataToLocal() {
    const usersDataString = JSON.stringify(usersData);
    localStorage.setItem('usersData', usersDataString);
}

function loadUsersDataFromLocal() {
    const usersDataString = localStorage.getItem('usersData');
    if (usersDataString) {
        usersData = JSON.parse(usersDataString);
        updateDropdown();
    }
}

loadUsersDataFromLocal();

function addUser() {
    const newUser = document.getElementById('newUserName').value;
    if (newUser) {
        usersData[newUser] = {
            name: newUser,
            date: '',
            sex: '',
            sign: '',
            pet: '',
            hobby: '',
        };

        document.getElementById('newUserName').value = '';
        updateDropdown();
        saveUsersDataToLocal();
    }
}

function clearUsersList() {
    usersData = {};
    updateDropdown();
    saveUsersDataToLocal();
    loadUserData();
}


const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addUser);

const deleteButton = document.getElementById('deleteButton');
deleteButton.addEventListener('click', clearUsersList);