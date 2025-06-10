import apiClient from "../api.Client";

export function getSuggestionsApi(search) {
  return apiClient.get(`/products/suggestions?search=${search}`);
}
