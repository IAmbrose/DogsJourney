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

  export async function updateMemory(memoryId, updatedText, updatedImageURL) {
    const updatedMemory = await usersAPI.updateMemory(memoryId, updatedText, updatedImageURL);
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

  export async function getAllDogTricks() {
    const data = await usersAPI.getAllDogTricks();
    return data;
  }

  export async function addDogTrick(dogTrickData) {
    const addedDogTrick = await usersAPI.addDogTrick(dogTrickData);
    return addedDogTrick;
  }

  export async function updateDogTrick(dogTrickId) {
    const updatedDogTrick = await usersAPI.updateDogTrick(dogTrickId);
    return updatedDogTrick;
  }

  export async function likeMemory(memoryId) {
    const liked= await usersAPI.likeMemory(memoryId);
    return liked;
  }

  export async function getLikes(memoryId) {
    const data = await usersAPI.getLikes(memoryId);
    return data;
  }

  export async function getUserDetails() {
    const data = await usersAPI.getUserDetails();
    return data;
  }

  export async function updateDogProfile(dogProfileId, updatedName, updatedDescription, updatedImageURL) {
    const updatedDogProfile = await usersAPI.updateDogProfile(dogProfileId, updatedName, updatedDescription, updatedImageURL);
    return updatedDogProfile;
  }