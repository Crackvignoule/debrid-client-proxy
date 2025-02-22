import { Tooltip, Progress } from '@nextui-org/react';
import { CommonTable, ActionButton } from '@components';
import { useLinkManagement, useWindowResize } from '@hooks';
import { copyToClipboard, exportLinksAsTxt, downloadAllLinks } from '@utils';
import { Save, SaveAll, Download, Copy, FileDown, HardDriveDownload } from 'lucide-react';

function DebridResultTable({ debridResult, debridProgress }) {
  const { saveLinks } = useLinkManagement();
  const isSmallScreen = useWindowResize();

  const handleSaveAllLinks = () => {
    const allLinks = debridResult.map(item => item.link);
    saveLinks(allLinks);
  };

  const columns = [
    !isSmallScreen && { key: "no", label: "No." },
    { key: "filename", label: "Filename" },
    !isSmallScreen && { key: "link_dl", label: "Debrided Link" },
    { key: "actions", label: "Actions" },
  ].filter(Boolean);

  return (
    <>
      {debridProgress.total > 0 && debridProgress.current < debridProgress.total && (
        <Progress
          size="md"
          radius="md"
          classNames={{
            base: "max-w-md",
            track: "drop-shadow-md",
            indicator: "bg-gradient-to-r from-indigo-500 from-20% via-cerulean via-50% to-turquoise to-90%",
            label: "tracking-wider font-medium text-cadet-grey",
            value: "text-cadet-grey",
          }}
          value={(debridProgress.current / debridProgress.total) * 100}
          label={`${Math.round((debridProgress.current / debridProgress.total) * 100)}% (${debridProgress.current}/${debridProgress.total} files)`}
        />
      )}
      {debridResult.length > 0 && (
        <>
          <div className="flex items-center justify-center gap-2.5">
            <ActionButton tooltipContent="Download All" onClick={() => downloadAllLinks(debridResult)} icon={HardDriveDownload} />
            <ActionButton tooltipContent="Save all on AD" onClick={handleSaveAllLinks} icon={SaveAll} />
            <ActionButton tooltipContent="Export .txt" onClick={() => exportLinksAsTxt(debridResult)} icon={FileDown} />
          </div>
          <CommonTable
            columns={columns}
            items={debridResult.map((item, index) => ({
              ...item,
              no: index,
            }))}
            renderCell={(item, columnKey) => {
              switch (columnKey) {
                case "actions":
                  return (
                    <div className="flex items-center gap-2.5">
                      <ActionButton tooltipContent="Download" onClick={() => window.open(item.link_dl)} icon={Download} />
                      <ActionButton tooltipContent="Save on AD" onClick={() => saveLinks([item.link])} icon={Save} />
                      <ActionButton tooltipContent="Copy Link" onClick={() => copyToClipboard(item.link_dl)} icon={Copy} />
                    </div>
                  );
                case "filename":
                  return (
                    <Tooltip content={item.filename} color="foreground" showArrow={true}>
                      <span className="truncate max-w-sm block" id="fname">{item.filename}</span>
                    </Tooltip>
                  );
                case "link_dl":
                  return (
                    <a href={item.link_dl} target="_blank" rel="noopener noreferrer" className="block truncate max-w-xs">
                      {item.link_dl}
                    </a>
                  );
                default:
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