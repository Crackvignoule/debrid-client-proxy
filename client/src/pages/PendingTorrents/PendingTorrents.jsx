import useLiveStatus from '../../hooks/useLiveStatus';

function PendingTorrents() {
  const { magnets } = useLiveStatus();

  return (
    <div>
      <h1>Pending Torrents</h1>
      {magnets.map(magnet => (
        <div key={magnet.id}>
          {console.log(magnet)}
          ID: {magnet.id}, Downloaded: {magnet.downloaded}, Speed: {magnet.downloadSpeed}
        </div>
      ))}
    </div>
  );
}

export default PendingTorrents;