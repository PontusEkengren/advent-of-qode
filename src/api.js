import axios from 'axios';
const { REACT_APP_ADVENT_OF_QODE_SERVER } = process.env;

export const getLeaderBoard = () => {
  return axios.get(`${REACT_APP_ADVENT_OF_QODE_SERVER}/advent`);
};

export const getUserScore = (userId) => {
  return axios.get(`${REACT_APP_ADVENT_OF_QODE_SERVER}/advent/user?userId=${userId}`);
};

export const getQueryAsAdmin = (day, token) => {
  return axios.get(`${REACT_APP_ADVENT_OF_QODE_SERVER}/admin?day=${day}`, { headers: { Authorization: token } });
};

export const getQuery = (day) => {
  return axios.get(`${REACT_APP_ADVENT_OF_QODE_SERVER}/query?day=${day}`);
};

export const createUserScore = (data) => {
  return axios.post(
    `${REACT_APP_ADVENT_OF_QODE_SERVER}/advent`,
    {
      userId: data.userId,
      score: data.score,
      email: data.email,
      question: data.question,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const addOrUpdateQuestion = (day, question, options, token) => {
  const questionInputModel = {
    day,
    question,
    options,
  };

  return axios.put(`${REACT_APP_ADVENT_OF_QODE_SERVER}/query`, questionInputModel, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
};

export const submitAnswer = (day, answer, roundedTime) => {
  return axios.post(
    `${REACT_APP_ADVENT_OF_QODE_SERVER}/query/answer`,
    { answer, day, time: roundedTime },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
