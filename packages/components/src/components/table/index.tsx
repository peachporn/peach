import { FunctionalComponent, h } from 'preact';

export type TableProps = {};

export const Table: FunctionalComponent<TableProps> = ({ children }) => (
  <table className="table">{children}</table>
);

export const TableRow: FunctionalComponent = ({ children }) => (
  <tr className="tablerow">{children}</tr>
);

export const TableCell: FunctionalComponent = ({ children }) => (
  <td className="tablecell">{children}</td>
);
