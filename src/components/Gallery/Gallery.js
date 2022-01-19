import { useState, useMemo } from 'react';
import { Modal } from './Modal';
import { Pagination } from './Pagination';
import { Item } from './Item';
import {  MenuItem } from '@mui/material';
import { setAlbumId } from '../../utils/albumId';
import { observer } from 'mobx-react';
import { store } from '../../store/root';
import { List, Select } from './styles';

const options = setAlbumId();

export const Gallery = observer(() => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rows, setRows] = useState(10);

  const filter = store.filter;
  const data = filter ? store.sortedItems : store.items;

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
    store.setFilter(event.target.value);
    setCurrentPage(1);
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
            <Item 
              url={url}
              thumbnailUrl={thumbnailUrl}
              albumId={albumId}
              onClick={handleOpen}
              onDelete={() => store.deleteItem(id)}
            />
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
