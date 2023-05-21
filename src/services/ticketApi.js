import api from './api';

async function getTicket(token) {
  const promise = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return promise.data;
}

const ticketApi = {
  getTicket,
};

export default ticketApi;
