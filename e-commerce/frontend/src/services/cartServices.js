import apiClient from "../api.Client";

export async function addToCartApi(id, quantity) {
  return await apiClient.post(`/cart/${id}`, { quantity });
}

export async function getCartApi() {
  return await apiClient.get(`/cart`);
}

export async function removeFromCartApi(id) {
  return await apiClient.patch(`/cart/remove/${id}`);
}

export async function increaseProductApi(id) {
  return await apiClient.patch(`/cart/increase/${id}`);
}

export async function decreaseProductApi(id) {
  return await apiClient.patch(`/cart/decrease/${id}`);
}
