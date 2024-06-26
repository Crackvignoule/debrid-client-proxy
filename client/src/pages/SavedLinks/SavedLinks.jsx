import { Table } from '@nextui-org/react';
import { useFetchLinks } from '../../hooks'; // Adjust the import path as necessary

function SavedLinks() {
  const { links } = useFetchLinks();
  const columns = [
    { key: "filename", label: "Filename" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <>
      <Table aria-label="Debrid Results" className="text-cadet-grey">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn className="text-rich-black" key={column.key}>
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={debridResult.map((item, index) => ({
                ...item,
                no: index + 1,
                action: "Save", // TODO useless ?
              }))}
            >
              {(item) => (
                <TableRow key={item.no}>
                  {(columnKey) => (
                    <TableCell>
                      {columnKey === "actions" ? (
                        <div className="flex items-center gap-2.5">
                        </div>
                      ) : columnKey === "filename" ? (
                        <Tooltip content={item.filename} color="foreground" showArrow={true}>
                          <span className="truncate max-w-sm block">{item.filename}</span>
                        </Tooltip>
                      ) : (
                        item[columnKey]
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
    </>
  );
}

export default SavedLinks;
