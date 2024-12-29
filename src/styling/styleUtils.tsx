import Flag from "react-flagkit";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import { ReactNode } from "react";
import React from "react";

export const getTableCellStyleByKey = (
   compKey: string | undefined,
   index: number,
   compProps: Record<string, any>,
): ReactNode => {
   switch (compKey) {
      case "flag":
         return (
            <StyledTableCell key={index} sx={compProps.sx} align={compProps.align}>
               <Flag country={compProps.country} size={compProps.size}></Flag>
            </StyledTableCell>
         );
      case "default":
         return (
            <StyledTableCell key={index} sx={compProps.sx} align={compProps.align}>
               {compProps.title}
            </StyledTableCell>
         );
   }
};

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
   "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
   },
   // hide last border
   "&:last-child td, &:last-child th": {
      border: 0,
   },
}));
