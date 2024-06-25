// TODO Fix: You could also use Array.map to render the items, but it will not be as performant as using the items and columns prop.
import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Save, SaveAll, Download, Copy } from 'lucide-react';
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
          <Button
            isIconOnly
            onClick={() => handleSaveAllLinks()}
            className="bg-cadet-grey"
          >
            <SaveAll />
          </Button>
          <Table aria-label="Debrid Results" className="text-cadet-grey">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn className="text-rich-black" key={column.key}>
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={debridResult.map((item, index) => ({
                ...item,
                no: index + 1,
                action: "Save",
              }))}
            >
              {(item) => (
                <TableRow key={item.no}>
                  {(columnKey) => (
                    <TableCell>
                      {columnKey === "action" ? (
                        <Button
                          isIconOnly
                          onClick={() => saveLinks([item.link])}
                          className="bg-cadet-grey"
                        >
                          <Save />
                        </Button>
                      ) : columnKey === "debridedLink" ? (
                        <a href={getKeyValue(item, columnKey)}>
                          {getKeyValue(item, columnKey)}
                        </a>
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