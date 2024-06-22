import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Save } from 'lucide-react';
import { useSaveLinks } from '../../hooks';

function DebridResultTable({ debridResult }) {
  const { saveLinks } = useSaveLinks();

  const handleSaveAllLinks = () => {
    const allLinks = debridResult.map(item => item.link);
    saveLinks(allLinks);
  };

  const columns = [
    { key: "no", label: "No." },
    { key: "filename", label: "Filename" },
    { key: "debridedLink", label: "Debrided Link" },
    { key: "action", label: "Action" },
  ];

  return (
    <>
      {debridResult.length > 0 && (
        <>
          <button onClick={handleSaveAllLinks}>Save All Links</button>
          <Table aria-label="Debrid Results">
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={debridResult.map((item, index) => ({ ...item, no: index + 1, action: "Save" }))}>
              {(item) => (
                <TableRow key={item.no}>
                  {(columnKey) => (
                    <TableCell>
                      {columnKey === "action" ? (
                        <Button auto size="mini" icon={<Save />} onClick={() => saveLinks([item.link])}>
                          Save
                        </Button>
                      ) : columnKey === "debridedLink" ? (
                        <a href={getKeyValue(item, columnKey)}>{getKeyValue(item, columnKey)}</a>
                      ) : (
                        getKeyValue(item, columnKey)
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
}

export default DebridResultTable;