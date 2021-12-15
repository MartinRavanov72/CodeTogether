import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 10,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '600px',
    [theme.breakpoints.down('md')]: {
      width: '500px',
    },
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '600px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
    [theme.breakpoints.down('md')]: {
      width: '500px',
      marginTop: 20,
      justifyContent: 'center',
      flexDirection: 'column',
    }
  },
  btn: {
    marginLeft: '20px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0',
      width: '100%',
      marginTop: '10px'
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0',
      width: '60%',
      marginTop: '10px',
      alignSelf: 'center'
    }
  },
  log: {
    marginLeft: '40px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0',
      width: '100%',
      marginTop: '10px',
      marginBottom: '10px'
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0',
      width: '60%',
      marginTop: '10px',
      alignSelf: 'center'
    }
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    [theme.breakpoints.down('sm')]: {
      marginRight: '0',
      marginTop: '12px'
    },
    height: "4em",
    width: "4em",
    marginRight: '5px'
  },
}));
