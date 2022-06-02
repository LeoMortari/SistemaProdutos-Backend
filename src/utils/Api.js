import axios from "axios";

const getMethod = (url, method) => {
  const params = method?.params;

  switch (method.type) {
    case "get":
      return axios.get(url, params);
    case "post":
      return axios.post(url, params);
    case "put":
      return axios.put(url, params);
    case "patch":
      return axios.patch(url, params);
  }
};

export const fetchRequest = async (url, method = "get") => {
  const { data } = await getMethod(url, method);

  return data;
};

export const getCeps = async (cep) => {
  const urlBase = `https://viacep.com.br/ws/${cep}/json`;

  const { data } = await axios.get(urlBase);

  return data;
};
