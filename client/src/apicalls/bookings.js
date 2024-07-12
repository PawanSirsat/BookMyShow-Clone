import { axiosInstance } from ".";

export const MakePayment = async (amount) => {
  try {
    console.log(amount);
    const response = await axiosInstance.post("/api/bookings/make-payments", {
      amount,
    });

    console.log(amount, "here is you details");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

// book shows
export const BookShowTickets = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/bookings/book-show",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get bookings of a user
export const GetBookingsOfUser = async () => {
  try {
    const response = await axiosInstance.get("/api/bookings/get-bookings");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
