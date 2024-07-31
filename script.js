document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const reportForm = document.getElementById('reportForm');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(registerForm);
            const userData = Object.fromEntries(formData.entries());
            localStorage.setItem('userData', JSON.stringify(userData));
            alert('Registration successful!');
            window.location.href = 'login.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const storedUserData = JSON.parse(localStorage.getItem('userData'));

            if (storedUserData && storedUserData.email === email && storedUserData.password === password) {
                alert('Login successful!');
                window.location.href = 'profile.html';
            } else {
                alert('Invalid email or password. Please register first.');
            }
        });
    }

    if (reportForm) {
        reportForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(reportForm);
            const reportData = Object.fromEntries(formData.entries());
            let reports = JSON.parse(localStorage.getItem('reports')) || [];
            reports.push(reportData);
            localStorage.setItem('reports', JSON.stringify(reports));
            alert('Report submitted successfully!');
            reportForm.reset();
        });
    }

    if (document.getElementById('profile')) {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData) {
            document.getElementById('profileName').textContent = storedUserData.name;
            document.getElementById('profileEmail').textContent = storedUserData.email;
            document.getElementById('profileMobile').textContent = storedUserData.mobile || '';
            document.getElementById('profileSocial').textContent = storedUserData.social || '';
            document.getElementById('profileAddress').textContent = storedUserData.address || '';
            document.getElementById('profilePoints').textContent = storedUserData.points || '0';
            if (storedUserData.photo) {
                document.getElementById('profilePhoto').src = URL.createObjectURL(storedUserData.photo);
            }
        }

        const incidentList = document.getElementById('incidentList');
        let reports = JSON.parse(localStorage.getItem('reports')) || [];
        reports.forEach((report, index) => {
            let listItem = document.createElement('li');
            listItem.textContent = `Report ${index + 1}: ${report.description}`;
            incidentList.appendChild(listItem);
        });
    }

    if (document.getElementById('inProgressList')) {
        const inProgressList = document.getElementById('inProgressList');
        const completedList = document.getElementById('completedList');
        let reports = JSON.parse(localStorage.getItem('reports')) || [];
        reports.forEach((report, index) => {
            let listItem = document.createElement('li');
            listItem.textContent = `Report ${index + 1}: ${report.description}`;
            if (report.completed) {
                completedList.appendChild(listItem);
                let feedbackBox = document.createElement('div');
                feedbackBox.innerHTML = `
                    <label for="feedback${index}">Feedback:</label>
                    <input type="text" id="feedback${index}" name="feedback">
                `;
                listItem.appendChild(feedbackBox);
            } else {
                inProgressList.appendChild(listItem);
                // Show photo, address, type of waste, date, and time
                if (report.photo) {
                    let photoElement = document.createElement('img');
                    photoElement.src = URL.createObjectURL(report.photo);
                    photoElement.style.width = '100px'; // Adjust as needed
                    photoElement.style.height = '100px'; // Adjust as needed
                    listItem.appendChild(photoElement);
                }
                let details = document.createElement('div');
                details.innerHTML = `
                    <p>Address: ${report.location}</p>
                    <p>Waste Type: ${report.wasteType}</p>
                    <p>Date: ${new Date().toLocaleDateString()}</p>
                    <p>Time: ${new Date().toLocaleTimeString()}</p>
                `;
                listItem.appendChild(details);
            }
        });
    }

    if (document.getElementById('complaintChart')) {
        const ctx = document.getElementById('complaintChart').getContext('2d');
        const reports = JSON.parse(localStorage.getItem('reports')) || [];
        const data = {
            labels: ['Completed', 'In Progress'],
            datasets: [{
                data: [
                    reports.filter(report => report.completed).length,
                    reports.filter(report => !report.completed).length
                ],
                backgroundColor: ['#4CAF50', '#FF6384']
            }]
        };
        new Chart(ctx, {
            type: 'pie',
            data: data
        });
    }
});


// document.addEventListener('DOMContentLoaded', () => {
//     const registerForm = document.getElementById('registerForm');
//     const loginForm = document.getElementById('loginForm');
//     const reportForm = document.getElementById('reportForm');

//     if (registerForm) {
//         registerForm.addEventListener('submit', (event) => {
//             event.preventDefault();
//             const formData = new FormData(registerForm);
//             const userData = Object.fromEntries(formData.entries());
//             userData.photo = formData.get('photo'); // Store the File object
//             localStorage.setItem('userData', JSON.stringify(userData));
//             alert('Registration successful!');
//             window.location.href = 'login.html';
//         });
//     }

