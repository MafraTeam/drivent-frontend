import api from './api';

async function getActivities(token) {
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

async function enrollOnActivity(activityId, token) {
  const body = {
    activityId: activityId,
  };
  const promise = await api.post('/activities', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return promise.data;
}

const activityApi = {
  getActivities,
  getAllActivitiesPerDay,
  enrollOnActivity,
};

export default activityApi;
