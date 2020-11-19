import axios from 'axios';
const { REACT_APP_ADVENT_OF_QODE_SERVER } = process.env;

export const getLeaderBoard = () => {
  return axios.get(`${REACT_APP_ADVENT_OF_QODE_SERVER}/advent`);
};

export const saveScore = (data) => {
  return axios.post(
    `${REACT_APP_ADVENT_OF_QODE_SERVER}/advent`,
    { data },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