//     if (loginForm) {
//         loginForm.addEventListener('submit', (event) => {
//             event.preventDefault();
//             const email = document.getElementById('loginEmail').value;
//             const password = document.getElementById('loginPassword').value;
//             const storedUserData = JSON.parse(localStorage.getItem('userData'));

//             if (storedUserData && storedUserData.email === email && storedUserData.password === password) {
//                 alert('Login successful!');
//                 window.location.href = 'profile.html';
//             } else {
//                 alert('Invalid email or password. Please register first.');
//             }
//         });
//     }

//     if (reportForm) {
//         reportForm.addEventListener('submit', (event) => {
//             event.preventDefault();
//             const formData = new FormData(reportForm);
//             const reportData = Object.fromEntries(formData.entries());
//             reportData.photo = formData.get('photo'); // Store the File object
//             reportData.completed = false; // Initialize report as not completed
//             let reports = JSON.parse(localStorage.getItem('reports')) || [];
//             reports.push(reportData);
//             localStorage.setItem('reports', JSON.stringify(reports));
//             alert('Report submitted successfully!');
//             reportForm.reset();
//         });
//     }

//     if (document.getElementById('profile')) {
//         const storedUserData = JSON.parse(localStorage.getItem('userData'));
//         if (storedUserData) {
//             document.getElementById('profileName').textContent = storedUserData.name;
//             document.getElementById('profileEmail').textContent = storedUserData.email;
//             document.getElementById('profilePhone').textContent = storedUserData.phone || '';
//             if (storedUserData.photo) {
//                 document.getElementById('profilePhoto').src = URL.createObjectURL(new Blob([storedUserData.photo]));
//             }
//         }

//         const incidentList = document.getElementById('incidentList');
//         let reports = JSON.parse(localStorage.getItem('reports')) || [];
//         reports.forEach((report, index) => {
//             let listItem = document.createElement('li');
//             listItem.textContent = `Report ${index + 1}: ${report.description}`;
//             incidentList.appendChild(listItem);
//         });
//     }

//     if (document.getElementById('inProgressList')) {
//         const inProgressList = document.getElementById('inProgressList');
//         const completedList = document.getElementById('completedList');
//         let reports = JSON.parse(localStorage.getItem('reports')) || [];
//         reports.forEach((report, index) => {
//             let listItem = document.createElement('li');
//             listItem.textContent = `Report ${index + 1}: ${report.description}`;
//             if (report.completed) {
//                 completedList.appendChild(listItem);
//                 let feedbackBox = document.createElement('div');
//                 feedbackBox.innerHTML = `
//                     <label for="feedback${index}">Feedback:</label>
//                     <input type="text" id="feedback${index}" name="feedback">
//                 `;
//                 listItem.appendChild(feedbackBox);
//             } else {
//                 inProgressList.appendChild(listItem);
//                 // Show photo, address, type of waste, date, and time
//                 if (report.photo) {
//                     let photoElement = document.createElement('img');
//                     photoElement.src = URL.createObjectURL(new Blob([report.photo]));
//                     photoElement.style.width = '100px'; // Adjust as needed
//                     photoElement.style.height = '100px'; // Adjust as needed
//                     listItem.appendChild(photoElement);
//                 }
//                 let details = document.createElement('div');
//                 details.innerHTML = `
//                     <p>Address: ${report.location}</p>
//                     <p>Waste Type: ${report.wasteType}</p>
//                     <p>Date: ${new Date().toLocaleDateString()}</p>
//                     <p>Time: ${new Date().toLocaleTimeString()}</p>
//                 `;
//                 listItem.appendChild(details);
//             }
//         });
//     }

//     if (document.getElementById('complaintChart')) {
//         const ctx = document.getElementById('complaintChart').getContext('2d');
//         const reports = JSON.parse(localStorage.getItem('reports')) || [];
//         const data = {
//             labels: ['Completed', 'In Progress'],
//             datasets: [{
//                 data: [
//                     reports.filter(report => report.completed).length,
//                     reports.filter(report => !report.completed).length
//                 ],
//                 backgroundColor: ['#4CAF50', '#FF6384']
//             }]
//         };
//         new Chart(ctx, {
//             type: 'pie',
//             data: data
//         });
//     }
// });
