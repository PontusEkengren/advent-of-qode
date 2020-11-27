import React, { useEffect, useState } from 'react';
import * as api from './api';
import { LeaderBoardRow, LeaderBoardContainer, LeaderboardHeader } from './Styled/christmas.js';
import { LeftCell, RightCell, RightHeader } from './Styled/defaults';
export default function LeaderBoard() {
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
    <LeaderBoardContainer>
      <LeaderboardHeader>Leaderboard</LeaderboardHeader>
      <table>
        <tbody>
          <tr>
            <th></th>
            <RightHeader>Days</RightHeader>
            <RightHeader>Seconds</RightHeader>
          </tr>
          {leaderBoard &&
            leaderBoard.map((user, i) => (
              <LeaderBoardRow key={i}>
                <LeftCell>{user.email}</LeftCell>
                <RightCell>{user.numberOfDays}</RightCell>
                <RightCell>{user.score}</RightCell>
              </LeaderBoardRow>
            ))}
        </tbody>
      </table>
    </LeaderBoardContainer>
  );
}
