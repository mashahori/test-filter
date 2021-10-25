import styled from 'styled-components/macro';
import { Modal, Card as MuiCard, IconButton } from '@mui/material';

export const Paper = styled(Modal)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Card = styled(MuiCard)`
  &.MuiCard-root {
    padding: 40px;
    position: relative;
  }
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const Close = styled(IconButton)`
  && {
    background-color: #fff;
    border-radius: 50%;
    padding: 13px;
    position: absolute;
    top: -20px;
    right: -20px;
    z-index: 100;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #fff;
    }
  }
`;
