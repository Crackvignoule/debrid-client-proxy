import { useState, useEffect } from 'react';
import { getLiveStatus } from '../api/debrid';

function useLiveStatus() {
  const [sessionId] = useState(Math.floor(Math.random() * 10000));
  const [counter, setCounter] = useState(0);
  const [magnets, setMagnets] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      const { magnets: newMagnets, nextCounter, fullsync } = await getLiveStatus(sessionId, counter);
      if (fullsync) {
        setMagnets(newMagnets);
      } else {
        // Apply diffs
        const updatedMagnets = magnets.map(magnet => {
          const update = newMagnets.find(m => m.id === magnet.id);
          return update ? { ...magnet, ...update } : magnet;
        });
        setMagnets(updatedMagnets);
      }
      setCounter(nextCounter);
    };

    fetchStatus();
  }, [counter, sessionId, magnets]);

  return { magnets };
}

export default useLiveStatus;