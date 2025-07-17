import React, { useState, useRef } from "react";
import { Upload, X, Camera, AlertCircle } from "lucide-react";
import { imageUtils } from "../../services/storage";
import LoadingSpinner from "./LoadingSpinner";

const ImageUpload = ({
  images = [],
  onImagesChange,
  maxImages = 10,
  maxSize = 5 * 1024 * 1024, // 5MB
  className = "",
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);

    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setError("");
    setUploading(true);

    try {
      const newImages = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file
        try {
          imageUtils.validateImageFile(file, maxSize);
        } catch (validationError) {
          setError(validationError.message);
          continue;
        }

        // Compress image
        const compressedFile = await imageUtils.compressImage(file);

        // Create preview URL
        const previewUrl = URL.createObjectURL(compressedFile);

        newImages.push({
          id: Date.now() + i,
          file: compressedFile,
          preview: previewUrl,
          uploading: true,
          progress: 0,
        });
      }

      // Add new images to state
      onImagesChange([...images, ...newImages]);

      // Upload files (this would be done when the form is submitted)
      // For now, we'll just simulate upload progress
      newImages.forEach((image, index) => {
        setTimeout(
          () => {
            setUploadProgress((prev) => ({ ...prev, [image.id]: 100 }));

            // Update image status
            onImagesChange((currentImages) =>
              currentImages.map((img) =>
                img.id === image.id
                  ? { ...img, uploading: false, uploaded: true }
                  : img,
              ),
            );
          },
          (index + 1) * 1000,
        );
      });
    } catch (error) {
      setError("Failed to process images");
      console.error("Image upload error:", error);
    } finally {
      setUploading(false);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (imageId) => {
    const imageToRemove = images.find((img) => img.id === imageId);
    if (imageToRemove?.preview) {
      URL.revokeObjectURL(imageToRemove.preview);
    }

    onImagesChange(images.filter((img) => img.id !== imageId));

    // Remove from progress tracking
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[imageId];
      return newProgress;
    });
  };

  const reorderImages = (fromIndex, toIndex) => {
    const reorderedImages = [...images];
    const [movedImage] = reorderedImages.splice(fromIndex, 1);
    reorderedImages.splice(toIndex, 0, movedImage);
    onImagesChange(reorderedImages);
  };

  return (
    <div className={className}>
      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${error ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-primary-400 hover:bg-gray-50"}
          ${uploading ? "pointer-events-none opacity-50" : ""}
        `}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading || images.length >= maxImages}
        />

        {uploading ? (
          <div className="flex flex-col items-center">
            <LoadingSpinner size="lg" className="text-primary-600 mb-2" />
            <p className="text-sm text-gray-600">Processing images...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload car photos
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Drag and drop or click to select images
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, WebP up to {Math.round(maxSize / (1024 * 1024))}MB each
              ({images.length}/{maxImages} images)
            </p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 flex items-center text-red-600">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden"
              >
                {/* Image */}
                <img
                  src={image.preview || image.url}
                  alt={`${index + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Main Image Indicator */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                    Main
                  </div>
                )}

                {/* Upload Progress */}
                {image.uploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center">
                      <LoadingSpinner size="md" className="text-white mb-2" />
                      <p className="text-white text-xs">
                        {uploadProgress[image.id] || 0}%
                      </p>
                    </div>
                  </div>
                )}

                {/* Controls */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200">
                  <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(image.id);
                      }}
                      className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Reorder Handles */}
                  <div className="absolute bottom-2 left-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {index > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          reorderImages(index, index - 1);
                        }}
                        className="p-1 bg-white bg-opacity-80 text-gray-700 rounded text-xs hover:bg-opacity-100"
                      >
                        ←
                      </button>
                    )}
                    {index < images.length - 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          reorderImages(index, index + 1);
                        }}
                        className="p-1 bg-white bg-opacity-80 text-gray-700 rounded text-xs hover:bg-opacity-100"
                      >
                        →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Add More Button */}
            {images.length < maxImages && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-primary-400 hover:text-primary-600 transition-colors"
                disabled={uploading}
              >
                <Camera className="w-8 h-8 mb-2" />
                <span className="text-xs">Add more</span>
              </button>
            )}
          </div>

          {/* Helper Text */}
          <div className="mt-4 text-sm text-gray-600">
            <p>• First image will be used as the main photo</p>
            <p>• You can reorder images using the arrow buttons</p>
            <p>• High-quality photos help attract more renters</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
