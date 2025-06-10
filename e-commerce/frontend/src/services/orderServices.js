import apiClient from "../api.Client";

export function checkoutApi() {
  return apiClient.post("/order/checkout");
}
