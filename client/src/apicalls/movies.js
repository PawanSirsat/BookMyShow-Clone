import { axiosInstance } from ".";

export const AddMovie = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/movies/add-movie", payload);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const GetAllMovies = async (payload) => {
  try {
    const response = await axiosInstance.get("/api/movies/get-all-movies");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//edit the movie
export const UpdateMovie = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/movies/update-movie",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//delete the movie
export const DeleteMovie = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/movies/delete-movie",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//get movie by ID
export const GetMovieById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/movies/get-movie-by-id/${id}`
    );

    return response.data;
  } catch (error) {
    return error.response;
  }
};
