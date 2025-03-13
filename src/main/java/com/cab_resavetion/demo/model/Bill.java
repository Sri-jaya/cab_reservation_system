package com.cab_reservation_system.project.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bill {
    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double baseFare;        // Booking amount
    private double taxAmount;       // Calculated tax
    private double discountAmount;  // Applied discount
    private double totalAmount;     // Final amount after tax and discount

    private LocalDate billingDate = LocalDate.now();

    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;


}
