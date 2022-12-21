import React, { useState, useEffect } from 'react';
import './App.css'

export default function DataTable() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState({
    app_id: true,
    date: true,
    requests: true,
    responses: true,
    impressions: true,
    clicks: true,
    revenue: true,
  });

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://go-dev.greedygame.com/v3/dummy/report?startDate=2021-05-01&endDate=2021-05-03');
      const json = await response.json();
      setData(json.data);
      console.log(json.data);
    }
    fetchData();
  }, []);


  const rows = data.map(item => (
    
    <tr key={item.app_id}>
      <td style={{ display: columns.app_id ? 'table-cell' : 'none' }}>{item.app_id}</td>
      <td style={{ display: columns.date ? 'table-cell' : 'none' }}>{((item.date).slice(0,10))}</td>
      <td style={{ display: columns.requests ? 'table-cell' : 'none' }}>{item.requests}</td>
      <td style={{ display: columns.responses ? 'table-cell' : 'none' }}>{item.responses}</td>
      <td style={{ display: columns.clicks ? 'table-cell' : 'none' }}>{item.clicks}</td>
      <td style={{ display: columns.revenue ? 'table-cell' : 'none' }}>{"$"+(item.revenue).toFixed(2)}</td>
    </tr>
  ));

  // Render checkboxes to toggle column visibility
  const checkboxes = Object.keys(columns).map(key => (
    <label key={key} className='data'>
      <input
        type="checkbox"
        checked={columns[key]}
        onChange={() => {
          setColumns({
            ...columns,
            [key]: !columns[key]
          });
        }}
      />
      {key}
    </label>
  ));

  return (
    <div>
      {checkboxes}
      <table className='data'>
        <thead className='tablehead'>
          <tr>
            <th style={{ display: columns.app_id ? 'table-cell' : 'none' }}>App ID</th>
            <th style={{ display: columns.date ? 'table-cell' : 'none' }}>Date</th>
            <th style={{ display: columns.requests ? 'table-cell' : 'none' }}>Requests</th>
            <th style={{ display: columns.responses ? 'table-cell' : 'none' }}>Responses</th>
            <th style={{ display: columns.clicks ? 'table-cell' : 'none' }}>Clicks</th>
            <th style={{ display: columns.revenue ? 'table-cell' : 'none' }}>Revenue</th>
          </tr>
        </thead>
        <tbody >
          {rows}
        </tbody>
      </table>
    </div>
  );
}
