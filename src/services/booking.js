import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { carService, userService } from "./firestore";

export const bookingService = {
  // Create a new booking request
  async createBooking(bookingData) {
    try {
      const booking = {
        ...bookingData,
        status: "pending",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        paymentStatus: "pending",
        checkInCompleted: false,
        checkOutCompleted: false,
        reviewSubmitted: false,
        hostReviewSubmitted: false,
      };

      const docRef = await addDoc(collection(db, "bookings"), booking);

      // Return the booking with the generated ID
      return {
        id: docRef.id,
        ...booking,
      };
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  },

  // Get booking by ID
  async getBookingById(bookingId) {
    try {
      const docRef = doc(db, "bookings", bookingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting booking:", error);
      throw error;
    }
  },

  // Get bookings for a renter
  async getBookingsByRenter(renterId) {
    try {
      const q = query(
        collection(db, "bookings"),
        where("renterId", "==", renterId),
        orderBy("createdAt", "desc"),
      );

      const querySnapshot = await getDocs(q);
      const bookings = [];

      for (const doc of querySnapshot.docs) {
        const bookingData = { id: doc.id, ...doc.data() };

        // Fetch car details
        if (bookingData.carId) {
          const car = await carService.getCarById(bookingData.carId);
          bookingData.car = car;
        }

        // Fetch host details
        if (bookingData.hostId) {
          const host = await userService.getUserById(bookingData.hostId);
          bookingData.host = host;
        }

        bookings.push(bookingData);
      }

      return bookings;
    } catch (error) {
      console.error("Error getting renter bookings:", error);
      throw error;
    }
  },

  // Get bookings for a host
  async getBookingsByHost(hostId) {
    try {
      const q = query(
        collection(db, "bookings"),
        where("hostId", "==", hostId),
        orderBy("createdAt", "desc"),
      );

      const querySnapshot = await getDocs(q);
      const bookings = [];

      for (const doc of querySnapshot.docs) {
        const bookingData = { id: doc.id, ...doc.data() };

        // Fetch car details
        if (bookingData.carId) {
          const car = await carService.getCarById(bookingData.carId);
          bookingData.car = car;
        }

        // Fetch renter details
        if (bookingData.renterId) {
          const renter = await userService.getUserById(bookingData.renterId);
          bookingData.renter = renter;
        }

        bookings.push(bookingData);
      }

      return bookings;
    } catch (error) {
      console.error("Error getting host bookings:", error);
      throw error;
    }
  },

  // Get bookings for a specific car
  async getBookingsByCar(carId) {
    try {
      const q = query(
        collection(db, "bookings"),
        where("carId", "==", carId),
        orderBy("startDate", "asc"),
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error getting car bookings:", error);
      throw error;
    }
  },

  // Update booking status
  async updateBookingStatus(bookingId, status, additionalData = {}) {
    try {
      const docRef = doc(db, "bookings", bookingId);
      const updateData = {
        status,
        updatedAt: serverTimestamp(),
        ...additionalData,
      };

      // Add status-specific data
      switch (status) {
        case "approved":
          updateData.approvedAt = serverTimestamp();
          break;
        case "declined":
          updateData.declinedAt = serverTimestamp();
          break;
        case "cancelled":
          updateData.cancelledAt = serverTimestamp();
          break;
        case "in_progress":
          updateData.startedAt = serverTimestamp();
          break;
        case "completed":
          updateData.completedAt = serverTimestamp();
          break;
      }

      await updateDoc(docRef, updateData);
      return updateData;
    } catch (error) {
      console.error("Error updating booking status:", error);
      throw error;
    }
  },

  // Approve booking
  async approveBooking(bookingId, hostMessage = "") {
    return await this.updateBookingStatus(bookingId, "approved", {
      hostMessage,
      paymentStatus: "pending_payment",
    });
  },

  // Decline booking
  async declineBooking(bookingId, reason = "") {
    return await this.updateBookingStatus(bookingId, "declined", {
      declineReason: reason,
    });
  },

  // Cancel booking
  async cancelBooking(bookingId, reason = "", cancelledBy = "renter") {
    return await this.updateBookingStatus(bookingId, "cancelled", {
      cancelReason: reason,
      cancelledBy,
    });
  },

  // Check if dates are available for a car
  async checkAvailability(carId, startDate, endDate) {
    try {
      const existingBookings = await this.getBookingsByCar(carId);

      const conflictingBookings = existingBookings.filter((booking) => {
        // Skip cancelled or declined bookings
        if (["cancelled", "declined"].includes(booking.status)) {
          return false;
        }

        const bookingStart = new Date(
          booking.startDate.toDate
            ? booking.startDate.toDate()
            : booking.startDate,
        );
        const bookingEnd = new Date(
          booking.endDate.toDate ? booking.endDate.toDate() : booking.endDate,
        );
        const requestStart = new Date(startDate);
        const requestEnd = new Date(endDate);

        // Check for date overlap
        return (
          (requestStart >= bookingStart && requestStart < bookingEnd) ||
          (requestEnd > bookingStart && requestEnd <= bookingEnd) ||
          (requestStart <= bookingStart && requestEnd >= bookingEnd)
        );
      });

      return conflictingBookings.length === 0;
    } catch (error) {
      console.error("Error checking availability:", error);
      throw error;
    }
  },

  // Start trip (check-in)
  async startTrip(bookingId, checkInData) {
    try {
      const updateData = {
        status: "in_progress",
        checkInCompleted: true,
        checkInData: {
          ...checkInData,
          timestamp: serverTimestamp(),
        },
        updatedAt: serverTimestamp(),
      };

      const docRef = doc(db, "bookings", bookingId);
      await updateDoc(docRef, updateData);
      return updateData;
    } catch (error) {
      console.error("Error starting trip:", error);
      throw error;
    }
  },

  // End trip (check-out)
  async endTrip(bookingId, checkOutData) {
    try {
      const updateData = {
        status: "completed",
        checkOutCompleted: true,
        checkOutData: {
          ...checkOutData,
          timestamp: serverTimestamp(),
        },
        updatedAt: serverTimestamp(),
      };

      const docRef = doc(db, "bookings", bookingId);
      await updateDoc(docRef, updateData);
      return updateData;
    } catch (error) {
      console.error("Error ending trip:", error);
      throw error;
    }
  },

  // Submit review
  async submitReview(bookingId, reviewData, reviewType = "renter") {
    try {
      const updateField =
        reviewType === "renter" ? "reviewSubmitted" : "hostReviewSubmitted";
      const reviewField =
        reviewType === "renter" ? "renterReview" : "hostReview";

      const updateData = {
        [updateField]: true,
        [reviewField]: {
          ...reviewData,
          timestamp: serverTimestamp(),
        },
        updatedAt: serverTimestamp(),
      };

      const docRef = doc(db, "bookings", bookingId);
      await updateDoc(docRef, updateData);

      // Also create a separate review document
      const reviewDoc = {
        bookingId,
        carId: reviewData.carId,
        userId: reviewData.userId,
        rating: reviewData.rating,
        comment: reviewData.comment,
        reviewType,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "reviews"), reviewDoc);

      return updateData;
    } catch (error) {
      console.error("Error submitting review:", error);
      throw error;
    }
  },

  // Listen to booking updates (real-time)
  subscribeToBookingUpdates(bookingId, callback) {
    try {
      const docRef = doc(db, "bookings", bookingId);
      return onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          callback({ id: doc.id, ...doc.data() });
        }
      });
    } catch (error) {
      console.error("Error subscribing to booking updates:", error);
      throw error;
    }
  },

  // Get booking statistics for a host
  async getHostBookingStats(hostId) {
    try {
      const bookings = await this.getBookingsByHost(hostId);

      const stats = {
        total: bookings.length,
        pending: bookings.filter((b) => b.status === "pending").length,
        approved: bookings.filter((b) => b.status === "approved").length,
        active: bookings.filter((b) => b.status === "in_progress").length,
        completed: bookings.filter((b) => b.status === "completed").length,
        cancelled: bookings.filter((b) => b.status === "cancelled").length,
        declined: bookings.filter((b) => b.status === "declined").length,
        totalRevenue: bookings
          .filter((b) => b.status === "completed")
          .reduce((sum, b) => sum + (b.pricing?.total || 0), 0),
        averageRating: 0, // Would calculate from reviews
      };

      return stats;
    } catch (error) {
      console.error("Error getting host booking stats:", error);
      throw error;
    }
  },

  // Calculate trip duration in days
  calculateTripDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  },

  // Calculate pricing for a booking
  calculatePricing(car, startDate, endDate) {
    const days = this.calculateTripDuration(startDate, endDate);
    const dailyRate = car.pricing?.dailyRate || 0;
    let subtotal = dailyRate * days;

    // Apply discounts for longer trips
    if (days >= 30 && car.pricing?.monthlyDiscount) {
      subtotal = subtotal * (1 - car.pricing.monthlyDiscount / 100);
    } else if (days >= 7 && car.pricing?.weeklyDiscount) {
      subtotal = subtotal * (1 - car.pricing.weeklyDiscount / 100);
    }

    const serviceFeeRate = 0.1; // 10% service fee
    const serviceFee = subtotal * serviceFeeRate;

    const protectionFeeRate =
      car.protectionPlan === "premium"
        ? 0.25
        : car.protectionPlan === "standard"
          ? 0.15
          : 0.1;
    const protectionFee = subtotal * protectionFeeRate;

    const total = subtotal + serviceFee + protectionFee;

    return {
      days,
      dailyRate,
      subtotal: parseFloat(subtotal.toFixed(2)),
      serviceFee: parseFloat(serviceFee.toFixed(2)),
      protectionFee: parseFloat(protectionFee.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
    };
  },
};

export default bookingService;
