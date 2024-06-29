import useLiveStatus from '../../hooks/useLiveStatus';
import { CommonTable, ActionButton } from '../../components';
import { Progress, Tooltip } from "@nextui-org/react";
import "./PendingTorrents.scss";
import { Trash2 } from 'lucide-react';

function PendingTorrents() {
  const { magnets } = useLiveStatus();

  const columns = [
    { key: 'eta', label: 'ETA', class: 'w-1/6'},
    { key: 'filename', label: 'Filename', class: 'w-1/4'},
    { key: 'progress', label: 'Progress', class: 'w-1/3'},
    { key: 'downloadSpeed', label: 'Speed', class: 'w-[12%]' },
    { key: 'size', label: 'Size', class: 'w-[12%]'},
    { key: 'peers', label: 'Peers' },
    { key: 'actions', label: 'Actions' },
  ];

  const items = magnets.filter(magnet => [0, 1, 2, 3].includes(magnet.statusCode)).map(magnet => ({
    ...magnet,
    eta: getStatusText(magnet.statusCode),
    downloaded: magnet.downloaded,
    size: magnet.size,
    peers: magnet.peers,
    downloadSpeed: magnet.downloadSpeed, // Assuming 'downloadSpeed' property exists
  }));

  function getStatusText(statusCode) {
    switch (statusCode) {
      case 0: return 'In Queue';
      case 1: return 'Downloading';
      case 2: return 'Compressing / Moving';
      case 3: return 'Uploading';
      default: return 'Unknown Status';
    }
  }

  const renderCell = (item, columnKey) => {
    let progressValue;
    switch (columnKey) {
      case 'filename':
        return (
          <Tooltip content={item.filename} color="foreground" showArrow={true}>
            <span className="truncate max-w-xs block">{item.filename}</span>
          </Tooltip>
        );
      case 'progress':
        progressValue = item.downloaded / item.size * 100;
        return (
          <Progress
            value={progressValue}
            isIndeterminate={isNaN(progressValue)}
            aria-label='Progress Bar'
            color="success"
            showValueLabel={true}
            classNames={{
              base: "max-w-md",
              track: "drop-shadow-md",
              indicator: "bg-gradient-to-r from-indigo-500 from-20% via-cerulean via-50% to-turquoise to-90%",
              label: "tracking-wider font-medium text-cadet-grey",
              value: "text-cadet-grey",
            }}
          />
        );
      case 'downloadSpeed':
        return `${(item.downloadSpeed / 10**6).toFixed(2)} MB/s`;
      case 'size':
        return `${(item.size / 10**6).toFixed(2)} MB`;
      case 'actions':
          return (
            <ActionButton
                  tooltipContent="Delete"
                  className="bg-red-600"
                  tooltipColor='danger'
                  onClick={() => console.log('Delete button clicked')}
                  icon={Trash2}
                />
          );
      default:
        return item[columnKey];
    }
  };
// TODO Use switch case instead of if-else
  return (
    <div>
      <CommonTable columns={columns} items={items} renderCell={renderCell} />
    </div>
  );
}

export default PendingTorrents;