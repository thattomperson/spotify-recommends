import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: 'auto',
      bottom: 0,
    },
  }),
);

export default () => {
  const classes = useStyles();
  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        className={classes.appBar}
      ></AppBar>
    </>
  );
};
