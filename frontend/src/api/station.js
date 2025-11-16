import api from './config';

export const stationAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/user/stations?${params}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/user/stations/${id}`);
    return response.data;
  },
};
