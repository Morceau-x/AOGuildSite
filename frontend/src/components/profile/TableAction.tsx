import * as React from 'react';
import { Action, MaterialTableProps, MTableAction } from 'material-table';

export default function TableAction<RowData extends object>(props: Action<RowData>) {
    return <MTableAction {...props} />;
}
