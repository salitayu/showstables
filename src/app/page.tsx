'use client'

import Paper from '@mui/material/Paper'
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid'

interface Data {
  id: number;
  showName: string;
  showTime: Date;
  rating: number;
}

function createData(
  id: number,
  showName: string,
  showTime: Date,
  rating: number
): Data {
  return {
    id,
    showName,
    showTime,
    rating
  }
}

const rows = [
  createData(1, 'Recreo', new Date("2024-11-20"), 8),
  createData(2, 'Brandy y el senor bigotes', new Date("2024-11-15"), 9),
  createData(3, 'Hey Arnold', new Date("2024-11-18"), 7),
  createData(4, 'Las Pistas de Blue', new Date("2024-11-16"), 6),
  createData(5, 'Bob Esponja', new Date("2024-11-12"), 10),
  createData(6, 'Los padrinos magicos', new Date("2024-11-17"), 8),
  createData(8, 'Jimmy Neutron', new Date("2024-11-18"), 10),
  createData(9, 'Drake y Josh',  new Date("2024-11-19"), 6),
  createData(10, 'Lizzy Mcguire',  new Date("2024-11-02"), 5),
  createData(11, 'Wix',  new Date("2024-11-03"), 6),
  createData(12, 'Chicas Superpoderosas', new Date("2024-11-05"), 9),
  createData(13, 'Picapiedras',  new Date("2024-11-02"), 8),
]

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]){
    return -1
  }
  if (b[orderBy] > a[orderBy]){
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'showName', headerName: 'Show Name', width: 130},
  { field: 'showTime', headerName: 'Show Time', width: 450},
  { field: 'rating', headerName: 'Rating', width: 70}
]

const paginationModel = { page: 0, pageSize: 5 }

export default function DataTable() {
  return (
    <Paper sx={{height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{pagination: {paginationModel}}}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  )
}