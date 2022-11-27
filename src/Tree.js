import React, { useState, useEffect, useCallback } from 'react';
import { Colours, Row } from './Styled/defaults';
import { Branch, Ornament } from './Styled/christmas.js';
import { treeData } from './treeData.js';
import Question from './Question';
const { REACT_APP_ACTIVE_MONTH } = process.env;

export default function Tree({ userData, disabled, onSubmit, email }) {
  const [showQuestion, setShowQuestion] = useState(false);
  const [queryDay, setQueryDay] = useState(null);
  const [tree, setTree] = useState([]);
  const date = new Date().toISOString();
  let dayString = date.slice(8, 10);
  let today = parseInt(dayString);
  const todaysBranch = tree.find((b) => b.day === today);
  // today = 1; //For debug purpose

  const getTreeData = useCallback((userData) => {
    console.log(userData);
    const date = new Date().toISOString();
    let month = date.slice(5, 7);
    if (month === REACT_APP_ACTIVE_MONTH ? `${REACT_APP_ACTIVE_MONTH}` : '12') {
      return treeData.map((branch) => {
        return {
          ...branch,
          active: branch.day <= parseInt(date.slice(8, 10)),
          clickable: !userData.find((u) => u.question === branch.day && u.score === '0'),
          completed: userData.some((x) => x.question === branch.day),
        };
      });
    }

    return treeData;
  }, []);

  useEffect(() => {
    setTree(getTreeData(userData));
  }, [userData, getTreeData]);

  const isActive = (branch) => {
    if (disabled) return false;

    return branch.active && branch.day <= today && branch.day > 0;
  };

  const getBranchContent = (branch) => {
    return (
      <Row
        active={isActive(branch) && branch.clickable && !branch.completed}
        onClick={(e) => {
          if (isActive(branch) && branch.clickable && !branch.completed) {
            setShowQuestion(true);
            setQueryDay(branch.day);
          }
        }}
      >
        <td>
          {[...branch.ornament].map((char, i) => {
            var color = isActive(branch) ? Colours.lightGrey : Colours.grey;
            // const color = Colours.lightGrey;
            if (branch.active && branch.completed && branch.clickable) {
              switch (char) {
                case 'o':
                  color = Colours.orange;
                  break;
                case '>':
                case '<':
                  color = Colours.green;
                  break;
                case '*':
                  color = Colours.yellow;
                  break;
                case 'O':
                  color = Colours.blue;
                  break;
                case '@':
                  color = Colours.red;
                  break;
                default:
                  break;
              }
            }

            return (
              <Ornament key={i} color={color} textShadow={color !== Colours.lightGrey && color !== Colours.grey}>
                {char}
              </Ornament>
            );
          })}
        </td>
        <td>{branch.day > 0 ? branch.day : ''}</td>
      </Row>
    );
  };

  const handleCloseModal = () => {
    setShowQuestion(false);
  };

  const handleSubmit = (time) => {
    onSubmit(time, queryDay, email);
  };

  return (
    <div style={{ width: '950px', margin: '20px 0 0 40px', minWidth: '930px' }}>
      {tree.length > 0 && todaysBranch && !todaysBranch.clickable && todaysBranch.completed && today !== 24 && (
        <div style={{ color: Colours.lightGrey }}>Come back tomorrow for a new challange!</div>
      )}
      {tree.length > 0 &&
        tree.map((branch, i) => (
          <Branch active={branch.active} key={i}>
            <table>
              <tbody>{getBranchContent(branch)}</tbody>
            </table>
          </Branch>
        ))}

      <Question
        onCloseModal={handleCloseModal}
        modalStatus={showQuestion}
        day={queryDay}
        onSubmitResult={handleSubmit}
        email={email}
      />
    </div>
  );
}
