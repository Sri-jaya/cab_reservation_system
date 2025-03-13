package com.cab_reservation_system.project.controller;

import com.cab_reservation_system.project.model.Bill;
import com.cab_reservation_system.project.service.BillingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/billing")
public class BillingController {
    private final BillingService billingService;

    public BillingController(BillingService billingService) {
        this.billingService = billingService;
    }

    // Generate Bill for a Booking
    @PostMapping("/{bookingId}")
    public ResponseEntity<Bill> generateBill(@PathVariable Long bookingId) {
        return ResponseEntity.ok(billingService.generateBill(bookingId));
    }

    // Fetch Bill by Booking ID
    @GetMapping("/{bookingId}")
    public ResponseEntity<Bill> getBillByBookingId(@PathVariable Long bookingId) {
        Optional<Bill> bill = billingService.getBillByBookingId(bookingId);
        return bill.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
