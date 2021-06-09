//Issue Tracker
const id = JSON.parse(localStorage.getItem("id"));
if (!id) window.location.href = "../login/loginform.html";

const loader = document.querySelector(".loader")
const container = document.getElementById("container");
container.classList.add("none");
let listTodo = [];
let listIssue;
const innerIssuesList = document.getElementById("issuesList");

fetch("https://tony-json-server.herokuapp.com/api/todos")
    .then(res => res.json())
    .then(res => {
        loader.classList.add("none");
        container.classList.add("block");
        listTodo = res.data;
        listIssue = listTodo.filter(element => element.userId === id)
        if (listIssue.length > 0) {
            fetchIssues();
        }
    })

const issue = document.getElementById("issueInputForm");
issue.addEventListener("submit", function (event) {
    event.preventDefault();
    const description = document.getElementById("issueDescInput").value,
        severity = document.getElementById("issueSeverityInput").value,
        assignedTo = document.getElementById("issueAssignedToInput").value;
    if (!description) {
        alert("Nhap description");
        return;
    }
    if (!assignedTo) {
        alert("Nhap assignedTo");
        return;
    }
    const newUser = {
        id: chance.guid(),
        userId: id,
        description,
        severity,
        assignedTo,
        status: "open"
    }
    fetch("https://tony-json-server.herokuapp.com/api/todos", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(_ => {
        issue.reset();
        listIssue.push(newUser);
        fetchIssues();
    })
})
function setStatus(id) {

    console.log(id)
    // const setStatus = document.getElementsByClassName("setStatus");
    const status = document.getElementsByClassName("status");
    for (let index in listIssue) {
        if (listIssue[index].id === id) {
            if (listIssue[index].status !== "open") {
                fetch(`https://tony-json-server.herokuapp.com/api/todos/${id}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        status: "open"
                    })
                })
                listIssue[index].status = "open";
                status[index].textContent = "open";
                fetchIssues();
                return;
            }
            fetch(`https://tony-json-server.herokuapp.com/api/todos/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: "close"
                })
            })
            listIssue[index].status = "close";
            status[index].textContent = "close";
            fetchIssues();
        }
    }
}
function deleteIssue(id) {
    const arrayLength = listIssue.length;
    fetch(`https://tony-json-server.herokuapp.com/api/todos/${id}`, {
        method: "DELETE"
    })
    
    for (let i = 0; i < arrayLength; i++) {
        if (listIssue[i].id === id) {
            listIssue.splice(i, 1);
            fetchIssues();
            // i = arrayLength;
            return;
        }
    }
}
function fetchIssues(list = listIssue) {
    const arrayLength = list.length;
    const severityText = document.getElementsByClassName("severity");
    const setStatusInnerHTML = document.getElementsByClassName("setStatus");
    innerIssuesList.innerHTML = "";
    for (let i = 0; i < arrayLength; i++) {
        innerIssuesList.innerHTML += `<div class="well">
            <h6>Issue ID: ${list[i].id}</h6>
            <p><span class="label label-info status"> ${list[i].status} </span></p>
            <h3> ${list[i].description}</h3>
            <p ><span class="glyphicon glyphicon-time severity"> ${list[i].severity}</span>
            <span class="glyphicon glyphicon-user"></span> ${list[i].assignedTo}</p>
            <a href="#" class="btn btn-warning setStatus" onclick="setStatus(\'${list[i].id}\')">Close</a>
            <a href="#" class="btn btn-danger" onclick="deleteIssue(\'${list[i].id}\')">Delete</a>
            </div>`;

        if (list[i].severity == "Low") {
            severityText[i].classList.add("low");
        }
        else if (list[i].severity == "Medium") {
            severityText[i].classList.add("medium");
        }
        else {
            severityText[i].classList.add("high");
        }
        // if (list[i].status === "close") {
        //     setStatusInnerHTML[i].classList.add("disabled");
        // }
        if (list[i].status == "open") {
            setStatusInnerHTML[i].textContent = "Close";
        }
        else {
            setStatusInnerHTML[i].textContent = "Open";
        }
    }
}