import { Table } from '@nextui-org/react';
import { useFetchLinks } from '../../hooks'; // Adjust the import path as necessary

function SavedLinks() {
  const { links } = useFetchLinks();
  const columns = [
    { key: "filename", label: "Filename" },
  ];

  return (
    <>
      <h1>Saved Links</h1>
      {/* TODO FIX DISPLAY */}
      {/* {links && columns && <Table data={links} columns={columns} />} */}
    </>
  );
}

export default SavedLinks;