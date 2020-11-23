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

export const Group = styled.div`
  margin-top: 30px;
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
  margin: 25px 35px 0 150px;
  display: flex;
  align-items: center;
  flex-direction: column;
  outline: none;
  minwidth: '930px';
  ${(props) => props.height && `height: ${props.height}px`};
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  outline: none;
  ${(props) => props.height && `height: ${props.height}px`};
`;

export const FlexInputContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  color: ${(props) => (props.color ? props.color : Colours.lightGrey)};
  flex-wrap: wrap;
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

export const TimerContainer = styled.h2`
  color: ${Colours.green};
`;

export const LeftCell = styled.td`
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RightCell = styled.td`
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 15%;
`;

export const RightHeader = styled.th`
  text-align: right;
  width: 15%;
`;
