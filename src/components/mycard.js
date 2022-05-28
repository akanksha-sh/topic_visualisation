import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


function MyCard(props) {
  const topicIds = Object.keys(props.topics);
  const useStyles = makeStyles({
    root: {
      width: "auto",
      maxWidth:400,
      wordWrap: "break-word",
      padding:0,
      margin: 10
    },
    keywords: {
      fontSize:14,
      fontWeight:400
    },

    outer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },

    topics: {
      display: "flex", 
      flexDirection: "row",
      justifyContent: "space-evenly",
      backgroundColor: "#1d2026"
    },

    content: {
      marginBottom: 10
    },
    button: {
      padding: 0,
      alignItems: "center"
    }, 
    sentPositive: {
      marginTop: 4,
      color: "green"
    },
    sentNeutral: {
      marginTop: 4,
      color: "blue"
    },
    sentNegative: {
      marginTop: 4,
      color: "red"
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.topics}>
      {topicIds.map((tId) => {
        const topicSent = props.topics[tId]['Sentiment']
        return (
            <Card className={classes.root}>
              <CardContent clasname={classes.content}>
              <CardActions className={classes.button}>
                <Button
                  key={tId}
                  onClick={() => props.filter(tId)}
                  size="small"
                >{`${props.topics[tId]['Topic Name']}`}</Button>
              </CardActions>
                <Typography className={classes.keywords} color="textSecondary">
                {`${props.topics[tId]['Keywords']}`}
                </Typography>
                <Typography className={classes[`sent${topicSent}`]} variant="body2">
               {`${topicSent}`}
                </Typography>
              </CardContent>
            </Card>
        );
      })}
    </div>
  );
}
export default MyCard;
