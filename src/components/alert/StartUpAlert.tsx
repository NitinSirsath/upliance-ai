import { Alert, Snackbar, Button } from "@mui/material";
import { QuestionAnswer } from "@mui/icons-material";
// import useOldDataStore from "../../services/store/oldData/oldDataAlert";

export default function StartUpAlert() {
  // const { oldDataCheck } = useOldDataStore();

  // const [open, setOpen] = useState(oldDataCheck);

  // useEffect(() => {
  //   setOpen(oldDataCheck);
  // }, [oldDataCheck]);

  const handleClose = () => {
    // setOpen(false);
  };

  const vertical = "top";
  const horizontal = "center";

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={true}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        icon={<QuestionAnswer fontSize="inherit" />}
        severity="success"
        action={
          <Button color="inherit" size="small" onClick={handleClose}>
            Close
          </Button>
        }
      >
        {/* {oldDataCheck ? "Found past store data" : "No store data found"} */}
      </Alert>
    </Snackbar>
  );
}
