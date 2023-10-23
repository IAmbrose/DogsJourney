import axios from "axios";

const BASE_URL = "/api/users";
const LOGIN_URL = "/api/users/login";
const DOGBREED_URL = "/api/dogBreeds";

export async function signUp(userData) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Sign Up");
  }
}

export async function login(userData) {
  const res = await fetch(LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Sign Up");
  }
}

export function checkToken() {
  const token = localStorage.getItem("token");
  return axios.get("/api/users/check-token", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function searchDogBreeds(searchQuery) {
  try {
    const response = await fetch(`${DOGBREED_URL}/search/${searchQuery}`);

    if (!response.ok) {
      throw new Error("Dog Breed search request failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error searching Dog Breed: ${error.message}`);
  }
}

export async function getDogNames() {
  try {
    const response = await fetch(`${DOGBREED_URL}/list`);
    
    if (!response.ok) {
      throw new Error("Dog Breed search request failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error searching Dog Breed: ${error.message}`);

  }
}

export async function addDogToWishList(dogData) {
  try {
    const token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(`${DOGBREED_URL}/wishlist`, {
      method: "POST",
      headers,
      body: JSON.stringify(dogData),
    });

    if (!response.ok) {
      throw new Error("Error adding dog to the wishlist");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Error adding dog to the wishlist: ${error.message}`,
    );
  }
}

export async function getAllDogFromWishList() {
  try{
    const token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(`${DOGBREED_URL}/wishlist`, {
      method: "GET",
      headers
    });
    if (!response.ok) {
      throw new Error("Error fetching dog from the wishlist");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Error fetching dog from the wishlist: ${error.message}`,
    );
  }
}