import React, { useState, useEffect } from "react";
import { Heart, Search } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Button from "../../components/ui/Button";

const Favorites = () => {
  const { currentUser, userProfile } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading favorites
    setTimeout(() => {
      setFavorites([]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  const userName = userProfile?.firstName || currentUser?.displayName?.split(' ')[0] || 'User';

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ color: '#003552' }}>
            {userName}'s favorites
          </h1>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            {/* Car Illustration */}
            <div className="mb-8">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2F863834c73ac442e38188d113e5e84dbb?format=webp&width=800"
                alt="Car illustration"
                className="w-72 h-auto mx-auto"
              />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ color: '#003552' }}>
              Get started with Favorites
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Tap the heart icon to save your favorite vehicles to a list
            </p>
            
            <Button 
              className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-white transition-colors"
              style={{ backgroundColor: '#003552' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#002a40'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#003552'}
              onClick={() => window.location.href = '/search'}
            >
              <Search className="w-5 h-5 mr-2" />
              Find new favorites
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <div className="relative aspect-video">
                  <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-colors">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {car.year} {car.make} {car.model}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-gray-900">
                      ${car.price}
                      <span className="text-sm font-normal text-gray-500">/day</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


      </div>
    </div>
  );
};

export default Favorites;
