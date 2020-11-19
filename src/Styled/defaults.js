import styled from 'styled-components';

export const Colours = {
  green: '#009900',
  lightGreen: '#99ff99',
  background: '#0f0f23',
  lightGrey: '#cccccc',
  grey: '#666666',
  almostBlack: '#10101a',
};

export const Body = styled.div`
  text-align: center;
  color: #666666;
`;

export const Header = styled.header`
  background-color: #0f0f23;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 1.5vmin);
  text-decoration: none;
  color: ${Colours.green};
  margin-left: 20px;
`;

export const Row = styled.tr`
  ${(props) =>
    props.active &&
    `&:hover {
    background-color: #1e1e46;
    background-color: rgba(119, 119, 165, 0.2);
    cursor: pointer;
  }`}
`;

export const Input = styled.input`
  margin-top: 15px;
  background: transparent;
  color: ${Colours.lightGrey};
  border: 1px solid ${Colours.grey};
  background: ${Colours.almostBlack};
  padding: 0 2px;
  font-family: inherit;
  font-size: inherit;
`;

export const Group = styled.div`
  margin-top: 20px;
  display: inherit;
  flex-direction: inherit;
`;

export const Button = styled.button`
  margin-top: 1px;
  height: 35px;
  border-radius: 3px;
  font-family: inherit;
  font-size: 18px;
  border: 0px solid DarkGreen;
  color: ${Colours.green};
  cursor: pointer;
  background: transparent;

  &:hover {
    color: ${Colours.lightGreen};
  }
`;

export const ContainerCenterColumn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  outline: none;
  ${(props) => props.height && `height: ${props.height}px`};
`;
