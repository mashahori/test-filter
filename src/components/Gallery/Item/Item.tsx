import { Button } from '@mui/material';
import { MouseEvent } from 'react';

interface IItemProps {
  url: string;
  thumbnailUrl: string;
  albumId: string;
  onDelete: (e: MouseEvent<HTMLButtonElement>) => void;
  onClick: () => void;
}

export const Item = (props: IItemProps) => {
  const { url, thumbnailUrl, albumId, onDelete, onClick } = props;
  return (
    <>
      <span>albumId: {albumId}</span>
      <img src={thumbnailUrl} alt='some pic' data-url={url} onClick={onClick} />
      <Button onClick={onDelete}>Delete</Button>
    </>
  );
};

// const List = styled.ul`
//   list-style: none;
//   margin: 0;
//   padding: 0;
//   display: grid;
//   grid-template-columns: repeat(8, 1fr);
//   grid-gap: 20px;
//   padding: 40px
// `;

// const Select = styled(MuiSelect)`
//   width: 200px;
// `;