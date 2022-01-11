import React from 'react';
import { Button, Select as MuiSelect, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemAction, sortByAlbumIdAction } from '../../store/actions';

interface IItemProps {
  id: string;
  url: string;
  thumbnailUrl: string;
  albumId: string;
  onClick: () => void;
}

export const Item = (props: IItemProps) => {
  const { id, url, thumbnailUrl, albumId, onClick  } = props;
  const dispatch = useDispatch();
  return (
    <li key={id}>
      <span>albumId: {albumId}</span>
      <img src={thumbnailUrl} alt='some pic' data-url={url} onClick={onClick} />
      <Button onClick={() => dispatch(deleteItemAction(id))}>Delete</Button>
    </li>
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