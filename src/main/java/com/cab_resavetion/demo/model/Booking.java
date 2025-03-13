package com.cab_reservation_system.project.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pickupLocation;
    private String dropLocation;
    private LocalDate bookingDate;
    private double amount;

    // Soft delete (0 = Active, 1 = Deleted)
    private int isDelete = 0;

    // Many-to-One relationship with Customer
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
}
