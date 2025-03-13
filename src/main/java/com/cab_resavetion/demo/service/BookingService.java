package com.cab_reservation_system.project.service;

import com.cab_reservation_system.project.model.Booking;
import com.cab_reservation_system.project.model.Customer;
import com.cab_reservation_system.project.repository.BookingRepository;
import com.cab_reservation_system.project.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final CustomerRepository customerRepository;

    public BookingService(BookingRepository bookingRepository, CustomerRepository customerRepository) {
        this.bookingRepository = bookingRepository;
        this.customerRepository = customerRepository;
    }

    // Create a new booking
    public Booking createBooking(Booking booking, Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        booking.setCustomer(customer);
        return bookingRepository.save(booking);
    }

    // Get all active bookings (isDelete = 0)
    public List<Booking> getAllBookings() {
        return bookingRepository.findByIsDelete(0);
    }

    // Get a booking by ID
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    // Update a booking
    public Booking updateBooking(Long id, Booking updatedBooking) {
        return bookingRepository.findById(id).map(booking -> {
            booking.setPickupLocation(updatedBooking.getPickupLocation());
            booking.setDropLocation(updatedBooking.getDropLocation());
            booking.setBookingDate(updatedBooking.getBookingDate());
            booking.setAmount(updatedBooking.getAmount());
            return bookingRepository.save(booking);
        }).orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    // Soft delete a booking (set isDelete = 1)
    public boolean deleteBooking(Long id) {
        return bookingRepository.findById(id).map(booking -> {
            booking.setIsDelete(1);
            bookingRepository.save(booking);
            return true;
        }).orElse(false);
    }
}
