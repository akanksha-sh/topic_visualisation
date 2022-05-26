import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#1c1d1f',
    color: 'white',
    padding: '30px',
  },
  li_primary:{
    fontSize:20,
    color: 'white'
  },
  li_secondary:{
    fontSize:16,
    color: '#FFEBCD'
  },
}));

export default function FolderList() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>

        <ListItemText classes={{primary:classes.li_primary, secondary: classes.li_secondary}} primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
      <ListItem>
  
        <ListItemText  classes={{primary:classes.li_primary, secondary: classes.li_secondary}} primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
      <ListItem>

        <ListItemText  classes={{primary:classes.li_primary, secondary: classes.li_secondary}} primary="Vacation" secondary="July 20, 2014" />
      </ListItem>
    </List>
  );
}