function fetchIssues() {
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



        issuesList.innerHTML += '<div class="well">' + 'issues ID' + id
            + '<p><span class="label label-info">' + status + '</span></p>'
            + desc
            + '<p><span class="glyphicon glyphicon-time"></span>' + severity
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
    console.log('setStatusClosed', id)
}

function deleteIssues(id) {
    console.log('deleteIssues', id)
}