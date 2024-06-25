// TODO Refactor
import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Save, SaveAll, Download, Copy } from 'lucide-react';
import { useSaveLinks } from '../../hooks';
import { toast } from 'react-hot-toast';

function DebridResultTable({ debridResult }) {
  const { saveLinks } = useSaveLinks();

  const handleSaveAllLinks = () => {
    const allLinks = debridResult.map(item => item.link);
    saveLinks(allLinks);
  };

  // Function to copy link to clipboard
  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      toast.success('Link copied to clipboard 👌');
    })
  };

  const columns = [
    { key: "no", label: "No." },
    { key: "filename", label: "Filename" },
    { key: "debridedLink", label: "Debrided Link" },
    { key: "actions", label: "Actions" },
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
                      {columnKey === "actions" ? (
                        <div className="flex items-center gap-2.5">
                          <Button
                            isIconOnly
                            onClick={() => saveLinks([item.link])}
                            className="bg-cadet-grey"
                          >
                            <Save />
                          </Button>
                          <Button
                            isIconOnly
                            onClick={() => copyToClipboard(item.link)}
                            className="bg-cadet-grey"
                          >
                            <Copy />
                          </Button>
                        </div>
                      ) : columnKey === "debridedLink" ? (
                        <a
                          href={item.debridedLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block truncate max-w-xs"
                        >
                          {item.debridedLink}
                        </a>
                      ) : (
                        item[columnKey]
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