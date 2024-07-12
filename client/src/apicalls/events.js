import { axiosInstance } from "."; // Assuming axiosInstance is correctly set up for your API calls

// Add a new event
export const CreateEvent = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/events/create-event", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetAllEvents = async (page) => {
  try {
    const response = await axiosInstance.get(`/api/event/get-all-events?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
// Get event by ID
export const GetEventById = async (eventId) => {
  try {
    const response = await axiosInstance.get(`/api/events/get-event/${eventId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Update event by ID
export const UpdateEvent = async (eventId, payload) => {
  try {
    const response = await axiosInstance.put(`/api/events/update-event/${eventId}`, payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Delete event by ID
export const DeleteEvent = async (eventId) => {
  try {
    const response = await axiosInstance.delete(`/api/events/delete-event/${eventId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
