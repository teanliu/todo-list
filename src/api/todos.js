import axios from 'axios';
const baseUrl = 'https://todo-list.alphacamp.io/api';
// const baseUrl = 'http://localhost:8000/api';
// const baseUrl = 'https://todo-list-reactapplication.herokuapp.com/api';

const axiosInstance = axios.create({
  baseURL: baseUrl,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (e) => {
    console.error(e);
  },
);

export const getTodos = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/todos`);
    return res.data;
  } catch (e) {
    console.error('[get todos failed]: ', e);
  }
};

export const createTodo = async (payload) => {
  const { title, isDone } = payload;
  try {
    const res = await axiosInstance.post(`${baseUrl}/todos`, {
      title,
      isDone,
    });
    return res.data;
  } catch (e) {
    console.error("[create todos failed]: ", e);
  }
  
};

export const patchTodo = async (payload) => {
  const { id, title, isDone } = payload;
  try {
    const res = await axiosInstance.patch(`${baseUrl}/todos/${id}`, {
      title,
      isDone,
    });
    return res.data;
  } catch (e) {
    console.error("[patch todos failed]: ", e);
  }
};

export const deleteTodo = async (id) => {
  try {
    const data = await axiosInstance.delete(`${baseUrl}/todos/${id}`);
    return data.data;
  } catch (e) {
    console.error("[delete todos failed]: ", e);
  }
};
