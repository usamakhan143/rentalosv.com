import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import { storage } from "../config/firebase";

export const storageService = {
  // Upload a single file
  async uploadFile(file, path, onProgress = null) {
    try {
      const storageRef = ref(storage, path);

      if (onProgress) {
        // Use resumable upload with progress tracking
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              onProgress(progress);
            },
            (error) => {
              console.error("Upload error:", error);
              reject(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref,
                );
                resolve(downloadURL);
              } catch (error) {
                reject(error);
              }
            },
          );
        });
      } else {
        // Simple upload without progress tracking
        const snapshot = await uploadBytes(storageRef, file);
        return await getDownloadURL(snapshot.ref);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  },

  // Upload multiple files
  async uploadMultipleFiles(files, basePath, onProgress = null) {
    try {
      const uploadPromises = files.map((file, index) => {
        const fileName = `${Date.now()}_${index}_${file.name}`;
        const filePath = `${basePath}/${fileName}`;

        return this.uploadFile(
          file,
          filePath,
          onProgress ? (progress) => onProgress(index, progress) : null,
        );
      });

      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error uploading multiple files:", error);
      throw error;
    }
  },

  // Delete a file
  async deleteFile(filePath) {
    try {
      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  },

  // Delete multiple files
  async deleteMultipleFiles(filePaths) {
    try {
      const deletePromises = filePaths.map((path) => this.deleteFile(path));
      await Promise.all(deletePromises);
      return true;
    } catch (error) {
      console.error("Error deleting multiple files:", error);
      throw error;
    }
  },

  // Get all files in a directory
  async listFiles(path) {
    try {
      const listRef = ref(storage, path);
      const res = await listAll(listRef);

      const fileUrls = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return {
            name: itemRef.name,
            fullPath: itemRef.fullPath,
            url: url,
          };
        }),
      );

      return fileUrls;
    } catch (error) {
      console.error("Error listing files:", error);
      throw error;
    }
  },

  // Generate a unique file path
  generateFilePath(folder, fileName, userId = null) {
    const timestamp = Date.now();
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9.]/g, "_");
    const userPrefix = userId ? `${userId}/` : "";
    return `${folder}/${userPrefix}${timestamp}_${cleanFileName}`;
  },
};

// Specific upload functions for different types of content
export const imageUploadService = {
  // Upload car images
  async uploadCarImages(carId, images, onProgress = null) {
    const basePath = `cars/${carId}/images`;
    return await storageService.uploadMultipleFiles(
      images,
      basePath,
      onProgress,
    );
  },

  // Upload user avatar
  async uploadUserAvatar(userId, imageFile, onProgress = null) {
    const path = storageService.generateFilePath(
      "users/avatars",
      imageFile.name,
      userId,
    );
    return await storageService.uploadFile(imageFile, path, onProgress);
  },

  // Upload driver's license
  async uploadDriversLicense(userId, imageFile, onProgress = null) {
    const path = storageService.generateFilePath(
      "users/documents",
      `license_${imageFile.name}`,
      userId,
    );
    return await storageService.uploadFile(imageFile, path, onProgress);
  },

  // Upload trip photos (check-in/check-out)
  async uploadTripPhotos(
    bookingId,
    photos,
    type = "checkin",
    onProgress = null,
  ) {
    const basePath = `bookings/${bookingId}/${type}_photos`;
    return await storageService.uploadMultipleFiles(
      photos,
      basePath,
      onProgress,
    );
  },
};

// Image compression utility
export const imageUtils = {
  // Compress image before upload
  compressImage(file, maxWidth = 1200, quality = 0.8) {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(resolve, "image/jpeg", quality);
      };

      img.src = URL.createObjectURL(file);
    });
  },

  // Validate image file
  validateImageFile(file, maxSize = 5 * 1024 * 1024) {
    // 5MB default
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      throw new Error(
        "Invalid file type. Please upload JPEG, PNG, or WebP images.",
      );
    }

    if (file.size > maxSize) {
      throw new Error(
        `File size too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`,
      );
    }

    return true;
  },

  // Create thumbnail
  createThumbnail(file, size = 200) {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = size;
        canvas.height = size;

        // Center crop
        const { width, height } = img;
        const sourceSize = Math.min(width, height);
        const sourceX = (width - sourceSize) / 2;
        const sourceY = (height - sourceSize) / 2;

        ctx.drawImage(
          img,
          sourceX,
          sourceY,
          sourceSize,
          sourceSize,
          0,
          0,
          size,
          size,
        );

        canvas.toBlob(resolve, "image/jpeg", 0.9);
      };

      img.src = URL.createObjectURL(file);
    });
  },
};
