import styled from 'styled-components';
import { Colours } from './defaults';

export const Branch = styled.div`
  color: ${(props) => (props.active ? Colours.lightGrey : Colours.grey)};
`;
