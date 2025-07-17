import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const createDefaultAdminUser = async () => {
  try {
    const adminEmail = "admin@carshare.com";
    const adminPassword = "admin123456";

    console.log("Creating admin user...");

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      adminEmail,
      adminPassword,
    );
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, {
      displayName: "Admin User",
    });

    // Create admin profile in Firestore
    const adminDoc = {
      uid: user.uid,
      email: user.email,
      firstName: "Admin",
      lastName: "User",
      role: "admin", // This is the key - setting role to admin
      createdAt: new Date(),
      verified: true,
      profileComplete: true,
      phone: "+1-555-0123",
      avatar: null,
    };

    await setDoc(doc(db, "users", user.uid), adminDoc);

    console.log("✅ Admin user created successfully!");
    console.log("📧 Email: admin@carshare.com");
    console.log("🔑 Password: admin123456");
    console.log("🔗 Admin Panel: /admin");

    return {
      success: true,
      email: adminEmail,
      password: adminPassword,
    };
  } catch (error) {
    console.error("❌ Error creating admin user:", error);

    if (error.code === "auth/email-already-in-use") {
      console.log("ℹ️  Admin user already exists. Use existing credentials:");
      console.log("📧 Email: admin@carshare.com");
      console.log("🔑 Password: admin123456");
      return {
        success: true,
        email: "admin@carshare.com",
        password: "admin123456",
        existing: true,
      };
    }

    return {
      success: false,
      error: error.message,
    };
  }
};

// Function to upgrade existing user to admin
export const makeUserAdmin = async (userEmail) => {
  try {
    // Note: In a real app, you'd need to identify the user by email
    // This is a simplified version
    console.log(`Making ${userEmail} an admin...`);
    // This would require admin privileges to modify other users
    // For now, just log the instruction
    console.log(
      "To make a user admin, manually update their role in Firestore",
    );
    return { success: true };
  } catch (error) {
    console.error("Error making user admin:", error);
    return { success: false, error: error.message };
  }
};
