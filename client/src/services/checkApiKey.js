const checkApiKey = (key) => {
  const apiEndpoint = `http://api.alldebrid.com/v4/user?agent=myAppName&apikey=${key}`;

  return fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    })
    .catch(() => Promise.reject());
};

export default checkApiKey;