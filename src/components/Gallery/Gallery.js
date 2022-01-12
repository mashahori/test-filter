import { useState, useMemo } from 'react';
import styled from 'styled-components/macro';
import { Modal } from './Modal';
import { Pagination } from './Pagination';
import { Button, Select as MuiSelect, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemAction, sortByAlbumIdAction } from '../../store/actions';
import { setAlbumId } from '../../utils/albumId';
import { observer } from 'mobx-react';

export const Gallery = observer(( { store }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rows, setRows] = useState(10);

  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const data = useSelector(state => filter ? state.sortedItems : state.items);
  const options = setAlbumId();

  const currentTableData = useMemo(() => {
    const firstPageIndex = currentPage * rows;
    const lastPageIndex = firstPageIndex + rows;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data, rows]);
    

  const handleOpen = (event) => {
    const target = event.target.closest('img');
    if (!target) return;
    setUrl(target.dataset.url);
    setOpen(true);
  };

  const handleChangeFilter = (event) => {
    setCurrentPage(1);
    dispatch(sortByAlbumIdAction(event.target.value));
  };

  return (
    <>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={filter}
      label="Filter"
      onChange={handleChangeFilter}
    >
      <MenuItem key="no-filter" value=''>No filter</MenuItem>
      {options.map((el) => (
        <MenuItem key={el} value={el}>{`Album Id ${el}`}</MenuItem>
      ))}
    </Select>
      <List>
        {currentTableData.map(({ id, url, thumbnailUrl, albumId }) => (
          <li key={id}>
            <span>albumId: {albumId}</span>
            <img src={thumbnailUrl} alt='some pic' data-url={url} onClick={handleOpen} />
            <Button onClick={() => dispatch(deleteItemAction(id))}>Delete</Button>
          </li>
        ))}
      </List>
      <Pagination
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={rows}
        onPageChange={(event,page) => setCurrentPage(page)}
        onRowsPerPageChange={(event) => setRows(event.target.value)}
      />
      <Modal url={url} open={open} setOpen={setOpen} />
    </>
  );
});

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 20px;
  padding: 40px
`;

const Select = styled(MuiSelect)`
  width: 200px;
`;