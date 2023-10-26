import axios from "axios";

const BASE_URL = "/api/users";
const LOGIN_URL = "/api/users/login";
const DOGBREED_URL = "/api/dogBreeds";
const MEMORIES_URL = "/api/memories";
const DOGPROFILE_URL = "/api/dogProfiles"

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

export async function deleteDogFromWishList(dogId) {
  try{
    const token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(`${DOGBREED_URL}/wishlist/${dogId}`,
    {
      method: "DELETE",
      headers
    });
    if(!response.ok) {
      throw new Error("Error deleting dog from wishlist");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error deleting dog from the wishlist: ${error.message}`)
  }
}

export async function getAllMemories() {
  try{
    const token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(`${MEMORIES_URL}`, {
      method: "GET",
      headers
    });
    if (!response.ok) {
      throw new Error("Error fetching memories");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Error fetching dog from the wishlist: ${error.message}`,
    );
  }
}

export async function getMemoriesByUser(userId) {
  try{
    const token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(`${MEMORIES_URL}/${userId}`, {
      method: "GET",
      headers
    });
    if (!response.ok) {
      throw new Error("Error fetching memories");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Error fetching dog from the wishlist: ${error.message}`,
    );
  }
}


export async function addMemory(memoryData) {
  try {
    const token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(`${MEMORIES_URL}`, {
      method: "POST",
      headers,
      body: JSON.stringify(memoryData),
    });

    if (!response.ok) {
      throw new Error("Error adding memory");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Error adding memory: ${error.message}`,
    );
  }
}


export async function deleteMemory(memoryId) {
  try{
    const token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(`${MEMORIES_URL}/${memoryId}`,
    {
      method: "DELETE",
      headers
    });
    if(!response.ok) {
      throw new Error("Error deleting memory");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error deleting memory: ${error.message}`)
  }
}

export async function updateMemory(memoryId, updatedText) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `${MEMORIES_URL}/${memoryId}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ text: updatedText }),
      },
    );

    if (!response.ok) {
      throw new Error("Error updating review");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error updating review: ${error.message}`);
  }
}

export async function getDogProfile() {
  try{
    const token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(`${DOGPROFILE_URL}`, {
      method: "GET",
      headers
    });
    if (!response.ok) {
      throw new Error("Error fetching dog profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Error fetching dog profile: ${error.message}`,
    );
  }
}

export async function getAllDogProfile() {
  try{
    const response = await fetch(`${DOGPROFILE_URL}/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!response.ok) {
      throw new Error("Error fetching dog profiles");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Error fetching dog profiles: ${error.message}`,
    );
  }
}

export async function addDogProfile(dogProfileData) {
  try {
    const token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(`${DOGPROFILE_URL}`, {
      method: "POST",
      headers,
      body: JSON.stringify(dogProfileData),
    });

    if (!response.ok) {
      throw new Error("Error adding dog profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Error adding dog profile: ${error.message}`,
    );
  }
}