import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export interface GenericRow {
    id: number;
    [key: string]: any;
}

export interface ColumnConfig {
    label: string;
    accessor: keyof GenericRow;  
    className?: string;
    render?: (value: any, row: GenericRow) => React.ReactNode; 
}

interface TableCustomProps {
    data: GenericRow[];
    columns: ColumnConfig[];
}

export function TableCustom({ data, columns }: TableCustomProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((col, i) => (
                        <TableHead key={i} className={col.className}>
                            {col.label}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((row, rowIndex) => (
                    <TableRow key={row.id ?? rowIndex}>
                        {columns.map((col, colIndex) => (
                            <TableCell key={colIndex} className={col.className}>
                                {col.render
                                    ? col.render(row[col.accessor], row)
                                    : row[col.accessor]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
