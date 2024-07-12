import { axiosInstance } from ".";

export const AddTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/add-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const GetAllTheatresByOwner = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/get-all-theatres-by-owner",
      payload
    );

    return response.data;
  } catch (error) {
    return error.repsonse;
  }
};

export const UpdateTheatre = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/theatres/update-theatre",
      payload
    );

    return response.data;
  } catch (error) {
    return error.repsonse;
  }
};

export const DeleteTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/delete-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.repsonse;
  }
};

export const GetAllTheatres = async () => {
  try {
    const response = await axiosInstance("/api/theatres/get-all-theatres");

    return response.data;
  } catch (error) {
    return error.repsonse;
  }
};

export const AddShow = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/add-show",
      payload
    );
    return response.data;
  } catch (error) {
    return error.repsonse;
  }
};

export const GetAllShowsByTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/get-all-show-by-theatre",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const DeleteShow = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/delete-show",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

//get all theatre for all the movie

export const GetAllTheatresByMovie = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/get-all-theatres-by-movie",
      payload
    );

    return response.data;
  } catch (error) {
    return error.response;
  }
};

// get show by id
export const GetShowById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/get-show-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
