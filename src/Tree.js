import React, { useState } from 'react';
import { Row } from './Styled/defaults';
import { Branch } from './Styled/christmas.js';
import { treeData } from './treeData.js';
import Question from './Question';

export default function Tree() {
  const [showQuestion, setShowQuestion] = useState(false);
  const [day, setDay] = useState(null);

  const getTreeData = () => {
    const date = new Date().toISOString();
    let month = date.slice(5, 7);
    if (month === '11') {
      let dayString = date.slice(8, 10);
      const day = parseInt(dayString);

      return treeData.map((branch) => {
        return { ...branch, active: branch.day <= day };
      });
    }

    return treeData;
  };

  const getBranchContent = (branch) => {
    return (
      <Row
        active={branch.active && branch.day > 0}
        onClick={() => {
          setShowQuestion(true);
          setDay(branch.day);
        }}
      >
        <td>{branch.ornament}</td>
        <td>{branch.day > 0 ? branch.day : ''}</td>
      </Row>
    );
  };
  return (
    <div style={{ width: '950px', margin: '20px 0 0 40px' }}>
      {getTreeData().map((branch, i) => (
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
