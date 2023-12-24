import { Close as CloseIcon } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { AxiosError } from "axios";
import client from "../../../services/client";

export interface IWishProps {
  open: boolean;
  handleClose: () => void;
  email: string;
}

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  console.log({
    email: data.get("email"),
    message: data.get("wish"),
  });

  try {
    await client.post(`employee/logBirthdayWish`, {
      email: data.get("email"),
      message: data.get("wish"),
    });
    console.log("wished happy birthday");
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Login failed:", axiosError.message);
  }
};

export default function FormDialog({ open, handleClose, email }: IWishProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Wish Happy Birthday
        <IconButton onClick={handleClose} style={{ float: "right" }}>
          <CloseIcon color="primary"></CloseIcon>
        </IconButton>{" "}
      </DialogTitle>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1, mb: 1 }}
      >
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            To send a happy birthday wish, please enter your email address
            before you're sending a birthday wish. <br /> Wish Happy Birthday,
            think about the things that will make him happy.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                defaultValue={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="wish"
                required
                fullWidth
                id="wish"
                label="Wish Message"
                autoFocus
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained">
                Send
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
