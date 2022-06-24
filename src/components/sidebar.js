import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    // maxHeight: "100%",
    backgroundColor: "#1d2026",
    color: "white",
    padding: "30px",
    // overflow: "auto"
  },
  accordian_summary: {
    maxHeight:50, 
  },
  custom_accordian: {
    flexDirection: "column",
    display: "flex",
    padding: 10,
    paddingTop: 0,
    margin: 5
  },

  title: {
    margin: 10,
    marginBottom: 20,
    textAlign: "center",
  },

  accordian: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 2
  },

  subheading: {
    marginTop: 5,
    fontWeight: 200
  },

  body: {
    fontWeight: 500, 
    fontSize: 16,
    lineHeight: 1.2,
    wordWrap: "break-word"
  },
  sentPositive: {
    color: "green"
  },
  sentNeutral: {
    color: "blue"
  },
  sentNegative: {
    color: "red"
  },
}));

export default function FolderList({ year, category }) {
  const classes = useStyles();
  let data = null;
  let article_info = null;
  try {
    data = require(`../json/${category}-${year}/topics.json`);
    article_info = require(`../json/${category}-${year}/article_info.json`);
  } catch (e) {
    console.log("No such module");
  }

  return (
    data && (
      <div style={{ width: "100%", height: "100%" }}>
        <List className={classes.root}>
          <Typography key={'text'} className={classes.title} variant="h5">
            {`${category} ${year}`}
          </Typography>

          {Object.keys(data).map((cId) => {
            return (
              <Accordion key={cId} className={classes.accordian}>
                <AccordionSummary className={classes.accordian_summary}
                  expandIcon={<ExpandMoreIcon />} 
                >
                  <Typography
                    className={classes.subheading}
                  >{`Topics: Cluster ${cId}`}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.custom_accordian}>      
                  {Object.keys(data[cId]).map((tId) => {
                    const topicData = data[cId][tId];
                    const topicSent = topicData['Sentiment'];
                    return (
                      <div key={tId}>
                        <Accordion className={classes.accordian}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                           
                          >
                            <Typography className={classes.body}>
                              {`T${tId}: ${topicData["Topic Name"]}`}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails
                            className={classes.custom_accordian}
                          >
                            <Typography className={classes.subheading}> Keywords </Typography>
                            <Typography className={classes.body}>
                              {`${topicData["Keywords"]}`}{" "}
                            </Typography>
                            <br/>
                            <Typography className={classes.subheading}> Sentiment </Typography>
                            <Typography className={classes[`sent${topicSent}`]} >{`${topicSent}`}</Typography>
                            <Accordion className={classes.accordian}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}

                              >
                                <Typography className={classes.subheading}>
                                  Articles
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.custom_accordian}>
                               {topicData['Articles'].map((a) => {
                                 const article = article_info[a]
                                 const artSent = article_info[a]['sentiment']
                                 return <div key={a}>
                                   <Typography className={classes.body} onClick={() => window.open(article.url, '_blank')}> <b>{a}</b> {article['title']}</Typography>
                                   <Typography className={classes[`sent${artSent}`]}> {artSent}</Typography>
                                   <p></p>
                                 </div>
                               })}
                              </AccordionDetails>
                            </Accordion>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </List>
      </div>
    )
  );
}
