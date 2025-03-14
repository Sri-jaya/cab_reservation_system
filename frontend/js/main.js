const apiUrl = "http://127.0.0.1:8080/api";

// Ensure user is authenticated
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token) {
        window.location.href = "index.html"; // Redirect to login if no token
    }

    // Logout functionality
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.clear(); // Clear session data
            window.location.href = "index.html";
        });
    }

    // Fetch customer data and populate the table
    const customerTable = document.getElementById("customerTable");

    async function fetchCustomers() {
        try {
            const response = await fetch(`${apiUrl}/customers`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const customers = await response.json();
                populateCustomerTable(customers);
            } else {
                throw new Error("Failed to fetch customer data");
            }
        } catch (error) {
            console.error("Error:", error);
            document.getElementById("errorMessage").classList.remove("d-none");
        }
    }

    // Function to populate the table with customer data
    function populateCustomerTable(customers) {
        customerTable.innerHTML = ""; // Clear any existing table rows

        customers.forEach((customer) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td>${customer.nic}</td>
                <td>${customer.phone}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editCustomer(${customer.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${customer.id})">Delete</button>
                </td>
            `;

            customerTable.appendChild(row);
        });
    }

    // Function to handle editing (could redirect or open modal)
    function editCustomer(id) {
        console.log("Edit customer with ID:", id);
        // Implement logic to handle editing a customer (e.g., open modal or navigate to another page)
    }

    // Function to handle deleting a customer
    async function deleteCustomer(id) {
        const token = localStorage.getItem("token"); // Ensure the token is available for this action
        if (confirm("Are you sure you want to delete this customer?")) {
            try {
                const response = await fetch(`${apiUrl}/customers/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    alert("Customer deleted successfully!");
                    fetchCustomers(); // Reload the customer list after deletion
                } else {
                    throw new Error("Failed to delete customer");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error deleting customer.");
            }
        }
    }

    // Call the fetchCustomers function to load data when the page loads
    fetchCustomers();
});



const token = localStorage.getItem("token"); // Get the token from local storage

document.addEventListener("DOMContentLoaded", () => {
    // Ensure user is authenticated
    if (!token) {
        window.location.href = "index.html"; // Redirect to login if no token
    }

    // Logout functionality
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.clear(); // Clear session data
            window.location.href = "index.html"; // Redirect to login
        });
    }

    // Fetch customers and bookings
    fetchCustomers();
    fetchBookings();

    // Fetch customer data to populate the customer select dropdown
    async function fetchCustomers() {
        try {
            const response = await fetch(`${apiUrl}/customers`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const customers = await response.json();
                populateCustomerSelect(customers);
            } else {
                throw new Error("Failed to fetch customer data");
            }
        } catch (error) {
            console.error("Error:", error);
            document.getElementById("errorMessage").classList.remove("d-none");
        }
    }

    // Populate customer select dropdown
    function populateCustomerSelect(customers) {
        const customerSelect = document.getElementById("customerId");
        customers.forEach(customer => {
            const option = document.createElement("option");
            option.value = customer.id;
            option.textContent = customer.name;
            customerSelect.appendChild(option);
        });
    }

    // Fetch bookings and populate the table
    async function fetchBookings() {
        try {
            const response = await fetch(`${apiUrl}/bookings`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const bookings = await response.json();
                populateBookingTable(bookings);
            } else {
                throw new Error("Failed to fetch booking data");
            }
        } catch (error) {
            console.error("Error:", error);
            document.getElementById("errorMessage").classList.remove("d-none");
        }
    }

    // Populate the bookings table
    function populateBookingTable(bookings) {
        const bookingTableBody = document.getElementById("bookingTable").getElementsByTagName("tbody")[0];
        bookingTableBody.innerHTML = ""; // Clear existing rows

        bookings.forEach((booking) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${booking.id}</td>
                <td>${booking.pickupLocation}</td>
                <td>${booking.dropLocation}</td>
                <td>${booking.bookingDate}</td>
                <td>${booking.amount}</td>
                <td>${booking.customerName}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editBooking(${booking.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteBooking(${booking.id})">Delete</button>
                </td>
            `;

            bookingTableBody.appendChild(row);
        });
    }

    // Edit booking
    function editBooking(id) {
        // Fetch the booking by ID and populate the form for editing
        const booking = bookings.find(b => b.id === id);
        if (booking) {
            document.getElementById("bookingId").value = booking.id;
            document.getElementById("pickupLocation").value = booking.pickupLocation;
            document.getElementById("dropLocation").value = booking.dropLocation;
            document.getElementById("bookingDate").value = booking.bookingDate;
            document.getElementById("amount").value = booking.amount;
            document.getElementById("customerId").value = booking.customerId;
        }
    }

    // Delete booking
    async function deleteBooking(id) {
        if (confirm("Are you sure you want to delete this booking?")) {
            try {
                const response = await fetch(`${apiUrl}/bookings/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    alert("Booking deleted successfully!");
                    fetchBookings(); // Reload the bookings list after deletion
                } else {
                    throw new Error("Failed to delete booking");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error deleting booking.");
            }
        }
    }

    // Add booking form submission
    document.getElementById("addBookingForm").addEventListener("submit", async function(event) {
        event.preventDefault();
        
        const bookingData = {
            id: document.getElementById("bookingId").value,
            pickupLocation: document.getElementById("pickupLocation").value,
            dropLocation: document.getElementById("dropLocation").value,
            bookingDate: document.getElementById("bookingDate").value,
            amount: document.getElementById("amount").value,
            customerId: document.getElementById("customerId").value,
        };

        try {
            const response = await fetch(`${apiUrl}/bookings`, {
                method: bookingData.id ? "PUT" : "POST", // Use PUT for update and POST for new booking
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                document.getElementById("successMessage").classList.remove("d-none");
                fetchBookings(); // Reload the booking list
            } else {
                throw new Error("Failed to add/update booking");
            }
        } catch (error) {
            console.error("Error:", error);
            document.getElementById("errorMessage").classList.remove("d-none");
        }
    });
});

