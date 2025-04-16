import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({

  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.xdarker,
    color: theme.palette.common.white,
    fontWeight: 'bold', // Bold header
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.xlighter,
    },
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.background.lighter,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        backgroundColor: theme.palette.background.xlighter,
        border: 0,
    },
}));

export default function AgreementServicesTable({ agreementServices, theme }) {
  return (
    <TableContainer
      sx={{
        display: 'flex',
        justifyContent: 'center', // Center table horizontally
        // marginTop: '20px', // Add margin for spacing
      }}
    >
      <Table sx={{ minWidth: 500, width: 'auto' }} aria-label="agreement services table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Cost&nbsp;($)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {agreementServices.map((service) => (

            <StyledTableRow key={service._id} theme={theme} >
              <StyledTableCell component="th" scope="row">
                {service.name}
              </StyledTableCell>
              <StyledTableCell align="right">{service.type}</StyledTableCell>
              <StyledTableCell align="right">{service.cost}</StyledTableCell>
            </StyledTableRow>

          ))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}
