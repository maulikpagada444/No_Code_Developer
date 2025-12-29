import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const TITLES = {
    success: "Success",
    info: "Info",
    warning: "Warning",
    error: "Error",
};

const AppAlert = ({
    open,
    onClose,
    message,
    severity = "success",
    duration = 3000,
    position = { vertical: "top", horizontal: "center" },
    title, // optional custom title
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={duration}
            onClose={onClose}
            anchorOrigin={position}
        >
            <Stack sx={{ width: "100%" }}>
                <Alert
                    severity={severity}
                    onClose={onClose}
                >
                    <AlertTitle>
                        {title || TITLES[severity]}
                    </AlertTitle>
                    {message}
                </Alert>
            </Stack>
        </Snackbar>
    );
};

export default AppAlert;
