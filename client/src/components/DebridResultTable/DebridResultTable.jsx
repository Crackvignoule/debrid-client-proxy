// TODO Refactor
// TODO Download all button ? open all links in new tab
// TODO Copy All button ? copy all links to clipboard
// TODO add nextui tooltip to buttons
import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { Button, Tooltip } from "@nextui-org/react";
import { Save, SaveAll, Download, Copy, FileDown } from 'lucide-react';
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

  const exportLinksAsTxt = () => {
    const allLinks = debridResult.map(item => item.link).join('\n');
    const blob = new Blob([allLinks], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'debrided_links.txt'; // Name of the file to be downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
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
          <div className="flex items-center gap-2.5">
            <Button
              isIconOnly
              onClick={() => handleSaveAllLinks()}
              className="bg-cadet-grey"
            >
              <SaveAll />
            </Button>
            <Tooltip showArrow={true} content="I am a tooltip">
            <Button
              isIconOnly
              onClick={exportLinksAsTxt}
              className="bg-cadet-grey"
            >
              <FileDown />{" "}
              {/* Assuming Download icon is appropriate for "Export" */}
            </Button>
            </Tooltip>
          </div>
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