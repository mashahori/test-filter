import styled from 'styled-components/macro';
import { Select as MuiSelect } from '@mui/material';

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 20px;
  padding: 40px;
`;

export const Select = styled(MuiSelect)`
  width: 200px;
`;