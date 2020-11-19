import styled from 'styled-components';
import { Colours } from './defaults';

export const Branch = styled.div`
  color: ${(props) => (props.active ? Colours.lightGrey : Colours.grey)};
`;
export const LeaderboardHeader = styled.h1`
  color: ${Colours.lightGrey};
`;
export const Ornament = styled.span`
  color: ${(props) => (props.color ? props.color : 'white')};
  text-shadow: ${(props) => (props.textShadow ? '0 0 5px' : '')};
`;
