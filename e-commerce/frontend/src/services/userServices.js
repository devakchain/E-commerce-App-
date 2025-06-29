import apiClient from "../api.Client";
import { jwtDecode } from "jwt-decode";

const token = "token";

export async function signUp(user, profilePic) {
  const body = new FormData();
  body.append("name", user.name);
  body.append("email", user.email);
  body.append("password", user.password);
  body.append("deliveryAddress", user.deliveryAddress);
  body.append("profilePic", profilePic);

  const { data } = await apiClient.post("/user/signup", body);
  localStorage.setItem(token, data.token);
}

export async function login(user) {
  const { data } = await apiClient.post("/user/login", user);
  localStorage.setItem(token, data.token);
}

export function logout() {
  localStorage.removeItem(token);
}

export function getUser() {
  try {
    const jwt = localStorage.getItem(token);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(token);
}
