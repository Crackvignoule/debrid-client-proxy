import React from 'react';

function DebridResultTable({ debridResult }) {
  return (
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Filename</th>
          <th>Debrided Link</th>
        </tr>
      </thead>
      <tbody>
        {debridResult.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.filename}</td>
            <td>
              <a href={item.debridedLink.data.link}>
                {item.debridedLink.data.link}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DebridResultTable;