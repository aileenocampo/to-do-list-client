import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '80%',
    height: 'vh',
    borderRadius: '10px',
    marginBottom: '1vw',
    letterSpacing: '80px'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: '2vw',
    fontFamily: "'Oswald', 'sans-serif'",
  },
  iconButton: {
    color: '#FF476F'
  },
  divider: {
    height: 28,
    margin: 4,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    flex: '1', 
  }, 
  text: {
    fontFamily: "'Prata', 'serif'",
    fontSize: '7vw',
    paddingTop: '3%',
    fontWeight: 'bold',
  }
}));

function AddBar() {
  const classes = useStyles();
  const [task, setTask] = useState('')
  const serverURL = 'https://to-do-list-app-server.herokuapp.com/list'

  const addToList = async (item) => {
    await fetch(serverURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task: item })
    })
    .catch((err) => console.log('error' + err))
  }

  const handleSubmit = (e) => {
    if (task !== '') {
      addToList(task)
    } else {
      e.preventDefault()
      alert("Don't forget to type in!");
    }
  }

  return (
    <div className={classes.center}>
      <Paper component="form" className={classes.root} onSubmit={(e) => handleSubmit(e)}>
        <InputBase
          onChange={(e) => {setTask(e.target.value)}}
          className={classes.input}
          placeholder="Add Task"
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton color="primary" type="submit" className={classes.iconButton}>
          <AddIcon />
        </IconButton>
      </Paper>
    </div>
  )
}

export default AddBar