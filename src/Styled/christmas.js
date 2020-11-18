import styled from 'styled-components';

export const Branch = styled.div`
  color: ${(props) => (props.active ? '#cccccc' : '#666666')};
`;
