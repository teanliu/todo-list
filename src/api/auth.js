import axios from 'axios';

const authUrl = 'https://todo-list.alphacamp.io/api/auth';

export const login = async ({ userName, userPassword }) => {
  try {
    const { data } = await axios.post(`${authUrl}/login`, {
      username: userName,
      password: userPassword
    });
    console.log(data)
    const {authToken} = data

    if (authToken) {
      return { success: true, ...data };
    }
    return data
  } catch (e) {
    console.error('[login failed]: ', e);
  }
};

export const register = async ({ userName, userEmail, userPassword }) => {
  try {
    const { data } = await axios.post(`${authUrl}/register`, {
      username: userName,
      email: userEmail,
      password: userPassword,
    });
    console.log(data);
    const { authToken } = data;

    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (e) {
    console.error('[register failed]: ', e);
  }
};

export const checkPermission = async (authToken) => {
  try {
    const response = await axios.get(`${authUrl}/test-token`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return response.data.success
  } catch (e) {
    console.error('[Check permission failed]: ', e)
  }
}