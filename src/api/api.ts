import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api"; // Adjust base URL if needed

// SignUp API
export const signUp = async (userData: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  role_type: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/signup/`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Login API
export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login/`, credentials);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch all artists
export const fetchArtists = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/artist/`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching artists:", error);
    return [];
  }
};

// Fetch single artist by ID
export const fetchArtistById = async (artistId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/artist/${artistId}/`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Create a new artist
export const createArtist = async (artistData: {
  name: string;
  dob: string;
  gender: string;
  address: string;
  first_release_year: number;
  no_of_albums_released: number;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/artist/`, artistData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Update an existing artist
export const updateArtist = async (artistId: number, artistData: {
  name: string;
  dob: string;
  gender: string;
  address: string;
  first_release_year: number;
  no_of_albums_released: number;
}) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/artist/${artistId}/`, artistData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete an artist
export const deleteArtist = async (artistId: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/artist/${artistId}/`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch all music
export const fetchMusic = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/music/`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching music:", error);
    return [];
  }
};

// Fetch single music by ID
export const fetchMusicById = async (musicId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/music/${musicId}/`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Create a new music entry
export const createMusic = async (musicData: {
  title: string;
  album_name: string;
  artist: string;
  genre: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/music/`, musicData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Update an existing music entry
export const updateMusic = async (musicId: number, musicData: {
  title: string;
  album_name: string;
  artist: string;
  genre: string;
}) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/music/${musicId}/`, musicData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete a music entry
export const deleteMusic = async (musicId: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/music/${musicId}/`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};
