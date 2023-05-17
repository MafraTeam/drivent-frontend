import api from './api';

async function getHotels(token) {
  const promise = await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return promise.data;
}

async function getHotelRooms(token, id) {
  const promise = await api.get(`/hotels/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return promise.data.Rooms;
}

const hotelApi = {
  getHotels,
  getHotelRooms,
};

export default hotelApi;
