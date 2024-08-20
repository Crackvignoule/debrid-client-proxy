import { useState } from 'react';

const usePaginationAndSearch = (items, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter(item =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleSearchChange = (e) => {
    setSearchQuery(e);
    setCurrentPage(1);
  };

  return {
    currentItems,
    handlePageChange,
    handleSearchChange,
    searchQuery,
    totalPages: Math.ceil(filteredItems.length / itemsPerPage),
  };
};

export default usePaginationAndSearch;