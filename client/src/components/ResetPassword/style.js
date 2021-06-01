import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        width: "50%",
        margin: "0 auto",
        [theme.breakpoints.down("sm")]: {
            width: "75%"
        }
    }
}))