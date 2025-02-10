// async function fetchMessages() {
//     try {
//         const response = await fetch("/messages");
//         const data = await response.json();
        
//         const messagesDiv = document.getElementById("messages");
//         messagesDiv.innerHTML = ""; // Clear previous messages

//         data.documents.forEach((doc) => {
//             const messageEl = document.createElement("div");
//             messageEl.innerHTML = `
//                 <p><strong>${doc.name}</strong> (${doc.email})</p>
//                 <p>${doc.message}</p>
//                 <button onclick="deleteMessage('${doc.$id}')">Delete</button>
//                 <hr>
//             `;
//             messagesDiv.appendChild(messageEl);
//         });
//     } catch (error) {
//         console.error("Error fetching messages:", error);
//     }
// }

// async function deleteMessage(id) {
//     try {
//         const response = await fetch(`/messages/${id}`, { method: "DELETE" });
//         const result = await response.json();

//         if (result.success) {
//             alert("Message deleted!");
//             fetchMessages(); // Refresh messages
//         } else {
//             alert("Failed to delete message.");
//         }
//     } catch (error) {
//         console.error("Error deleting message:", error);
//     }
// }

// // Load messages on page load
// fetchMessages();






// Your admin page is not showing data because:

// The API response structure might not match what your JavaScript expects.
// admin.js is targeting #messages, but your table is using #messageTable.
// The JSON key should be data.documents, not data.data.
// fetchMessages() in admin.js is trying to add <div> elements, but your table requires <tr> and <td>.



async function fetchMessages() {
    try {
        const response = await fetch("/messages");
        const data = await response.json();
        
        const tableBody = document.getElementById("messageTable");
        tableBody.innerHTML = ""; // Clear previous messages

        if (!data.documents || data.documents.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4" class="border p-2 text-center">No messages found</td></tr>`;
            return;
        }

        data.documents.forEach((doc) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td class="border p-2">${doc.name}</td>
                <td class="border p-2">${doc.email}</td>
                <td class="border p-2">${doc.message}</td>
                <td class="border p-2">
                    <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="deleteMessage('${doc.$id}')">Delete</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

async function deleteMessage(id) {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
        const response = await fetch(`/messages/${id}`, { method: "DELETE" });
        const result = await response.json();

        if (result.success) {
            fetchMessages(); // Refresh table after deletion
        } else {
            alert("Failed to delete message.");
        }
    } catch (error) {
        console.error("Error deleting message:", error);
    }
}

// Load messages on page load
fetchMessages();
