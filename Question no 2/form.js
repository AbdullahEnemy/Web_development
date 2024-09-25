let applicationsData = [];

document.addEventListener('DOMContentLoaded', onLoadEvent)

function onLoadEvent() {
    const form = document.getElementById('jobForm');
    const viewTableBtn = document.getElementById('viewTableBtn');
    const applicationsTable = document.getElementById('applicationsTable');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            const formData = new FormData(form);
            const applicantData = Object.fromEntries(formData.entries());

            // Handle file input to get file name
            const resumeInput = document.getElementById('resume');
            const resumeFile = resumeInput.files[0];
            if (resumeFile) {
                applicantData['resume'] = resumeFile.name; 
            }

            applicationsData.push(applicantData);
            console.log('Application Data:', applicantData);
            form.reset();
        }
    });

    viewTableBtn.addEventListener('click', function() {
        displayApplicationsTable();
    });
}

function validateForm() {
    let isValid = true;
    const requiredFields = document.querySelectorAll('[required]');

    requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            field.addEventListener('input', function() {
                field.classList.remove('error');
            });
        }
    });

    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');

    if (emailField.value.trim() && !isValidEmail(emailField.value.trim())) {
        isValid = false;
        emailField.classList.add('error');
        emailField.addEventListener('input', function() {
            emailField.classList.remove('error');
        });
    }

    if (phoneField.value.trim() && !isValidPhone(phoneField.value.trim())) {
        isValid = false;
        phoneField.classList.add('error');
        phoneField.addEventListener('input', function() {
            phoneField.classList.remove('error');
        });
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\d{4}\d{7}$/;
    return phoneRegex.test(phone);
}

function displayApplicationsTable() {
    const applicationsTable = document.getElementById('applicationsTable');
    applicationsTable.innerHTML = '';

    if (applicationsData.length === 0) {
        applicationsTable.innerHTML = '<p>No applications to display</p>';
        return;
    }

    const table = document.createElement('table');
    const headerRow = table.insertRow();

    // Create table header
    for (let key in applicationsData[0]) {
        if (applicationsData[0].hasOwnProperty(key)) {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        }
    }

    // Create table rows
    applicationsData.forEach(function(applicant) {
        const row = table.insertRow();
        for (let key in applicant) {
            if (applicant.hasOwnProperty(key)) {
                const cell = row.insertCell();
                if (key === 'resume' && applicant[key] instanceof File) {
                    cell.textContent = applicant[key].name; // Display file name for resume
                } else {
                    cell.textContent = applicant[key];
                }
            }
        }
    });

    applicationsTable.appendChild(table);
}
