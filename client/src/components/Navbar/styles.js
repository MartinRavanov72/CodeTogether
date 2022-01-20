import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 10,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '10px 40px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '700px',
    [theme.breakpoints.down('md')]: {
      width: '500px',
    },
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    display: 'flex',
    width: '700px',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      justifyContent: 'center',
    },
    [theme.breakpoints.down('md')]: {
      width: '500px',
      justifyContent: 'center',
      flexDirection: 'column',
    }
  },
  btn: {
    marginLeft: '20px',
    width: '30%',
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
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginRight: '5em',
    [theme.breakpoints.down('md')]: {
      marginRight: '0',
    },
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    [theme.breakpoints.down('md')]: {
      marginRight: '0',
    },
    height: "4em",
    width: "4em",
    marginRight: '5em',
  }
}));
