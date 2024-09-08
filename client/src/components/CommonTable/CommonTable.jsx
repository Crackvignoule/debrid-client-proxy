import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import './CommonTable.scss';

function CommonTable({ columns, items, renderCell }) {
  return (
    <Table aria-label="Results Table" className="text-cadet-grey">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn className={`text-rich-black ${column.class}`} key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.no}>
            {(columnKey) => (
              <TableCell>
                {renderCell ? renderCell(item, columnKey) : item[columnKey]}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default CommonTable;