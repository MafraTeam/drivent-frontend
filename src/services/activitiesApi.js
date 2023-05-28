import api from './api';

async function getActivities(token) {
  const promise = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return promise.data;
}

const activityApi = {
  getActivities,
};

export default activityApi;
