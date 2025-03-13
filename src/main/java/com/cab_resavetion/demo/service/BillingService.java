package com.cab_reservation_system.project.service;

import com.cab_reservation_system.project.model.Bill;
import com.cab_reservation_system.project.model.Booking;
import com.cab_reservation_system.project.repository.BillRepository;
import com.cab_reservation_system.project.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BillingService {
    private final BillRepository billRepository;
    private final BookingRepository bookingRepository;

    // Constants for tax and discount
    private static final double TAX_RATE = 0.10;       // 10% tax
    private static final double DISCOUNT_THRESHOLD = 10000.00; // Apply discount for amounts above 10,000
    private static final double DISCOUNT_RATE = 0.05;  // 5% discount

    public BillingService(BillRepository billRepository, BookingRepository bookingRepository) {
        this.billRepository = billRepository;
        this.bookingRepository = bookingRepository;
    }

    // Generate Bill for a Booking
    public Bill generateBill(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Calculate tax and discount
        double taxAmount = booking.getAmount() * TAX_RATE;
        double discountAmount = (booking.getAmount() >= DISCOUNT_THRESHOLD) ? booking.getAmount() * DISCOUNT_RATE : 0.0;

        double totalAmount = booking.getAmount() + taxAmount - discountAmount;

        // Create Bill object
        Bill bill = new Bill();
        bill.setBooking(booking);
        bill.setBaseFare(booking.getAmount());
        bill.setTaxAmount(taxAmount);
        bill.setDiscountAmount(discountAmount);
        bill.setTotalAmount(totalAmount);

        return billRepository.save(bill);
    }

    // Fetch Bill by Booking ID
    public Optional<Bill> getBillByBookingId(Long bookingId) {
        return Optional.ofNullable(billRepository.findByBookingId(bookingId));
    }
}
