import * as React from "react";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grow from "@mui/material/Grow";
import { TransitionProps } from "@mui/material/transitions";
import useThemeStore from "../../services/store/theme/themeStore";
import { useMediaQuery } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  backdropFilter: "blur(7px)",
  "& .MuiPaper-root": {
    borderRadius: theme.shape.borderRadius * 3, // Adjust the multiplier to get the desired border radius
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<unknown, never> },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} timeout={500} />;
});

type ButtonColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";
interface IProps {
  open: boolean;
  // setOpen: BooleanSetStateAction;
  dialogActionFunction: () => void;
  children: React.ReactNode;
  dialogTitle: string;
  handleClose: () => void;
  actionButtonTitle?: string;
  actionButtonColor?: ButtonColor;
  isDisable?: boolean;
  customSize?: string;
}

const GlobalDialog = React.memo(
  ({
    open,
    // setOpen,
    dialogActionFunction,
    dialogTitle,
    children,
    actionButtonTitle = "Submit",
    actionButtonColor = "primary",
    isDisable,
    customSize,
    handleClose,
  }: IProps) => {
    const { darkMode } = useThemeStore();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const sizeModifier = () => {
      if (customSize) {
        if (customSize.toLowerCase() === "large") {
          return "lg";
        }
      }
      if (customSize) {
        if (customSize.toLowerCase() === "small") {
          return "sm";
        }
      }

      return "md";
    };

    return (
      <React.Fragment>
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          open={open}
          slots={{ transition: Transition }}
          maxWidth={sizeModifier()}
          fullWidth
        >
          <DialogTitle
            sx={{
              m: 0,
              background: darkMode ? undefined : undefined,
              p: isMobile ? 1.5 : 2,
              fontSize: isMobile ? "1rem" : "1.5rem",
            }}
            id="customized-dialog-title"
          >
            {dialogTitle}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent
            sx={{
              background: darkMode ? undefined : undefined,
              minWidth: isMobile ? "100%" : 500,
              padding: isMobile ? 1.5 : 2,
            }}
            dividers
          >
            {children}
          </DialogContent>

          <DialogActions
            sx={{
              background: darkMode ? undefined : undefined,
              padding: isMobile ? 1 : 2,
            }}
          >
            {!isDisable && (
              <Button
                variant="contained"
                disabled={isDisable}
                disableElevation
                color={actionButtonColor}
                onClick={() => dialogActionFunction()}
              >
                {actionButtonTitle}
              </Button>
            )}

            <Button
              variant="outlined"
              color="secondary"
              disableElevation
              onClick={handleClose}
            >
              {"Close"}
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    );
  }
);

export default GlobalDialog;
