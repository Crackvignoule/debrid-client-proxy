// TODO Refactor
import { useState } from 'react';
import { Pagination } from "@nextui-org/react";
import { useLinkManagement } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { CommonTable, ActionButton } from '../../components';
import { Download, Trash2 } from 'lucide-react';

function SavedLinks() {
  const navigate = useNavigate();
  const { links, deleteLinks } = useLinkManagement();
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

  const handleDebridClick = (link) => {
    navigate('/', { state: { link } });
  };

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
            return <>{item.filename}</>;
          } else if (columnKey === "actions") {
            return (
              <div className="flex items-center gap-2.5">
                <ActionButton
                  tooltipContent="Debrid"
                  onClick={() => handleDebridClick(item.link)}
                  icon={Download}
                />
                <ActionButton
                  tooltipContent="Delete"
                  onClick={() => deleteLinks(item.link)}
                  icon={Trash2}
                />
              </div>
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
