import styled from 'styled-components';

export const Colours = {
  green: '#009900',
  lightGreen: '#99ff99',
  background: '#0f0f23',
  lightGrey: '#cccccc',
  grey: '#666666',
  almostBlack: '#10101a',
  orange: '#ff9900',
  yellow: '#ffff66',
  blue: '#0066ff',
  red: '#ff0000',
};

export const Body = styled.div`
  text-align: center;
  color: #666666;
`;

export const Header = styled.header`
  margin: 25px 20px 0 20px;

  justify-content: space-between;
  display: flex;
  font-size: calc(10px + 1.5vmin);
  text-decoration: none;
  color: ${Colours.lightGrey};
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

export const ContainerCenter = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
  width: 160px;
`;

export const Image = styled.img`
  margin-right: 12px;
  width: 42px;
  height: 42px;
`;
