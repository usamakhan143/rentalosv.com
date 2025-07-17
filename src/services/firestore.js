import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

// Generic CRUD operations
export const firestoreService = {
  // Create a document
  async create(collectionName, data) {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error("Error creating document:", error);
      throw error;
    }
  },

  // Get a single document
  async getById(collectionName, id) {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      throw error;
    }
  },

  // Get all documents from a collection
  async getAll(
    collectionName,
    orderField = "createdAt",
    orderDirection = "desc",
  ) {
    try {
      const q = query(
        collection(db, collectionName),
        orderBy(orderField, orderDirection),
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error getting documents:", error);
      throw error;
    }
  },

  // Get documents with where clause
  async getWhere(
    collectionName,
    field,
    operator,
    value,
    orderField = "createdAt",
  ) {
    try {
      const q = query(
        collection(db, collectionName),
        where(field, operator, value),
        orderBy(orderField, "desc"),
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error getting documents with where clause:", error);
      throw error;
    }
  },

  // Update a document
  async update(collectionName, id, data) {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
      return { id, ...data };
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  },

  // Delete a document
  async delete(collectionName, id) {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      return id;
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  },

  // Listen to real-time updates
  subscribe(collectionName, callback, constraints = []) {
    try {
      let q = collection(db, collectionName);

      if (constraints.length > 0) {
        q = query(q, ...constraints);
      }

      return onSnapshot(q, (querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(documents);
      });
    } catch (error) {
      console.error("Error subscribing to collection:", error);
      throw error;
    }
  },
};

// Specific service functions for different collections
export const userService = {
  async getUserById(userId) {
    return await firestoreService.getById("users", userId);
  },

  async updateUser(userId, data) {
    return await firestoreService.update("users", userId, data);
  },

  async getAllUsers() {
    return await firestoreService.getAll("users", "createdAt", "desc");
  },
};

export const carService = {
  async createCar(carData) {
    return await firestoreService.create("cars", carData);
  },

  async getCarById(carId) {
    return await firestoreService.getById("cars", carId);
  },

  async getCarsByOwner(ownerId) {
    return await firestoreService.getWhere("cars", "ownerId", "==", ownerId);
  },

  async getAllCars() {
    return await firestoreService.getAll("cars", "createdAt", "desc");
  },

  async updateCar(carId, data) {
    return await firestoreService.update("cars", carId, data);
  },

  async deleteCar(carId) {
    return await firestoreService.delete("cars", carId);
  },

  async searchCars(filters) {
    // TODO: Implement advanced search with multiple filters
    return await firestoreService.getAll("cars");
  },
};

export const bookingService = {
  async createBooking(bookingData) {
    return await firestoreService.create("bookings", bookingData);
  },

  async getBookingById(bookingId) {
    return await firestoreService.getById("bookings", bookingId);
  },

  async getBookingsByRenter(renterId) {
    return await firestoreService.getWhere(
      "bookings",
      "renterId",
      "==",
      renterId,
    );
  },

  async getBookingsByHost(hostId) {
    // Get bookings for cars owned by the host
    const cars = await carService.getCarsByOwner(hostId);
    const carIds = cars.map((car) => car.id);

    // This would need a more complex query in a real app
    const allBookings = await firestoreService.getAll("bookings");
    return allBookings.filter((booking) => carIds.includes(booking.carId));
  },

  async updateBookingStatus(bookingId, status) {
    return await firestoreService.update("bookings", bookingId, { status });
  },
};

export const reviewService = {
  async createReview(reviewData) {
    return await firestoreService.create("reviews", reviewData);
  },

  async getReviewsByCarId(carId) {
    return await firestoreService.getWhere("reviews", "carId", "==", carId);
  },

  async getReviewsByUserId(userId) {
    return await firestoreService.getWhere("reviews", "userId", "==", userId);
  },
};
