function fetchIssues() {
    let colorSeverity = '#333';

    const issues = JSON.parse(localStorage.getItem('issues')) || [];
    console.log(issues);
    let issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (let i = 0; i < issues.length; i++) {
        const id = issues[i].id;
        const desc = issues[i].description;
        const severity = issues[i].severity;
        const assignedTo = issues[i].assignedTo;
        const status = issues[i].status;

        switch (severity) {
            case 'Low':
                colorSeverity = 'black';
                break;
            case 'Medium':
                colorSeverity = 'green';
                break;
            case 'High':
                colorSeverity = 'red';
                break;
            default:
                break
        }

        issuesList.innerHTML += '<div class="well">' + 'issues ID' + id
            + '<p><span class="label label-info">' + status + '</span></p>'
            + desc
            + '<p id="ser" style="color: ' + colorSeverity + ' "><span class="glyphicon glyphicon-time"></span>' + severity
            + '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>'
            + '<a href="javascript:;" class="btn btn-warning" onclick="setStatusClosed(\'' + id + '\')">Close</a>'
            + '<a href="javascript:;" class="btn btn-danger" onclick="deleteIssues(\'' + id + '\')">Delete</a>'
        '</div>';
    }
}

function saveIssue(e) {
    e.preventDefault();
    const issueId = Date.now();
    const issueDesc = document.getElementById('issueDescInput').value;
    const issueSeverity = document.getElementById('issueSeverityInput').value;
    const issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    const issueStatus = 'Open';
    const issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') === null) {
        const issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        const issues = JSON.parse(localStorage.getItem('issues'))
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    document.getElementById('issueInputForm').reset();

    fetchIssues();

}

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function setStatusClosed(id) {
    const issues = JSON.parse(localStorage.getItem('issues'))
    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id === Number(id)) {
            issues[i].status = "Closed";
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function deleteIssues(id) {
    const issues = JSON.parse(localStorage.getItem('issues'))
    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id === Number(id)) {
            issues.splice(i, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}