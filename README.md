Register User - 


http://localhost:8080/api/users/register

{
  "username": "admin",
  "password": "admin",
  "role": "ADMIN"
}


Login - username - admin
Pw - admin


Customer 
—-----------------------------------------------------------------------------------------------------------
POST - Save Customer
http://localhost:8080/api/customers


{
 "name": "Kalana Sasanka",
 "address": "Galle",
 "nic": "123456789V",
 "phone": "0771234567"
}

—-----------------------------------------------------------------------------------------------------------
Get all Customer
http://localhost:8080/api/customers

—-----------------------------------------------------------------------------------------------------------

Update Customer - PUT
http://localhost:8080/api/customers/1

{
    "id": 1,
    "name": "John Updated yyyyyyyyy",
    "address": "456 Elm St",
    "nic": "123456789V",
    "phone": "0774567890",
    "isDelete": 1
}


—--------------------------------------------------------------------------------------------------------------------------------------------------------

Delete Customer - DELETE - 

http://localhost:8080/api/customers/1

—--------------------------------------------------------------------------------------------------------------------------------------------------------

Create Booking —-


POST http://localhost:8080/api/bookings/1
( 1 - customer id)


{
    "pickupLocation": "Colombo",
    "dropLocation": "Kandy",
    "bookingDate": "2024-10-25",
    "amount": 7500.00
}



—----------------------------------------------------------------------------------------------------------
2.Get All Bookings (Active Only)

GET http://localhost:8080/api/bookings
—----------------------------------------------------------------------------------------------------------
3.Get Booking by ID

GET http://localhost:8080/api/bookings/1

—----------------------------------------------------------------------------------------------------------
4.Update a Booking
PUT http://localhost:8080/api/bookings/1

{
    "pickupLocation": "Negombo",
    "dropLocation": "Kandy",
    "bookingDate": "2024-11-01",
    "amount": 9000.00
}



—----------------------------------------------------------------------------------------------------------

5.Soft Delete a Booking

DELETE http://localhost:8080/api/bookings/1

—------------------------------------------------------------------------------------------------------
Billing 

1. Create a Booking (If Not Created Yet)

POST http://localhost:8080/api/bookings/1

{ "pickupLocation": "Colombo", "dropLocation": "Galle", "bookingDate": "2024-10-25", "amount": 12000.00 }


2. Generate a Bill for the Booking

POST http://localhost:8080/api/billing/1

{
  "id": 1,
  "baseFare": 12000.0,
  "taxAmount": 1200.0,
  "discountAmount": 600.0,
  "totalAmount": 12600.0,
  "billingDate": "2024-10-25",
  "booking": {
    "id": 1,
    "pickupLocation": "Colombo",
    "dropLocation": "Galle",
    "bookingDate": "2024-10-25",
    "amount": 12000.00
  }
}


3. Retrieve Bill by Booking ID
GET http://localhost:8080/api/billing/1


{
  "id": 1,
  "baseFare": 12000.0,
  "taxAmount": 1200.0,
  "discountAmount": 600.0,
  "totalAmount": 12600.0,
  "billingDate": "2024-10-25"
}



#—------------------------------------------------------------------------------------------------------


Vehicle Reservation System - Spring Boot
1. Project Overview
The Vehicle Reservation System is a Spring Boot application that allows users to:
Register and authenticate via a secure login system.
Manage vehicle bookings.
Generate and view customer bills, including taxes and discounts.



#-----------------------------------------------------------------------------------------------------------------
2. Project Structure

vehicle-reservation-system/
├── src/main/java/com/cab_reservation_system/project/
│   ├── VehicleReservationApplication.java
│   ├── config/
│   │     ├── AppConfig.java
│   │     └── SecurityConfig.java
│   ├── model/
│   │     ├── User.java
│   │     ├── Customer.java
│   │     ├── Booking.java
│   │     └── Bill.java
│   ├── repository/
│   │     ├── UserRepository.java
│   │     ├── CustomerRepository.java
│   │     ├── BookingRepository.java
│   │     └── BillRepository.java
│   ├── service/
│   │     ├── UserService.java
│   │     ├── CustomerService.java
│   │     ├── BookingService.java
│   │     └── BillingService.java
│   └── controller/
│         ├── UserController.java
│         ├── CustomerController.java
│         ├── BookingController.java
│         └── BillingController.java
└── pom.xml

#-----------------------------------------------------------------------------------------------------------------

3. Dependencies (pom.xml)
Ensure the following dependencies are included in your pom.xml:

<dependencies>
    <!-- Spring Boot Starter Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- Spring Boot Starter Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- Spring Boot Starter Security -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>

    <!-- MySQL Driver -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
</dependencies>


4. Configuration
application.properties

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/vehicle_db
spring.datasource.username=root
spring.datasource.password=yourpassword

# Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true



5. API Endpoints
Authentication
POST /register – User registration
POST /login – User login (Basic Auth)
Customer Management
GET /customers – Retrieve all customers
POST /customers – Create a new customer
Booking Management
GET /bookings – Get all bookings
POST /bookings – Create a booking
Billing Management
GET /bills/{id} – Get bill by booking ID

