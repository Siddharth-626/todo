
 const singup_btn = document.querySelector('.signup_btn');
 const signup = document.querySelector('.signup');
 const login = document.querySelector('.login');
 const login_btn = document.querySelector('.login_btn');
 const jwt_token = '';
 const container = document.querySelector('.container');
 const logout_btn = document.querySelector('.logout_btn')
 const info = document.querySelector('.info');
 singup_btn.addEventListener('click',()=>{
   
    info.style.display = 'none'
    if( login.style.display == "flex"){
        login.style.display = "none";
    }
    signup.style.display = "flex";
 })

 login_btn.addEventListener('click',()=>{
    const info = document.querySelector('.info');
    info.style.display = 'none'
    if( signup.style.display == "flex"){
        signup.style.display = "none";
    }
    login.style.display = "flex";
 })

 async function auth_signup() {
    const username = document.querySelector('.signup_username');
    const password = document.querySelector('.signup_password');
    
    try {
        const response = await fetch('http://localhost:3000/auth/signup',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                username: `${username}`,
            password: `${password}`
            })
        })
        if(!response){
            throw new error("Network not ok")
        }
        
        if( signup.style.display == "flex"){
            signup.style.display = "none";
        }
        login.style.display = "flex";
    } catch (error) {
        console.error('Error:', error);
    }
 }
 
 async function auth_login() {
    const username = document.querySelector('.login_username');
    const password = document.querySelector('.login_password');
    
    try {
        const response = await fetch('http://localhost:3000/auth/login',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                username: `${username}`,
            password: `${password}`
            })
        })
        if(!response){
            throw new error("Network not ok")
        }
        const token = await response.json();
        localStorage.setItem('token', token);
        console.log('Token stored in localStorage:',token);
        if(token){
            console.log(token);
            main();
        }
        console.log('Log in sucess');
       
    } catch (error) {
        console.error('Error:', error);
    }
 }

 const auth_signup_btn = document.querySelector('.auth_signup_btn');
 const auth_login_btn = document.querySelector('.auth_login_btn');

 auth_signup_btn.addEventListener('click',()=>{
    auth_signup();
 })
 auth_login_btn.addEventListener('click',()=>{
    auth_login();
    
    logout_btn.style.display = "initial"
    singup_btn.style.display = "none"
    login_btn.style.display = "none";
    signup.style.display = "none";
    login.style.display = "none";
 })

 logout_btn.addEventListener('click',async()=>{
      localStorage.removeItem('token');
      const token = localStorage.getItem('token');
    console.log("removed token");
    console.log(token);
    container.style.display = 'none';
    info.style.display = 'initial';
    singup_btn.style.display = "initial"
    login_btn.style.display = "initial";
     logout_btn.style.display = "none"
 })


 function main() {
     container.style.display = 'initial';
     fetchData()
     
 }


 async function fetchData() {
    try {
        const token = localStorage.getItem('token');
        console.log("fetch data",token);
        const response = await fetch('http://localhost:3000/todo/todos',{
            method:'GET',
            headers:{
                  'Authorization': `Bearer ${token}`
            }
        });
        if (!response) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data from the server:', data);

        // Clear the existing list items
        const todol = document.getElementById('todoList');
        todol.innerHTML = '';

        // Iterate over the data and create list items
        data.forEach(item => {
            let listItem = document.createElement('li');
            listItem.textContent = `${item.title}  : ${item.description}`;
            todol.appendChild(listItem);
            let editbutton = document.createElement('button');
            editbutton.textContent = "Edit"
            editbutton.id = "btne"
            editbutton.onclick = function () {
                clickedit(item);
            };
            
            listItem.appendChild(editbutton)
            let deletebutton = document.createElement('button');
            deletebutton.textContent = "Delete"
            deletebutton.id = "btnd"
            deletebutton.onclick = function () {
                clickdelete(item._id)
            }
            listItem.appendChild(deletebutton)
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

async function createtodo() {
    try {
        let ti = document.getElementById('title')
        let des = document.getElementById('description')
        let data = { title: ti.value, description: des.value }
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/todo/todos', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response) {
                throw new Error('Network response was not ok');
            }
            const res = response.json();
            console.log(res, "dfsdfs")
            ti.value = ""
            des.value = ""

            fetchData()
        })
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

async function clickedit(item) {
    try {
        const id = item._id;
        console.log("fsdf", id)
        const token = localStorage.getItem('token');
        // Change the button text to "Update"
        const saveButton = document.getElementById('btn');
        saveButton.textContent = "Update";

        // Populate the input fields with the item data
        const tButton = document.getElementById('title');
        tButton.value = item.title;
        const dButton = document.getElementById('description');
        dButton.value = item.description;
        // Add a click event listener to the button for updating
        saveButton.onclick = async () => {
            try {
                let ti = tButton.value;
                let des = dButton.value;
                let data = { title: ti, description: des };

                const response = await fetch(`http://localhost:3000/todo/todos/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                });

                if (!response) {
                    throw new Error('Network response was not ok');
                }

                const res = await response.json();
                console.log(res, "dfsdfs");
                fetchData();

                // Reset the button text to "Save"
                saveButton.textContent = "Save";

                // Clear the input fields
                tButton.value = '';
                dButton.value = '';
            } catch (error) {
                console.error('Error updating data:', error.message);
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}
async function clickdelete(id) {
    const token = localStorage.getItem('token');
    let res = await fetch(`http://localhost:3000/todo/todos/${id}`, {
        method: "DELETE",
        headers:{
           'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        console.log(res, "res")
        fetchData();
    })
}