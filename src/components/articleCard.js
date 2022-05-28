import React from 'react'
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function ArticleCard({articleId, artcileData}) {
    console.log("artcile id", articleId)
    const article = artcileData[articleId]
    console.log("artcileData", artcileData)
    console.log("articleId", articleId)
    console.log("article", article)

    const useStyles = makeStyles({
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
            <Card>
              <CardContent>
            <Typography>About Article</Typography>
              <Typography color="textSecondary">{`${article.title}`}
            </Typography>
            <Typography className={classes[`sent${article.sentiment}`]} variant="body2">
               {`${article.sentiment}`}
            </Typography>
              <CardActions>
                <Button
                  key={articleId}
                  onClick={() => window.open(article.url, '_blank')}
                  size="small"
                >Visit Article</Button>
              </CardActions>

              </CardContent>
            </Card>
    )
}

export default ArticleCard