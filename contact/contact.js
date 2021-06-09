//contact form
const id = JSON.parse(localStorage.getItem("id"));
if (!id) window.location.href = "../login/loginform.html";
let dataUser = {};
fetch(`https://tony-json-server.herokuapp.com/api/users/${id}`)
    .then(res => res.json())
    .then(res => {
        dataUser = res.data;
        const contact = document.getElementById("contact");
        const firstName = document.getElementById("fname");
        const lastName = document.getElementById("lname");
        const country = document.getElementById("country");
        const subject = document.getElementById("subject");
        firstName.value = dataUser.firstName;
        lastName.value = dataUser.lastName;
        country.value = dataUser.country;
        subject.value = dataUser.subject;
        contact.addEventListener("submit", function (event) {
            event.preventDefault();
            const firstName = document.getElementById("fname").value,
                lastName = document.getElementById("lname").value,
                country = document.getElementById("country").value,
                subject = document.getElementById("subject").value;
            if (dataUser.firstName === firstName && dataUser.lastName === lastName && dataUser.country === country && dataUser.subject === subject) {
                window.location.href = "../issues/index.html";
                return;
            }
            dataUser.firstName = firstName;
            dataUser.lastName = lastName;
            dataUser.country = country;
            dataUser.subject = subject;
            fetch(`https://tony-json-server.herokuapp.com/api/users/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: dataUser.firstName,
                    lastName: dataUser.lastName,
                    country: dataUser.country,
                    subject: dataUser.subject
                })
            })
            .then(res => window.location.href = "../issues/index.html")
            
        })
    })




