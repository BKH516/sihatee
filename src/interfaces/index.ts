export interface IService {
    id: number;
    name: string;
    price: number;
    duration_minutes: number
}

export interface GenericRow {
    id: number | string;
    [key: string]: any;
}

export interface ColumnConfig {
    label: string;
    accessor: string;
    className?: string;
    render?: (value: any, row: GenericRow) => React.ReactNode;
}
