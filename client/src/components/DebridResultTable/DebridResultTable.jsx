// TODO Refactor
// TODO Download all button ? open all links in new tab
// TODO Copy All button ? copy all links to clipboard
// TODO add nextui tooltip to buttons
import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Button, Tooltip } from "@nextui-org/react";
import { Save, SaveAll, Download, Copy, FileDown, HardDriveDownload } from 'lucide-react';
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
    const allLinks = debridResult.map(item => item.debridedLink).join('\n');
    const blob = new Blob([allLinks], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'debrided_links.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const downloadAllLinks = () => {
    // Bypass browser popup blocker by opening links in iframes
    debridResult.forEach((item, index) => {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none'; // Make the iframe invisible
        iframe.src = item.debridedLink;
        iframe.id = `downloadIframe-${index}`;
        document.body.appendChild(iframe);
        // Optional: Remove the iframe after a delay to clean up
        // setTimeout(() => {
        //     document.body.removeChild(iframe);
        // }, 1000); // Adjust delay as needed
    });
    toast.success('All links are being opened');
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
            <Tooltip color="foreground" showArrow={true} content="Download All">
              <Button
                isIconOnly
                onClick={downloadAllLinks}
                className="bg-cadet-grey"
              >
                <HardDriveDownload />
              </Button>
            </Tooltip>
            <Tooltip
              color="foreground"
              showArrow={true}
              content="Save all on AD"
            >
              <Button
                isIconOnly
                onClick={handleSaveAllLinks}
                className="bg-cadet-grey"
              >
                <SaveAll />
              </Button>
            </Tooltip>
            <Tooltip color="foreground" showArrow={true} content="Export .txt">
              <Button
                isIconOnly
                onClick={exportLinksAsTxt}
                className="bg-cadet-grey"
              >
                <FileDown />
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
                          <Tooltip
                            color="foreground"
                            offset={0}
                            content="Download"
                          >
                            <Button
                              isIconOnly
                              onClick={() => window.open(item.debridedLink)}
                              className="bg-cadet-grey"
                            >
                              <Download />
                            </Button>
                          </Tooltip>
                          <Tooltip
                            color="foreground"
                            offset={0}
                            content="Save on AD"
                          >
                            <Button
                              isIconOnly
                              onClick={() => saveLinks([item.link])}
                              className="bg-cadet-grey"
                            >
                              <Save />
                            </Button>
                          </Tooltip>
                          <Tooltip
                            color="foreground"
                            offset={0}
                            content="Copy Link"
                          >
                            <Button
                              isIconOnly
                              onClick={() => copyToClipboard(item.debridedLink)}
                              className="bg-cadet-grey"
                            >
                              <Copy />
                            </Button>
                          </Tooltip>
                        </div>
                      ) : columnKey === "filename" ? (
                        <Tooltip content={item.filename} color="foreground" showArrow={true}>
                          <span className="truncate max-w-sm block">{item.filename}</span>
                        </Tooltip>
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