// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS Public Key

document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Generate Tracking Number Example: FC-20251202-48293
    const tracking = "FC-" + 
        new Date().toISOString().slice(0,10).replace(/-/g,"") + "-" + 
        Math.floor(10000 + Math.random() * 90000);

    document.getElementById("tracking_number").value = tracking;

    const formData = {
        customer_name: this.customer_name.value,
        customer_email: this.customer_email.value,
        customer_contact: this.customer_contact.value,
        cake_type: this.cake_type.value,
        quantity: this.quantity.value,
        payment_method: this.payment_method.value,
        notes: this.notes.value,
        tracking_number: tracking
    };

    // EmailJS send
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
        .then(function(response) {
            alert("Order submitted! A confirmation email has been sent with your tracking number:\n" + tracking);
            document.getElementById("orderForm").reset();
        }, function(error) {
            alert("Error sending email. Please try again.");
            console.error(error);
        });
});
