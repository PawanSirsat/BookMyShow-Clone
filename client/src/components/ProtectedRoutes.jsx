import { message, Select } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/userSlice";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";

const { Option } = Select;

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCity, setSelectedCity] = useState(""); // State to store selected city
  const [tier1Cities, setTier1Cities] = useState([
    "Pune",
    "Delhi",
    "Bangalore",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Mumbai",
    "Ahmedabad"
  ]); // Tier 1 cities in India

  const getPresentUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        dispatch(SetUser(null));
        message.error(response.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      dispatch(HideLoading());
      dispatch(SetUser(null));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getPresentUser();
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    // Attempt to fetch user's geolocation if no city selected
    if (!selectedCity) {
      const storedCity = localStorage.getItem("selectedCity");
      if (storedCity) {
        setSelectedCity(storedCity); // Use stored city if available
      } else {
        fetchUserLocation(); // Otherwise, attempt to fetch user location
      }
    }
  }, [selectedCity]);

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchCityFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
          message.error("Failed to fetch your location.");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      message.error("Geolocation is not supported by this browser.");
    }
  };

  const fetchCityFromCoordinates = (latitude, longitude) => {
    // Implement logic to fetch city from coordinates using reverse geocoding API
    // This is a simplified example, you'd typically use a service like Google Maps Geocoding API
    // Replace with your preferred geocoding service or API
    // For demonstration, I'm setting a default city
    setSelectedCity("Mumbai"); // Example default city based on coordinates
  };

  const handleCityChange = (value) => {
    setSelectedCity(value); // Update selected city
    localStorage.setItem("selectedCity", value); // Store selected city in localStorage
  };

  return (
    user && (
      <div className="layout ">
        <div className="header bg-primary flex justify-between p-1">
          <div>
            <h1 className="text-2xl text-white cursor-pointer" onClick={() => navigate("/")}>
              EVENT DTL
            </h1>
          </div>
          <div className=" p-1 flex gap-2">
            <Select
              defaultValue={selectedCity || tier1Cities[0]}
              style={{ width: 120 }}
              onChange={handleCityChange}
            >
              {tier1Cities.map((city) => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
              <Option key="detect" value="detect">
                Detect My Location
              </Option>
            </Select>
            <i className="ri-shield-user-line text-primary mt-1"></i>
            <h1
              className="text-sm underline"
              onClick={() => {
                if (user.isAdmin) {
                  navigate("/admin");
                } else {
                  navigate("/profile");
                }
              }}
            >
              {user.name}
            </h1>
            <i
              className="ri-logout-box-r-line mt-1"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        <div className="content mt-1 p-1">{children}</div>
      </div>
    )
  );
};

export default ProtectedRoute;
