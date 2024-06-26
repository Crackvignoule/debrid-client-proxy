import { useState } from 'react';
import { Tooltip, Pagination } from "@nextui-org/react";
import { useFetchLinks } from '../../hooks';
import { CommonTable } from '../../components';

function SavedLinks() {
  const { links } = useFetchLinks();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const columns = [
    { key: "filename", label: "Filename" },
    { key: "actions", label: "Actions" },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = links.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <>
      <CommonTable
        columns={columns}
        items={currentItems.map((item, index) => ({
          ...item,
          no: indexOfFirstItem + index + 1,
        }))}
        renderCell={(item, columnKey) => {
          if (columnKey === "filename") {
            return (
              <Tooltip content={item.filename} color="foreground" showArrow={true}>
                <span className="truncate max-w-sm block">{item.filename}</span>
              </Tooltip>
            );
          } else {
            return item[columnKey];
          }
        }}
      />
      <Pagination total={Math.ceil(links.length / itemsPerPage)} initialPage={1} onChange={handlePageChange} />
    </>
  );
}

export default SavedLinks;
