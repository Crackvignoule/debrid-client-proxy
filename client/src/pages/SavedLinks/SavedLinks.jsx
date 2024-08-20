// TODO Refactor
// TODO Add multi select delete (add confirmation prompt) & debrid
import { useState } from 'react';
import { Pagination } from "@nextui-org/react";
import { useLinkManagement } from '@hooks';
import { useNavigate } from 'react-router-dom';
import { SearchBar, CommonTable, ActionButton } from '@components';
import { Download, Trash2 } from 'lucide-react';

function SavedLinks() {
  const navigate = useNavigate();
  const { links, deleteLinks } = useLinkManagement();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
  const itemsPerPage = 10;

  const columns = [
    { key: "filename", label: "Filename" },
    { key: "actions", label: "Actions" },
  ];

  // Filter links based on the search query before slicing for pagination
  const filteredLinks = links.filter(link => 
    link.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLinks.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleDebridClick = (link) => {
    navigate('/', { state: { link } });
  };

  // Update the search query state on input change
  const handleSearchChange = (e) => {
    setSearchQuery(e);
    setCurrentPage(1); // Reset to the first page to show filtered results from the beginning
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
          no: indexOfFirstItem + index + 1,
        }))}
        renderCell={(item, columnKey) => {
          switch (columnKey) {
            case "filename":
              return item.filename;
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
      <Pagination total={Math.ceil(links.length / itemsPerPage)} initialPage={1} onChange={handlePageChange} />
    </>
  );
}

export default SavedLinks;
