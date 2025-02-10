document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
        });

        const result = await response.json();
        if (result.success) {
            alert("Message sent successfully!");
            document.getElementById("contactForm").reset(); // Clear form
        } else {
            alert("Error: " + result.error);
        }
    } catch (error) {
        alert("Failed to send message. Try again later.");
    }
});
