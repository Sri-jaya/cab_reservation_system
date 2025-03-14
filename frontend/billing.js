// Fetch and Display Billing Data
document.addEventListener('DOMContentLoaded', function () {
    fetchBillingData();
});

function fetchBillingData() {
    fetch('http://localhost:8080/api/billing')
        .then(response => response.json())
        .then(data => displayBillingData(data))
        .catch(error => console.error('Error fetching data:', error));
}

// Display Billing Data in Table
function displayBillingData(bills) {
    const tableBody = document.querySelector('#billingTable tbody');
    tableBody.innerHTML = '';

    bills.forEach(bill => {
        const row = `
            <tr>
                <td>${bill.id}</td>
                <td>${bill.baseFare.toFixed(2)}</td>
                <td>${bill.taxAmount.toFixed(2)}</td>
                <td>${bill.discountAmount.toFixed(2)}</td>
                <td>${bill.totalAmount.toFixed(2)}</td>
                <td>${bill.billingDate}</td>
                <td>${bill.booking.pickupLocation}</td>
                <td>${bill.booking.dropLocation}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="downloadBill(${bill.id})">Download Bill</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Download Bill as PDF
function downloadBill(billId) {
    fetch(`http://localhost:8080/api/billing/${billId}`)
        .then(response => response.json())
        .then(bill => {
            // Create the PDF content
            const pdfContent = `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h5>Cab Reservation System</5>
                    <p>Billing Receipt</p>
                    <hr/>
                    <p>Bill ID:</> ${bill.id}</p>
                    <p>Base Fare:</> ${bill.baseFare.toFixed(2)}</p>
                    <p>Tax Amount:</strong> ${bill.taxAmount.toFixed(2)}</p>
                    <p>Discount Amount:</> ${bill.discountAmount.toFixed(2)}</p>
                    <p>Total Amount:</> ${bill.totalAmount.toFixed(2)}</p>
                    <p>Billing Date:</> ${bill.billingDate}</p>
                    <hr>
                    <h5>Booking Details</h5>
                    <p>Pickup Location:</> ${bill.booking.pickupLocation}</p>
                    <p>Drop Location:</> ${bill.booking.dropLocation}</p>
                    <p>Booking Date:</> ${bill.booking.bookingDate}</p>
                </div>
            `;

            // Generate and download the PDF
            const options = {
                margin: 5, // Adjust margins for better fitting
                filename: `bill_${bill.id}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 1 },
                jsPDF: {
                    unit: 'mm',                   // Use millimeters
                    format: [80, 150],            // 57mm width, 150mm height (adjust as needed)
                    orientation: 'portrait'       // Portrait layout
                }
            };

            html2pdf().from(pdfContent).set(options).save();
        })
        .catch(error => console.error('Error fetching bill:', error));
}
