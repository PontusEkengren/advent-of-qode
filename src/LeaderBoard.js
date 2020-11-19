import React, { useEffect, useState } from 'react';
import * as api from './api';
import { LeaderboardHeader } from './Styled/christmas.js';
export default function LeaderBoard({ users }) {
  const [leaderBoard, setLeaderBoard] = useState(undefined);

  useEffect(() => {
    const loadLeaderBoard = () => {
      if (!leaderBoard) {
        api
          .getLeaderBoard()
          .then((response) => {
            setLeaderBoard(response.data);
          })
          .catch(() => setLeaderBoard([{ email: 'Unable to fetch leaderboard', score: '' }]));
      }
    };

    loadLeaderBoard();
  }, [leaderBoard]);

  return (
    <>
      <LeaderboardHeader>Leaderboard</LeaderboardHeader>
      {leaderBoard &&
        leaderBoard.map((user, i) => (
          <div key={i}>
            <div>{user.email}</div>
            <div>{user.score}</div>
          </div>
        ))}
    </>
  );
}
