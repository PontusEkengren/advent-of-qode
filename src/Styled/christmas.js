import styled from 'styled-components';
import { Colours } from './defaults';

export const Branch = styled.div`
  color: ${(props) => (props.active ? Colours.lightGrey : Colours.grey)};
`;

export const LeaderBoardRow = styled.tr`
  overflow: hidden;
  &:hover {
    background-color: #1e1e46;
    background-color: rgba(119, 119, 165, 0.2);
    cursor: pointer;
  }
`;

export const LeaderboardHeader = styled.h1`
  color: ${Colours.lightGrey};
`;
export const LeaderBoardContainer = styled.div`
  max-width: 600px;
  margin: 15px;
  color: ${Colours.lightGrey};
`;
export const Ornament = styled.span`
  color: ${(props) => (props.color ? props.color : 'white')};
  text-shadow: ${(props) => (props.textShadow ? '0 0 5px' : '')};
`;
export const Title = styled.span`
  margin-left: 20px;
  font-size: 25px;
  text-shadow: 0 0 5px;

  color: ${(props) => (props.color ? props.color : Colours.green)};
`;
