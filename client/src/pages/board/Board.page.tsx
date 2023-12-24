import { Cake as CakeIcon, Mail as MailIcon } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import React, { useMemo } from "react";
import MyMenu from "../../components/Menu";
import useFetchEmployeesWithBirthdays, { IPerson } from "./Data";
// import useFetchOnMount from "../../services/useFetchOnMount.hook";
import WishHappyBirthdayDialog from "./components/WishHappyBirthdayDialog";

export const Board: React.FC = () => {
  const [openWishDialog, setOpenWishDialog] = React.useState<boolean>(false);
  const [recipientEmail, setRecipientEmail] = React.useState<string>("");

  const handleOpenWishDialog = (email: string) => {
    setOpenWishDialog(true);
    setRecipientEmail(email);
  };

  const handleCloseWishDialog = () => {
    setOpenWishDialog(false);
  };

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
              <CakeIcon />
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
                      onClick={() => handleOpenWishDialog(row.original.email)}
                    >
                      <MailIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              muiTableContainerProps={{ sx: { height: 250 } }}
            />
          </Box>
        </Container>
      )}

      <WishHappyBirthdayDialog
        open={openWishDialog}
        handleClose={handleCloseWishDialog}
        email={recipientEmail}
      />
    </>
  );
};

export default Board;
