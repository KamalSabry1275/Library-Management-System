export const useFetch = (URL = "", method = "get", body = {}) => {
  return async function data() {
    return await fetch(URL, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  };
};
