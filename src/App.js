import './App.css';
import React, { useState, useEffect } from 'react';
import { Header, Body } from './Styled/defaults';
import LeaderBoard from './LeaderBoard';
import Tree from './Tree.js';
import * as api from './api.js';

function App() {
  const [userScore, setUserScore] = useState([]);

  useEffect(() => {
    api.getUserScore().then((response) => {
      setUserScore(response.data);
    });
  }, []);

  return (
    <>
      <Header>
        <p>Advent of Qode</p>
      </Header>
      <Body>
        <Tree userData={userScore} />
        <LeaderBoard />
      </Body>
    </>
  );
}

export default App;
