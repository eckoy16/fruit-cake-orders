// =======================================
// Initialize EmailJS
// Replace this with your EmailJS Public Key
// =======================================
emailjs.init("YOUR_PUBLIC_KEY"); 
// Example: emailjs.init("H8sh77_xxxxx");


// =======================================
// Generate Tracking Number
// Format: FC-YYYYMMDD-RANDOM5
// =======================================
function generateTrackingNumber() {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const random = Math.floor(10000 + Math.random() * 90000);
    return `FC-${date}-${random}`;
}


// =======================================
// Order Form Submission Handler
// =======================================
document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Generate tracking ID
    const trackingNumber = generateTrackingNumber();
    document.getElementById("tracking_number").value = trackingNumber;

    // Collect form data
    const formData = {
        customer_name: this.customer_name.value,
        customer_email: this.customer_email.value,
        customer_contact: this.customer_contact.value,
        cake_type: this.cake_type.value,
        quantity: this.quantity.value,
        payment_method: this.payment_method.value,
        notes: this.notes.value,
        tracking_number: trackingNumber
    };

    // =======================================
    // Send Email using EmailJS
    // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
    // =======================================
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
        .then(response => {
            alert(
                "Order submitted successfully!\n\n" +
                "A confirmation email has been sent to: " + formData.customer_email +
                "\n\nYour Tracking Number:\n" + trackingNumber
            );

            // Reset form
            document.getElementById("orderForm").reset();
        })
        .catch(error => {
            alert("There was an issue sending your confirmation email. Please try again later.");
            console.error("EmailJS Error:", error);
        });
});
