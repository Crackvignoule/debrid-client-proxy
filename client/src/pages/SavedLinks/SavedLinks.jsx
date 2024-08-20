// TODO Refactor
// TODO Add multi select delete (add confirmation prompt) & debrid
import { useState } from 'react';
import { Pagination } from "@nextui-org/react";
import { useLinkManagement, usePaginationAndSearch } from '@hooks';
import { useNavigate } from 'react-router-dom';
import { SearchBar, CommonTable, ActionButton } from '@components';
import { Download, Trash2 } from 'lucide-react';

function SavedLinks() {
  const navigate = useNavigate();
  const { links, deleteLinks } = useLinkManagement();
  const itemsPerPage = 10;

  const columns = [
    { key: "filename", label: "Filename" },
    { key: "actions", label: "Actions" },
  ];

  const {
    currentItems,
    handlePageChange,
    handleSearchChange,
    searchQuery,
    totalPages,
  } = usePaginationAndSearch(links, itemsPerPage);

  const handleDebridClick = (link) => {
    navigate('/', { state: { link } });
  };

  return (
    <>
      <SearchBar
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <CommonTable
        columns={columns}
        items={currentItems.map((item, index) => ({
          ...item,
          no: index + 1,
        }))}
        renderCell={(item, columnKey) => {
          switch (columnKey) {
            case "actions":
              return (
                <div className="flex items-center gap-2.5">
                  <ActionButton
                    tooltipContent="Debrid"
                    onClick={() => handleDebridClick(item.link)}
                    icon={Download}
                  />
                  <ActionButton
                    tooltipContent="Delete"
                    className="bg-red-600"
                    tooltipColor="danger"
                    onClick={() => deleteLinks(item.link)}
                    icon={Trash2}
                  />
                </div>
              );
            default:
              return item[columnKey];
          }
        }}
      />
      <Pagination total={totalPages} initialPage={1} onChange={handlePageChange} />
    </>
  );
}

export default SavedLinks;
