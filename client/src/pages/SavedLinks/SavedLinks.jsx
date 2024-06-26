import { Table } from '@nextui-org/react';
import { useFetchLinks } from '../../hooks'; // Adjust the import path as necessary

function SavedLinks() {
  const { links } = useFetchLinks();

  return (
    <div>
      <h1>Saved Links</h1>
      {/* console log links */}
      {console.log(links)}
      
      {/* <Table
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>ID</Table.Column>
          <Table.Column>Link</Table.Column>
        </Table.Header>
        <Table.Body>
          {links.map((link, index) => (
            <Table.Row key={index}>
              <Table.Cell>{link.id}</Table.Cell>
              <Table.Cell>{link.link}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table> */}
    </div>
  );
}

export default SavedLinks;