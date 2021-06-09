//login form
const login = document.getElementById("login");

//validate email function
function validateEmail(mail) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
}
let listUser = [];
document.getElementById("login").classList.add("none");

fetch('https://tony-json-server.herokuapp.com/api/users')
    .then(response => response.json())
    .then((res) => {
        if(res.data.length <= 0 || Object.keys(res.data).length <= 0 ) {
           listUser = [];
           return;   
        };
        listUser = res.data;
    })
    .catch((error) => error);
    document.getElementById("login").classList.remove("none");
    document.getElementById("login").classList.add("block");


login.addEventListener("submit", function(event) {
    event.preventDefault();
    const loginEmail = document.getElementById("login-email").value,
          loginPassword = document.getElementById("login-password").value,
          loginMessage = document.getElementById("login-mess");
    if (!validateEmail(loginEmail)) {
        loginMessage.innerHTML = "You have entered an invalid email address!";
        return;
    }
    const isExist = listUser.find(value => loginEmail == value.email && loginPassword == value.password);
    if (!isExist) {
        loginMessage.innerHTML = "Wrong Email or password!";
        return;
    }
    console.log(isExist);
    window.location.href = "../contact/contactform.html";
    localStorage.setItem("id", JSON.stringify(isExist.id));
})
