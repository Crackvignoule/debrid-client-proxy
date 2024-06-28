import useLiveStatus from '../../hooks/useLiveStatus';
import { CommonTable } from '../../components';
import { Progress } from "@nextui-org/react";
import "./PendingTorrents.scss";

function PendingTorrents() {
  const { magnets } = useLiveStatus();

  const columns = [
    { key: 'eta', label: 'ETA' },
    { key: 'filename', label: 'Filename', width: '15px' },
    { key: 'progress', label: 'Progress' },
    { key: 'downloaded', label: 'DL' },
    { key: 'size', label: 'Size' },
    { key: 'peers', label: 'Peers' },
  ];

  // Updated items mapping to include 'size' and 'peers'
  const items = magnets.filter(magnet => [0, 1, 2, 3].includes(magnet.statusCode)).map(magnet => ({
    ...magnet,
    eta: getStatusText(magnet.statusCode),
    downloaded: magnet.downloaded,
    size: magnet.size, // Added 'size' property
    peers: magnet.peers, // Added 'peers' property
  }));

  // Function to return status text based on status code
  function getStatusText(statusCode) {
    switch (statusCode) {
      case 0: return 'Processing - In Queue';
      case 1: return 'Processing - Downloading';
      case 2: return 'Processing - Compressing / Moving';
      case 3: return 'Processing - Uploading';
      default: return 'Unknown Status';
    }
  }

  // Custom renderCell function to handle different data rendering
  const renderCell = (item, columnKey) => {
    let progressValue;
    // Updated 'progress' case to handle NaN progressValue
switch (columnKey) {
  case 'progress':
    // Calculate progress as a percentage
    progressValue = item.downloaded / item.size * 100;
    if (isNaN(progressValue)) {
      return (
        <Progress
          isIndeterminate
          aria-label="Loading..."
          color="success"
          classNames={{
            base: "max-w-md",
            track: "drop-shadow-md",
            indicator: "bg-gradient-to-r from-indigo-500 from-20% via-cerulean via-50% to-turquoise to-90%",
            label: "tracking-wider font-medium text-cadet-grey",
            value: "text-cadet-grey",
          }}
        />
      );
    } else {
      return (
        <Progress
          value={progressValue}
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
    }
  default:
    return item[columnKey];
}}

  return (
    <div>
      <CommonTable columns={columns} items={items} renderCell={renderCell} />
    </div>
  );
}

export default PendingTorrents;