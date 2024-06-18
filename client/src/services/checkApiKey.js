const checkApiKey = (key) => {
  return fetch(`/api/checkApiKey/${key}`)
    .then((res) => res.json())
    .then((res) => {
      if (!res.isValid) {
        throw new Error("API key is invalid");
      }
      return res;
    });
};

export default checkApiKey;