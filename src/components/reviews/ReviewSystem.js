import React, { useState, useEffect } from "react";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  User,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import { reviewService } from "../../services/firestore";
import Button from "../ui/Button";
import { TextArea } from "../ui/Input";
import Modal from "../ui/Modal";

const ReviewCard = ({ review, isHostReview = false }) => {
  const formatDate = (date) => {
    return new Date(date.toDate ? date.toDate() : date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          {review.userAvatar ? (
            <img
              src={review.userAvatar}
              alt={review.userName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <User className="w-5 h-5 text-gray-600" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-medium text-gray-900">
                {review.userName || "Anonymous User"}
              </h4>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(review.createdAt)}</span>
                {review.verifiedTrip && (
                  <>
                    <span>•</span>
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span>Verified trip</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-medium text-gray-700">
                {review.rating}/5
              </span>
            </div>
          </div>

          <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

          {/* Review categories for detailed reviews */}
          {review.categories && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {Object.entries(review.categories).map(([category, rating]) => (
                <div key={category} className="text-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {rating}/5
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Would recommend */}
          {review.wouldRecommend !== undefined && (
            <div className="flex items-center text-sm">
              {review.wouldRecommend ? (
                <>
                  <ThumbsUp className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-green-700">Would recommend</span>
                </>
              ) : (
                <>
                  <ThumbsDown className="w-4 h-4 text-red-600 mr-2" />
                  <span className="text-red-700">Would not recommend</span>
                </>
              )}
            </div>
          )}

          {/* Host response */}
          {review.hostResponse && (
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <User className="w-4 h-4 text-gray-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">
                  Host Response
                </span>
              </div>
              <p className="text-sm text-gray-700">
                {review.hostResponse.comment}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {formatDate(review.hostResponse.createdAt)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ReviewForm = ({
  booking,
  isHostReview = false,
  onSubmit,
  onCancel,
  existingReview = null,
}) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    rating: existingReview?.rating || 5,
    comment: existingReview?.comment || "",
    wouldRecommend:
      existingReview?.wouldRecommend !== undefined
        ? existingReview.wouldRecommend
        : true,
    categories: existingReview?.categories || {
      cleanliness: 5,
      communication: 5,
      accuracy: 5,
      location: 5,
      ...(isHostReview ? { carCondition: 5 } : { hostRating: 5 }),
    },
  });

  const categoryLabels = {
    cleanliness: "Cleanliness",
    communication: "Communication",
    accuracy: "Accuracy",
    location: "Location",
    carCondition: "Car Condition",
    hostRating: "Host Rating",
  };

  const handleCategoryRating = (category, rating) => {
    setFormData((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: rating,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!formData.comment.trim()) {
      return;
    }

    setLoading(true);

    try {
      const reviewData = {
        ...formData,
        bookingId: booking.id,
        carId: booking.carId,
        userId: currentUser.uid,
        userName:
          currentUser.displayName || `${currentUser.email?.split("@")[0]}`,
        userAvatar: currentUser.photoURL,
        reviewType: isHostReview ? "host_review" : "renter_review",
        verifiedTrip: true,
        targetId: isHostReview ? booking.renterId : booking.hostId,
      };

      await onSubmit(reviewData);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Overall Rating
        </label>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setFormData({ ...formData, rating: star })}
              className="focus:outline-none"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= formData.rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
          <span className="ml-3 text-lg font-medium text-gray-700">
            {formData.rating}/5
          </span>
        </div>
      </div>

      {/* Category Ratings */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Rate Your Experience
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(formData.categories).map(([category, rating]) => (
            <div key={category}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">
                  {categoryLabels[category]}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {rating}/5
                </span>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleCategoryRating(category, star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Written Review */}
      <TextArea
        label="Your Review"
        placeholder={`Share your experience with this ${isHostReview ? "renter" : "car and host"}...`}
        value={formData.comment}
        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
        rows={4}
        required
      />

      {/* Would Recommend */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Would you recommend this {isHostReview ? "renter" : "car"} to others?
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              checked={formData.wouldRecommend === true}
              onChange={() =>
                setFormData({ ...formData, wouldRecommend: true })
              }
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={formData.wouldRecommend === false}
              onChange={() =>
                setFormData({ ...formData, wouldRecommend: false })
              }
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">No</span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3">
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          loading={loading}
          disabled={loading || !formData.comment.trim()}
        >
          Submit Review
        </Button>
      </div>
    </div>
  );
};

const ReviewSystem = ({
  carId,
  bookingId = null,
  showForm = false,
  onReviewSubmitted = null,
  maxReviews = 10,
}) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(showForm);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, [carId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const carReviews = await reviewService.getReviewsByCarId(carId);
      setReviews(carReviews.slice(0, maxReviews));

      // Calculate average rating
      if (carReviews.length > 0) {
        const avgRating =
          carReviews.reduce((sum, review) => sum + review.rating, 0) /
          carReviews.length;
        setAverageRating(avgRating);
        setTotalReviews(carReviews.length);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      await reviewService.createReview(reviewData);
      await fetchReviews(); // Refresh reviews
      setShowReviewForm(false);
      onReviewSubmitted?.(reviewData);
    } catch (error) {
      console.error("Error submitting review:", error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Reviews ({totalReviews})
          </h3>
          {totalReviews > 0 && (
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(averageRating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {averageRating.toFixed(1)} average rating
              </span>
            </div>
          )}
        </div>

        {bookingId && !showReviewForm && (
          <Button size="sm" onClick={() => setShowReviewForm(true)}>
            Write Review
          </Button>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && bookingId && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Write Your Review
          </h4>
          <ReviewForm
            booking={{ id: bookingId, carId }}
            onSubmit={handleReviewSubmit}
            onCancel={() => setShowReviewForm(false)}
          />
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            No reviews yet
          </h4>
          <p className="text-gray-600">Be the first to review this car!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}

          {totalReviews > maxReviews && (
            <div className="text-center pt-4">
              <Button variant="outline">Show all {totalReviews} reviews</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { ReviewSystem, ReviewForm, ReviewCard };
export default ReviewSystem;
