import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


function MyCard(props) {
 
  
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActions>
        {props.topics.map((b) => {
          return <Button key={b} size="small">{`Topic ${b}`}</Button>
        })}
       
      </CardActions>
    </Card>
  );
}
export default MyCard