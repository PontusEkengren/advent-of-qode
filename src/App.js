import './App.css';
import { Header, Body } from './Styled/defaults';
import Tree from './Tree.js';

function App() {
  return (
    <>
      <Header>
        <p>Advent of Qode</p>
      </Header>
      <Body>
        <Tree />
      </Body>
    </>
  );
}

export default App;
