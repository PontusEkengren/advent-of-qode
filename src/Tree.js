import React, { useState, useEffect } from 'react';
import { Colours, Row } from './Styled/defaults';
import { Branch, Ornament } from './Styled/christmas.js';
import { treeData } from './treeData.js';
import Question from './Question';

export default function Tree({ userData, disabled }) {
  const [showQuestion, setShowQuestion] = useState(false);
  const [day, setDay] = useState(null);
  const [tree, setTree] = useState([]);

  const getTreeData = (userData) => {
    const date = new Date().toISOString();
    let month = date.slice(5, 7);
    if (month === '11') {
      let dayString = date.slice(8, 10);
      const day = parseInt(dayString);

      return treeData.map((branch) => {
        return { ...branch, active: branch.day <= day, completed: userData.some((x) => x.question === branch.day) };
      });
    }

    return treeData;
  };

  useEffect(() => {
    console.log('userData', userData);
    setTree(getTreeData(userData));
  }, [userData]);

  const isActive = (branch) => {
    if (disabled) return false;

    return branch.active && branch.day > 0;
  };

  const getBranchContent = (branch) => {
    return (
      <Row
        active={isActive(branch)}
        onClick={() => {
          if (isActive(branch)) {
            setShowQuestion(true);
            setDay(branch.day);
          }
        }}
      >
        <td>
          {[...branch.ornament].map((char, i) => {
            var color = isActive(branch) ? Colours.lightGrey : Colours.grey;
            // const color = Colours.lightGrey;
            if (branch.active && branch.completed) {
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

  return (
    <div style={{ width: '950px', margin: '20px 0 0 40px', minWidth: '930px' }}>
      {tree.length > 0 &&
        tree.map((branch, i) => (
          <Branch active={branch.active} key={i}>
            <table>
              <tbody>{getBranchContent(branch)}</tbody>
            </table>
          </Branch>
        ))}

      <Question onCloseModal={() => setShowQuestion(false)} modalStatus={showQuestion} day={day} />
    </div>
  );
}
