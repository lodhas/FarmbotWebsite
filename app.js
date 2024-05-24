// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

$(document).ready(function() {
    const dataTable = $('#dataTable').DataTable();

    // Function to update the datatable
    function updateTable(data) {
        dataTable.clear();
        data.forEach(item => {
            dataTable.row.add([
                item.id,
                item.name,
                item.value
            ]).draw();
        });
    }

    // Fetch initial data from Firebase
    database.ref('items').on('value', snapshot => {
        const data = [];
        snapshot.forEach(childSnapshot => {
            const item = childSnapshot.val();
            data.push({
                id: childSnapshot.key,
                name: item.name,
                value: item.value
            });
        });
        updateTable(data);
    });

    // Set up the live video stream using WebRTC
    const video = document.getElementById('liveVideo');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            video.srcObject = stream;
            video.play();
        }).catch(error => {
            console.error("Error accessing the camera: ", error);
        });
    } else {
        alert("Your browser does not support accessing the camera.");
    }
});
