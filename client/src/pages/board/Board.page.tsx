import { Email as EmailIcon } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Container, IconButton, Typography } from "@mui/material";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { data as initialData, type Person } from "./data";

export const Board = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "address",
        header: "Address",
      },
      {
        accessorKey: "city",
        header: "City",
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span>{renderedCellValue} !!!</span>
          </Box>
        ),
      },
      {
        accessorKey: "state",
        header: "State",
      },
    ],
    []
    //end
  );

  const data: Person[] = initialData;

  return (
    <Container
      component="main"
      sx={{
        gap: "10px",
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        gap={4}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Wish Happy Birthday!
        </Typography>
      </Box>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowActions
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
            <IconButton
              color="primary"
              onClick={() =>
                window.open(
                  `mailto:kevinvandy@mailinator.com?subject=Hello ${row.original.firstName}!`
                )
              }
            >
              <EmailIcon />
            </IconButton>
          </Box>
        )}
      />
    </Container>
  );
};

export default Board;
