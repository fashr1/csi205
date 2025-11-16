import api from './config';

export const bookingAPI = {
  create: async (bookingData) => {
    const response = await api.post('/user/bookings', bookingData);
    return response.data;
  },

  getUserBookings: async () => {
    const response = await api.get('/user/bookings');
    return response.data;
  },

  cancel: async (id) => {
    const response = await api.patch(`/user/bookings/${id}/cancel`);
    return response.data;
  },
};
