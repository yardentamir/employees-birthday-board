import { Cake as CakeIcon } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import MyMenu from "../../components/Menu";
// import client from "../../services/client";
import { format } from "date-fns";
import useFetchEmployeesWithBirthdays, { IPerson } from "./Data";
// import useFetchOnMount from "../../services/useFetchOnMount.hook";

export const Board: React.FC = () => {
  const columns = useMemo<MRT_ColumnDef<IPerson>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "birthDate",
        header: "Birth Date",
        Cell: ({ renderedCellValue }) => {
          let dateValue: Date | null = null;

          // Check if renderedCellValue is a valid date string
          if (typeof renderedCellValue === "string") {
            dateValue = new Date(renderedCellValue);
          }

          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {dateValue ? (
                <span>{format(dateValue, "dd/MM/yyyy")}</span>
              ) : (
                <span>No date available</span>
              )}
            </Box>
          );
        },
      },
    ],
    []
  );

  const { data, loading, error } = useFetchEmployeesWithBirthdays();

  // if (loading) {
  //   return <CircularProgress />;
  // }

  // if (error) {
  //   return (
  //     <p>
  //       Error:
  //       {error instanceof Error ? error.message : "An unknown error occurred."}
  //     </p>
  //   );
  // }

  return (
    <>
      <MyMenu />
      {error ? (
        <p>
          Error:
          {error instanceof Error
            ? error.message
            : "An unknown error occurred."}
        </p>
      ) : (
        <Container
          component="main"
          sx={{
            gap: "10px",
            height: "calc(100dvh - 48px)",
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
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="light">
              Celebrating Birthday Today
            </Typography>
          </Box>
          <Box marginTop={5}>
            <MaterialReactTable
              columns={columns}
              data={data ?? []}
              state={{
                isLoading: loading,
              }}
              enableRowActions
              renderRowActions={({ row }) => (
                <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
                  <Tooltip title="Wish Happy Birth Day">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        window.open(
                          `mailto:kevinvandy@mailinator.com?subject=Hello ${row.original.name}!`
                        )
                      }
                    >
                      <CakeIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              muiTableContainerProps={{ sx: { height: 250 } }}
            />
          </Box>
        </Container>
      )}
    </>
  );
};

export default Board;
