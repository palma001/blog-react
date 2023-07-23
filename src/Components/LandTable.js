import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function LandTable ({ data, headers }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%' }} aria-label="caption table">
        <TableHead>
          <TableRow style={{ background: '#6d8850' }}>
            {
              headers.map(header => (
                <TableCell style={{ color: 'white' }} key={header.value}>
                  { header.label }
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((dt, index) => (
            <TableRow key={index} hover>
              {
                headers.map(header => (
                  <TableCell key={header.value}>
                    { dt[header.value] || '-' }
                  </TableCell>
                ))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}