import { Tooltip } from '@nextui-org/react';
import { CommonTable, ActionButton } from '..';
import { useSaveLinks } from '../../hooks';
import { copyToClipboard, exportLinksAsTxt, downloadAllLinks } from '../../utils';
import { Save, SaveAll, Download, Copy, FileDown, HardDriveDownload } from 'lucide-react';


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
    { key: "actions", label: "Actions" },
  ];
  
  return (
    <>
      {debridResult.length > 0 && (
        <>
          <div className="flex items-center gap-2.5">
            <ActionButton tooltipContent="Download All" onClick={() => downloadAllLinks(debridResult)} icon={HardDriveDownload} />
            <ActionButton tooltipContent="Save all on AD" onClick={handleSaveAllLinks} icon={SaveAll} />
            <ActionButton tooltipContent="Export .txt" onClick={() => exportLinksAsTxt(debridResult)} icon={FileDown} />
          </div>
          <CommonTable
            columns={columns}
            items={debridResult.map((item, index) => ({
              ...item,
              no: index + 1,
            }))}
            renderCell={(item, columnKey) => {
              if (columnKey === "actions") {
                return (
                  <div className="flex items-center gap-2.5">
                    <ActionButton tooltipContent="Download" onClick={() => window.open(item.debridedLink)} icon={Download} />
                    <ActionButton tooltipContent="Save on AD" onClick={() => saveLinks([item.link])} icon={Save} />
                    <ActionButton tooltipContent="Copy Link" onClick={() => copyToClipboard(item.debridedLink)} icon={Copy} />
                  </div>
                );
              } else if (columnKey === "filename") {
                return (
                  <Tooltip content={item.filename} color="foreground" showArrow={true}>
                    <span className="truncate max-w-sm block">{item.filename}</span>
                  </Tooltip>
                );
              } else if (columnKey === "debridedLink") {
                return (
                  <a href={item.debridedLink} target="_blank" rel="noopener noreferrer" className="block truncate max-w-xs">
                    {item.debridedLink}
                  </a>
                );
              } else {
                return item[columnKey];
              }
            }}
          />
        </>
      )}
    </>
  );
}

export default DebridResultTable;
