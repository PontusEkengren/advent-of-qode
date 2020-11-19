import './App.css';
import { Header, Body } from './Styled/defaults';
import Tree from './Tree.js';
import LeaderBoard from './LeaderBoard';

function App() {
  return (
    <>
      <Header>
        <p>Advent of Qode</p>
      </Header>
      <Body>
        <Tree />
        <LeaderBoard />
      </Body>
    </>
  );
}

export default App;
