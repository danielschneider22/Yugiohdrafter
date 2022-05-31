import { GridOptions } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import type { NextPage } from 'next'
import { useState } from 'react';

const Login: NextPage = () => {
  const [columnDefs] = useState([
    { headerName: 'First Name', field: 'first_name' },
    { headerName: 'Last Name', field: 'last_name' },
    { headerName: 'Job Title', field: 'job_title' },
    { field: 'office' },
    { field: "email" },
    { field: "phone" }
  ]);

const [rowData, setRowData] = useState([]);

return (
  <div 
  className="ag-theme-alpine"
  style={{ height: '600px' }}
>
    <AgGridReact
      rowData={rowData}
      columnDefs={columnDefs}
    ></AgGridReact>
  </div>
);
}

export default Login
