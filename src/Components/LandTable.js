import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Box, CircularProgress } from '@mui/material';

export default function LandTable ({ data, headers, loadingData }) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 430 }}>
      <Table stickyHeader aria-label="caption table">
        <TableHead>
          <TableRow>
            {
              headers.map(header => (
                <TableCell key={header.value} style={{ background: '#6d8850', color: 'white' }}>
                  { header.label }
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            loadingData && (
              <TableCell colSpan={2}>
                <Box style={{ display: 'grid', placeItems: 'center' }}>
                  <CircularProgress />
                </Box>
              </TableCell>
            )
          }
          {
            !loadingData && data.length === 0 && (
              <TableCell colSpan={2} style={{ textAlign: 'center' }}>
                <Typography variant="h6">
                  No data available.
                </Typography>
              </TableCell>
            )
          }
          {
            data.map((dt, index) => (
              <TableRow key={index} hover>
                {
                  headers.map(header => (
                    <TableCell key={header.value}>
                      { dt[header.value] || '-' }
                    </TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}