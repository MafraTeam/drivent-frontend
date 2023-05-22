import api from './api';

async function getBookingByUser(token) {
  const promise = await api.get('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return promise.data;
}

async function bookingRoom(roomId, token) {
  const body = {
    roomId: roomId,
  };
  const promise = await api.post('/booking', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return promise.data;
}

async function changeBooking(bookingId, roomId, token) {
  const body = {
    roomId: roomId,
  };
  const promise = await api.put(`/booking/${bookingId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return promise.data;
}

async function getBookingsByHotel(hotelId, token) {
  const promise = await api.get(`/hotels/bookings/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return promise;
}

const bookingApi = {
  getBookingByUser,
  bookingRoom,
  changeBooking,
  getBookingsByHotel
};

export default bookingApi;
