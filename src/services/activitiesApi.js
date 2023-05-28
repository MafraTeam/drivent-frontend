import api from './api';

async function getAllActivities(token) {
  const promise = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return promise.data;
}

async function getAllActivitiesPerDay(day, token) {
  const promise = await api.get(`/activities/${day}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return promise.data;
}

const activitiesApi = {
  getAllActivities,
  getAllActivitiesPerDay,
};

export default activitiesApi;
