import React from 'react';
import { useSaveLink } from '../../hooks';
import './DebridResultTable.scss';

function DebridResultTable({ debridResult }) {
  const { saveLink } = useSaveLink();

  // TODO Fix header appearing when there is no result
  // TODO Add a button to save all links
  return (
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
              <button onClick={() => saveLink(item.link)}>
                Save
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DebridResultTable;