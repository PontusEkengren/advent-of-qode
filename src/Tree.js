import React from 'react';
import { Link } from './Styled/defaults';
import { Branch } from './Styled/christmas.js';
import { treeData } from './treeData.js';

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
    <tr>
      <td>{branch.active ? <Link href='http://google.se'>{branch.ornament}</Link> : branch.ornament}</td>
      <td>{branch.day > 0 ? branch.day : ''}</td>
    </tr>
  );
};

export default function Tree() {
  getTreeData();
  return (
    <div style={{ width: '950px', margin: '20px 0 0 40px' }}>
      {getTreeData().map((branch, i) => (
        <Branch active={branch.active} key={i}>
          <table>
            <tbody>{getBranchContent(branch)}</tbody>
          </table>
        </Branch>
      ))}
    </div>
  );
}
