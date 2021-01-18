import { FunctionalComponent, h } from 'preact';

export type TableProps = {
  borders?: boolean;
};

export const Table: FunctionalComponent<TableProps> = ({ borders, children }) => (
  <table className={`table ${borders ? 'table--borders' : ''}`}>{children}</table>
);

export const TableRow: FunctionalComponent = ({ children }) => (
  <tr className="tablerow">{children}</tr>
);

export const TableCell: FunctionalComponent = ({ children }) => (
  <td className="tablecell">{children}</td>
);
