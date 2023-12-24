import { addstudent} from '/home/batth/sanjha/code/winter23/db/addstudent.js';


document.addEventListener('DOMContentLoaded', async function () {
    const allocationForm = document.getElementById('allocationForm');
    const roomList = document.getElementById('roomList');

    allocationForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const studentName = document.getElementById('studentName').value;
        const roomType = document.getElementById('roomType').value;
        const floor = document.getElementById('floor').value;

        // Perform room allocation logic here (you can use AJAX to communicate with a server)

        // For demonstration purposes, just display the allocated room in the list
        const listItem = document.createElement('li');
        listItem.textContent = `${studentName} - Room Type: ${roomType}, Floor: ${floor}`;
        roomList.appendChild(listItem);
        await addstudent(studentName,roomType,floor);
        // Clear the form fields
        allocationForm.reset();
    });
});
//
