import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    flex: '1', 
    marginBottom: '2%',
    backgroundColor: '#BDD9A0',
  }, 
  text: {
    fontFamily: "'Prata', 'serif'",
    fontSize: '5vw',
    paddingTop: '3%',
    color: '#EDEDE6',
    fontWeight: 'bold'
  }
}));

function NavBar() {
  const classes = useStyles();

  return (
      <AppBar position="static" className={classes.center}>
        <Toolbar>
          <Typography className={classes.text}>TO DO LIST</Typography>
        </Toolbar>
      </AppBar>
  )
}

export default NavBar