import React, { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

// Initial state
const initialState = {
  searchFilters: {
    location: "",
    pickupDate: null,
    dropoffDate: null,
    vehicleType: "",
    priceRange: [0, 500],
    features: [],
  },
  bookingInProgress: null,
  notifications: [],
  loading: false,
  error: null,
};

// Action types
export const ACTION_TYPES = {
  SET_SEARCH_FILTERS: "SET_SEARCH_FILTERS",
  SET_BOOKING_IN_PROGRESS: "SET_BOOKING_IN_PROGRESS",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  REMOVE_NOTIFICATION: "REMOVE_NOTIFICATION",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SEARCH_FILTERS:
      return {
        ...state,
        searchFilters: { ...state.searchFilters, ...action.payload },
      };

    case ACTION_TYPES.SET_BOOKING_IN_PROGRESS:
      return {
        ...state,
        bookingInProgress: action.payload,
      };

    case ACTION_TYPES.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case ACTION_TYPES.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload,
        ),
      };

    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators
  const setSearchFilters = (filters) => {
    dispatch({ type: ACTION_TYPES.SET_SEARCH_FILTERS, payload: filters });
  };

  const setBookingInProgress = (booking) => {
    dispatch({ type: ACTION_TYPES.SET_BOOKING_IN_PROGRESS, payload: booking });
  };

  const addNotification = (notification) => {
    const id = Date.now().toString();
    dispatch({
      type: ACTION_TYPES.ADD_NOTIFICATION,
      payload: { ...notification, id },
    });

    // Auto remove notification after 5 seconds
    setTimeout(() => {
      dispatch({ type: ACTION_TYPES.REMOVE_NOTIFICATION, payload: id });
    }, 5000);
  };

  const removeNotification = (id) => {
    dispatch({ type: ACTION_TYPES.REMOVE_NOTIFICATION, payload: id });
  };

  const setLoading = (loading) => {
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error });
  };

  const clearError = () => {
    dispatch({ type: ACTION_TYPES.CLEAR_ERROR });
  };

  const value = {
    ...state,
    setSearchFilters,
    setBookingInProgress,
    addNotification,
    removeNotification,
    setLoading,
    setError,
    clearError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
