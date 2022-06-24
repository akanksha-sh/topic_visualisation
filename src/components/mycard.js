import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function MyCard(props) {
  const topicIds = Object.keys(props.topics);
  const useStyles = makeStyles({
    accordian:{
      width: "100%", 
      height: "100%" ,
    },
   
    card: {
      width: "auto",
      maxWidth: 400,
      wordWrap: "break-word",
      padding: 0,
      margin: 10,
    },
    keywords: {
      fontSize: 12,
      fontWeight: 400,
    },

    outer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },

    accordian_summ: {
      maxHeight:40,
      justifyContent: "center",
    },

    topics: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      backgroundColor: "#1d2026",
    },
    title: {
      width: "100%",
      textAlign: "center",
      fontSize: 20,
      fontWeight: "lighter"
    },
    content: {
      marginBottom: 10,
    },
    button: {
      padding: 0,
      alignItems: "center",
      "&:focus": {
        color: "red"
      }
    },
    sentPositive: {
      marginTop: 4,
      color: "green",
    },
    sentNeutral: {
      marginTop: 4,
      color: "blue",
    },
    sentNegative: {
      marginTop: 4,
      color: "red",
    },
    topicName: {
      fontSize: 13,
      wordBreak: "break-word",
    }
  });
  const classes = useStyles();

  return (
    <div>
      <Accordion className={classes.accordian}>
        <AccordionSummary className={classes.accordian_summ} expandIcon={<ExpandMoreIcon />}>
        
          <Typography className={classes.title} >Cluster Topics</Typography>
        </AccordionSummary >
        <AccordionDetails className={classes.topics}>
          {topicIds.map((tId) => {
            const topicSent = props.topics[tId]["Sentiment"];
            return (
              <Card key={tId} className={classes.card}>
                <CardContent clasname={classes.content}>
                  <CardActions className={classes.button}>
                    <Button
                      key={tId}
                      className={classes.button}
                      onClick={() => props.filter(tId)}
                      // size="small"
                    > <Typography  className={classes.topicName} variant="body2">{`${props.topics[tId]["Topic Name"]}`}</Typography>                    
                      
                      </Button>
                  </CardActions>
                  <Typography
                    className={classes.keywords}
                    color="textSecondary"
                  >
                    {`${props.topics[tId]["Keywords"]}`}
                  </Typography>
                  <Typography
                    className={classes[`sent${topicSent}`]}
                    variant="body2"
                  >
                    {`${topicSent}`}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
export default MyCard;
