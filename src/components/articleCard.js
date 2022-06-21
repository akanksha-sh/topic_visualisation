import React from 'react'
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Divider from '@material-ui/core/Divider';

function ArticleCard({articleId, artcileData, tripleData}) {
    console.log("artcile id", articleId)
    const article = artcileData[articleId]
    console.log("artcileData", artcileData)
    console.log("articleId", articleId)
    console.log("article", article)

    const useStyles = makeStyles({
        card: {
          textAlign: 'center'
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
        content: {
          padding: 20, 
          "&:last-child": {
            paddingBottom: 10
          }
        },  
        visitbutton: {
          fontSize: 17,
          padding: 0,
          minHeight: 0,
          minWidth: 0
          
        }
      });
      const classes = useStyles();
    return (
            <Card className={classes.card}>
              <CardContent className={classes.content}>
            <Typography style={{fontSize: 17, paddingRight:10}} variant='button'>Triple:</Typography>
            <Typography style={{display: 'inline'}} color="textSecondary"> {tripleData[0]}</Typography>
            <ArrowRightAltIcon />
            <Typography style={{display: 'inline'}} color="textSecondary"> {tripleData[1]}</Typography>
            <ArrowRightAltIcon />
            <Typography style={{display: 'inline'}} color="textSecondary"> {tripleData[2]}</Typography>
            <Typography style={{paddingLeft: 10, display: 'inline'}} className={classes[`sent${tripleData[3]}`]} variant="body2">
               {`   ${tripleData[3]}`} </Typography>


            <br/>
            <Divider style={{marginTop:10, marginBottom:10}} variant='middle' light />
            <Button
              key={articleId}
              className={classes.visitbutton}
              onClick={() => window.open(article.url, '_blank')}
            >Visit Article</Button>
            <Typography color="textSecondary">{`${article.title}`}</Typography>
            <Typography className={classes[`sent${article.sentiment}`]} variant="body2">
               {`${article.sentiment}`} </Typography>
            
              </CardContent>
            </Card>
    )
}

export default ArticleCard