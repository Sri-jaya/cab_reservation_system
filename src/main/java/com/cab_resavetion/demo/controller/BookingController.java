package com.cab_reservation_system.project.controller;

import com.cab_reservation_system.project.model.Booking;
import com.cab_reservation_system.project.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // Create a new booking (Requires customer ID)
    @PostMapping("/{customerId}")
    public ResponseEntity<Booking> createBooking(@PathVariable Long customerId, @RequestBody Booking booking) {
        return ResponseEntity.ok(bookingService.createBooking(booking, customerId));
    }

    // Get all active bookings
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    // Get booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Optional<Booking> booking = bookingService.getBookingById(id);
        return booking.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update a booking
    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking booking) {
        return ResponseEntity.ok(bookingService.updateBooking(id, booking));
    }

    // Soft delete a booking
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
        if (bookingService.deleteBooking(id)) {
            return ResponseEntity.ok("Booking deleted successfully.");
        }
        return ResponseEntity.badRequest().body("Booking not found.");
    }
}
