import React from 'react';
import { useSaveLinks } from '../../hooks';
import './DebridResultTable.scss';

function DebridResultTable({ debridResult }) {
  const { saveLinks } = useSaveLinks();

  // TODO Fix header appearing when there is no result
  const handleSaveAllLinks = () => {
    const allLinks = debridResult.map(item => item.link);
    saveLinks(allLinks);
  };

  return (
    <>
      <button onClick={handleSaveAllLinks}>Save All Links</button>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Filename</th>
            <th>Debrided Link</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {debridResult.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.filename}</td>
              <td>
                <a href={item.debridedLink}>
                  {item.debridedLink}
                </a>
              </td>
              <td>
                <button onClick={() => saveLinks([item.link])}>
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DebridResultTable;