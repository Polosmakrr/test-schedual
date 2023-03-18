import React from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import { ITraineRoute } from '../../../common/types';

export const TableComponent = ({
  data,
  onClick
}: {
  data: ITraineRoute[];
  onClick: (value: ITraineRoute) => void;
}) => {
  const getMinutes = (value: string) => {
    const hours = Number(value.slice(0, 2));
    const mins = Number(value.slice(3, 5));
    return hours * 60 + mins;
  };
  const getParkingTime = (arrival: string, departure: string) => {
    let mins = 0;
    if (departure > arrival) {
      mins = getMinutes(departure) - getMinutes(arrival);
    } else {
      mins = 1440 + getMinutes(departure) - getMinutes(arrival);
    }
    const hours = String(Math.trunc(mins / 60));
    const minutes = String(mins % 60);

    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Train &#8470;</TableCell>
            <TableCell align="center">Route</TableCell>
            <TableCell align="center">Arrival</TableCell>
            <TableCell align="center">Time of parking</TableCell>
            <TableCell align="center">Departure</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((it) => (
              <TableRow key={it._id} onClick={() => onClick(it)}>
                <TableCell align="center" component="th" scope="row">
                  {it.day}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {it.trainNumber}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {it.departurePoint} &#8594; {it.destination}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {it.arrivalTime}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {getParkingTime(it.arrivalTime, it.departureTime)}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {it.departureTime}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
