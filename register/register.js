//resgister form

//validate email function
function validateEmail(mail) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
}
let listUser = [];
document.getElementById("register").classList.add("none");
fetch('https://tony-json-server.herokuapp.com/api/users')
    .then(res => res.json())
    .then(res => {
        listUser = res.data;
        document.getElementById("register").classList.add("block");
    })
const register = document.getElementById("register")
register.addEventListener("submit", function(event) {
    event.preventDefault();
    const a = 2;
    const resEmailMessage = document.getElementById("email-mess");
    const resPasswordMessage = document.getElementById("password-mess");
    resEmailMessage.innerHTML = "";
    resPasswordMessage.innerHTML = "";
    const resEmail = document.getElementById("res-email").value;
    const resPassword = document.getElementById("res-pass").value;
    const repeatPassWord = document.getElementById("res-re-pass").value;

    //validate email
    if (!validateEmail(resEmail)) {
        resEmailMessage.innerHTML = "You have entered an invalid email address!";
        return;
    }
    if (resPassword !== repeatPassWord) {
        resPasswordMessage.innerHTML = "Those password didn't match.Try again!";
        return;
    }
    
    const isSameEmail = listUser.some(value => value.email === resEmail);
    if (isSameEmail) {
        resEmailMessage.innerHTML = "That email is taken";
        return;
    }

    const newUser = {
        email: resEmail,
        password: resPassword,
        firstName: "",
        lastName: "",
        country: "",
        subject: "",
    };
    fetch('https://tony-json-server.herokuapp.com/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(res => {
        window.location.href = "../login/loginform.html";
    })
})
