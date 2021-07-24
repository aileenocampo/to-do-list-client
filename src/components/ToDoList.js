import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '95%',
    height: '6vh',
    backgroundColor: '#e0d8e3',
    "&:hover": {
      backgroundColor: "#cfcae6"
    },
    borderRadius: 10,
  },
  center: {
    margin: '1.2vh',
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  textField: {
    fontSize: '100%',
    width: '75%',
    height: '4vh',
    border: 'none',
  },
}))

function ToDoList() {
  const classes = useStyles();
  const [list, setList] = useState([])
  const [update, setUpdate] = useState(false)
  const [selected, setSelected] = useState([])
  const [task, setTask] = useState('')
  const serverURL = 'https://to-do-list-app-server.herokuapp.com/list'

  useEffect(() => {
    let getList = async () => {
      let response = await fetch(serverURL)
      let data = await response.json()
      setList(data)
    }
    getList()
  }, [update])

  const changeStatus = async (id, status) => {
    if (status === 'incomplete') {
      status = 'complete'
    } else {
      status = 'incomplete'
    }
    await fetch(serverURL, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id, status: status })
    })
    .then(()=> setUpdate(false))
  }

  const changeTask = async (id, task) => {
    await fetch(serverURL, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id, task: task })
    })
    .then(()=> setUpdate(false))
  }

  const deleteItem = async (id) => {
    await fetch(serverURL, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id})
    })
    .then(()=> setUpdate(false))
  } 

  const updateTask = (id, prevTask) => {
    let item =  selected.includes(id) ? selected.filter(s => s !== id): [...selected, id]
    setSelected(item)
    var textbox = document.getElementById(id)
    
    if (textbox.disabled) {
      document.getElementById(id).disabled = false;
    } else {
      document.getElementById(id).disabled = true;
      if (task !== '' && task !== prevTask) {
        changeTask(id, task)
      } 
    }
 }

  return (
    <div>
      {list && list.map(item => {
        return (
          <div className={classes.center} key={item.id}>
            <List className={classes.list} id='list'>
              <ListItem>
                <ListItemIcon >
                  <Checkbox   
                    checked={item.status === 'complete'}
                    onChange={()=> {
                      setUpdate(true)
                      changeStatus(item.id, item.status)
                    }}
                  />
                </ListItemIcon>
                <input
                  id={item.id} 
                  type="text"
                  placeholder={item.task} 
                  className={classes.textField}
                  disabled="disabled"
                  variant="outlined"
                  onChange={(e) => setTask(e.target.value)}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    id={item.id}
                    onClick={() => {
                      updateTask(item.id, item.task)
                    }} 
                  >
                    {selected.includes(item.id) ? <DoneOutlineIcon/> : <EditIcon />}
                  </IconButton>
                  <IconButton 
                    edge="end" 
                    onClick={()=> {
                      setUpdate(true)
                      deleteItem(item.id)
                    }}>
                    <DeleteIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List> 
          </div> 
        )
      })} 
    </div>
  )
}

export default ToDoList