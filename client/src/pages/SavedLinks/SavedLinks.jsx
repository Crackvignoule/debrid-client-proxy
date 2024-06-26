import { useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Pagination } from "@nextui-org/react";
import { useFetchLinks } from '../../hooks'; // Adjust the import path as necessary

function SavedLinks() {
  const { links } = useFetchLinks();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust as needed

  const columns = [
    { key: "filename", label: "Filename" },
    { key: "actions", label: "Actions" },
  ];

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = links.slice(indexOfFirstItem, indexOfLastItem);

  // Change page handler
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <>
      <Table aria-label="Debrid Results" className="text-cadet-grey">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn className="text-rich-black" key={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={currentItems.map((item, index) => ({
            ...item,
            no: indexOfFirstItem + index + 1,
            action: "Save", // TODO: Review if this is necessary
          }))}
        >
          {(item) => (
            <TableRow key={item.no}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "actions" ? (
                    <div className="flex items-center gap-2.5">
                    </div>
                  ) : columnKey === "filename" ? (
                    <Tooltip content={item.filename} color="foreground" showArrow={true}>
                      <span className="truncate max-w-sm block">{item.filename}</span>
                    </Tooltip>
                  ) : (
                    item[columnKey]
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination total={Math.ceil(links.length / itemsPerPage)} initialPage={1} onChange={handlePageChange} />
    </>
  );
}

export default SavedLinks;