// billing

// Billing functionality

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    // Function to fetch and display billing data
    async function fetchBilling(bookingId) {
        try {
            const response = await fetch(`http://localhost:8080/api/billing/${bookingId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const billing = await response.json();
                displayBilling(billing);
            } else {
                throw new Error("Failed to fetch billing data");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error fetching billing data");
        }
    }

    // Function to display billing details
    function displayBilling(billing) {
        const billingTable = document.getElementById("billingTable").getElementsByTagName("tbody")[0];

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${billing.id}</td>
            <td>${billing.booking.pickupLocation} to ${billing.booking.dropLocation}</td>
            <td>${billing.baseFare}</td>
            <td>${billing.taxAmount}</td>
            <td>${billing.discountAmount}</td>
            <td>${billing.totalAmount}</td>
            <td>${billing.billingDate}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteBilling(${billing.id})">Delete</button>
            </td>
        `;

        billingTable.appendChild(row);
    }

    // Handle new billing creation
    document.getElementById("addBillingBtn").addEventListener("click", async () => {
        const bookingId = document.getElementById("bookingId").value;
        const baseFare = parseFloat(document.getElementById("baseFare").value);
        const taxAmount = parseFloat(document.getElementById("taxAmount").value);
        const discountAmount = parseFloat(document.getElementById("discountAmount").value);
        const billingDate = document.getElementById("billingDate").value;

        const totalAmount = baseFare + taxAmount - discountAmount;

        const billingData = {
            baseFare,
            taxAmount,
            discountAmount,
            totalAmount,
            billingDate,
            booking: { id: bookingId },
        };

        try {
            const response = await fetch("http://localhost:8080/api/billing", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(billingData),
            });

            if (response.ok) {
                alert("Billing created successfully!");
                fetchBilling(bookingId); // Refresh billing data
            } else {
                throw new Error("Failed to create billing");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error creating billing");
        }
    });

    // Delete billing
    async function deleteBilling(billingId) {
        if (confirm("Are you sure you want to delete this billing record?")) {
            try {
                const response = await fetch(`http://localhost:8080/api/billing/${billingId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    alert("Billing record deleted successfully!");
                    location.reload(); // Refresh page
                } else {
                    throw new Error("Failed to delete billing record");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error deleting billing record");
            }
        }
    }
});
