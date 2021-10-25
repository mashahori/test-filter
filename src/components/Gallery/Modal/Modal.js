import { Backdrop, Fade } from '@mui/material';
import { Paper, Card, Close, Wrapper } from './styles';
import { ReactComponent as CloseIcon } from '../../../assets/close.svg';

export const Modal = ({ url, open, setOpen }) => {
  return (
    <Paper
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Wrapper>
          <Card raised>
            <img src={url} alt='my album' />
          </Card>
          <Close onClick={() => setOpen(false)}>
            <CloseIcon />
          </Close>
        </Wrapper>
      </Fade>
    </Paper>
  );
};
