package com.cab_reservation_system.project.repository;

import com.cab_reservation_system.project.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Retrieve only active bookings (isDelete = 0)
    List<Booking> findByIsDelete(int isDelete);
}
