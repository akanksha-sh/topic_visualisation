import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1c1d1f",
    color: "white",
    padding: "30px",
  },
  li_primary: {
    fontSize: 20,
    color: "white",
    width: "70%",
  },
  li_secondary: {
    fontSize: 16,
    color: "#FFEBCD",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  custom_accordian: {
    flexDirection: "column",
    display: "flex",
  },
}));

export default function FolderList({ year, category }) {
  const classes = useStyles();
  let data = null;
  let article_info = null;
  try {
    data = require(`./json/${category}-${year}/topics.json`);
    article_info = require(`./json/${category}-${year}/article_info.json`);
  } catch (e) {
    console.log("No such module");
  }

  return (
    data && (
      <div style={{ width: "100%", height: "100%" }}>
        <List className={classes.root}>
          <Typography sx={{ mt: 4, mb: 4 }} variant="h4" component="div">
            {`${category} ${year}`}
          </Typography>

          {Object.keys(data).map((cId) => {
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    className={classes.heading}
                  >{`Cluster ${cId}`}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.custom_accordian}>
                  <h5>
                    <b>
                      <center>Topics:</center>
                    </b>
                  </h5>
                  {Object.keys(data[cId]).map((tId) => {
                    const topicData = data[cId][tId];
                    return (
                      <div>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            {/* <Typography> Topic Name </Typography> */}
                            <Typography style={{ wordWrap: "break-word" }}>
                              {`${topicData["Topic Name"]}`}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails
                            className={classes.custom_accordian}
                          >
                            <Typography> Keywords </Typography>
                            <Typography style={{ wordWrap: "break-word" }}>
                              {`${topicData["Keywords"]}`}{" "}
                            </Typography>

                            <Typography> Sentiment </Typography>
                            <Typography>{topicData["Sentiment"]}</Typography>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography className={classes.heading}>
                                  Articles
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.custom_accordian}>
                               {topicData['Articles'].map((a) => {
                                 const article = article_info[a]
                                 return <div>
                                   <Typography> {article['title']}</Typography>
                                   <Typography> {article['sentiment']}</Typography>
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
              // <Fragment>
              //   <Typography
              //     sx={{ mt: 4, ml: 4, mb: 4 }}
              //     variant="h5"
              //     component="div"
              //   >{`Cluster ${cId}`}</Typography>
              //   {Object.keys(data[cId]).map((tId) => {
              //     return (
              //       <ListItem key={data[cId][tId]["Keywords"]}>
              //         <ListItemText
              //           classes={{
              //             primary: classes.li_primary,
              //             secondary: classes.li_secondary,
              //           }}
              //           primary={data[cId][tId]["Keywords"]}
              //           secondary={data[cId][tId]["Sentiment"]}
              //         />
              //       </ListItem>
              //     );
              //   })}
              // </Fragment>
            );
          })}
        </List>
      </div>
    )
  );
}
