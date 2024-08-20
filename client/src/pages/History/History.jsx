// TODO Implement history with copy debrided link button and save all links button (+export to file)
import { useLinkManagement } from '@hooks';
import { DebridResultTable } from "@components";

function History() {
  const { history } = useLinkManagement();

  return (
    <div>
      {history.length > 0 ? (
        <DebridResultTable debridResult={history} />
      ) : (
        <p>No history available. You HAVE to enable history links loggging in your account settings before seeing any links being saved in this recent history. Recent link logging is disabled by default.</p>
      )}
    </div>
  );
}

export default History;