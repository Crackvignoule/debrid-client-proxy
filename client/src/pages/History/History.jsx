import { useState } from 'react';
import { Pagination, Tooltip } from "@nextui-org/react";
import { useLinkManagement } from '@hooks';
import { SearchBar, CommonTable, ActionButton } from '@components';
import { Download, Save, Copy } from 'lucide-react';
import { copyToClipboard } from '@utils';

function History() {
  const { history, saveLinks } = useLinkManagement();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const columns = [
    { key: "filename", label: "Filename" },
    { key: "link_dl", label: "Debrided Link" },
    { key: "actions", label: "Actions" },
  ];

  // Filter history based on the search query before slicing for pagination
  const filteredHistory = history.filter(item => 
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => setCurrentPage(page);

  // Update the search query state on input change
  const handleSearchChange = (e) => {
    setSearchQuery(e);
    setCurrentPage(1); // Reset to the first page to show filtered results from the beginning
  };

  return (
    <div>
      <SearchBar
        placeholder="Search History"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {history.length > 0 ? (
        <>
          <CommonTable
            columns={columns}
            items={currentItems.map((item, index) => ({
              ...item,
              no: indexOfFirstItem + index + 1,
            }))}
            renderCell={(item, columnKey) => {
              switch (columnKey) {
                case "filename":
                  return (
                    <Tooltip content={item.filename} color="foreground" showArrow={true}>
                      <span className="truncate max-w-sm block">{item.filename}</span>
                    </Tooltip>
                  );
                case "link_dl":
                  return (
                    <a href={item.link_dl} target="_blank" rel="noopener noreferrer" className="block truncate max-w-xs">
                      {item.link_dl}
                    </a>
                  );
                case "actions":
                  return (
                    <div className="flex items-center gap-2.5">
                      <ActionButton
                        tooltipContent="Download"
                        onClick={() => window.open(item.link_dl)}
                        icon={Download}
                      />
                      <ActionButton
                        tooltipContent="Save on AD"
                        onClick={() => saveLinks([item.link])}
                        icon={Save}
                      />
                      <ActionButton
                        tooltipContent="Copy Link"
                        onClick={() => copyToClipboard(item.link_dl)}
                        icon={Copy}
                      />
                    </div>
                  );
                default:
                  return item[columnKey];
              }
            }}
          />
          <Pagination total={Math.ceil(filteredHistory.length / itemsPerPage)} initialPage={1} onChange={handlePageChange} />
        </>
      ) : (
        <p>No history available. You HAVE to enable history links logging in your account settings before seeing any links being saved in this recent history. Recent link logging is disabled by default.</p>
      )}
    </div>
  );
}

export default History;