import * as usersAPI from "./users-api";

export async function signUp(userData) {
    const token = await usersAPI.signUp(userData);
    localStorage.setItem('token', token);
    return getUser();
  }

  export async function login(userData) {
    const token = await usersAPI.login(userData);
    localStorage.setItem('token', token);
    return getUser();
  }
  export function getToken() {
    // getItem returns null if there's no string
    const token = localStorage.getItem("token");
    if (!token) return null;
    // Obtain the payload of the token
    const payload = JSON.parse(atob(token.split(".")[1]));
    // A JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
      // Token has expired - remove it from localStorage
      localStorage.removeItem("token");
      return null;
    }
    return token;
  }
  
  export function getUser() {
    const token = getToken();
    // If there's a token, return the user in the payload, otherwise return null
    return token ? JSON.parse(atob(token.split(".")[1])).user : null;
  }

  export function logOut() {
    localStorage.removeItem("token");
  }

  export async function checkToken() {
    const data = await usersAPI.checkToken();
    return data;
  }
  
  export async function searchDogBreeds(searchQuery) {
    const searchData = await usersAPI.searchDogBreeds(searchQuery);
    return searchData;
  }

  export async function getDogNames() {
    const data = await usersAPI.getDogNames();
    return data;
  }

  export async function addDogToWishList(dogData) {
    const addedDog = await usersAPI.addDogToWishList(dogData);
    return addedDog;
  }


  export async function getAllDogFromWishList() {
    const data = await usersAPI.getAllDogFromWishList();
    return data;
  }

  export async function deleteDogFromWishList(dogId) {
    const data = await usersAPI.deleteDogFromWishList(dogId);
    return data;
  }

  export async function getAllMemories() {
    const data = await usersAPI.getAllMemories();
    return data;
  }

  export async function getMemoriesByUser(userId) {
    const data = await usersAPI.getMemoriesByUser(userId);
    return data;
  }

  export async function addMemory(memoryData) {
    const addedMemory = await usersAPI.addMemory(memoryData);
    return addedMemory;
  }

  export async function deleteMemory(memoryId) {
    const data = await usersAPI.deleteMemory(memoryId);
    return data;
  }

  export async function updateMemory(memoryId, updatedText) {
    const updatedMemory = await usersAPI.updateMemory(memoryId, updatedText);
    return updatedMemory;
  }

  export async function getDogProfile() {
    const data = await usersAPI.getDogProfile();
    return data;
  }

  export async function getAllDogProfile() {
    const data = await usersAPI.getAllDogProfile();
    return data;
  }

  export async function addDogProfile(dogProfileData) {
    const addedDogProfile = await usersAPI.addDogProfile(dogProfileData);
    return addedDogProfile;
  }