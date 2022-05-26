import React from 'react'
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";


function ArticleCard({articleId, artcileData}) {
    console.log("artcile id", articleId)
    const article = artcileData[articleId]
    console.log(article)
    return (
        <div>
        <Card size='lg' style={{ width: '22rem'}}>
            <Card.Header>About Article</Card.Header>
            <Card.Body>
            <Card.Title> {article.title} </Card.Title>
            <p></p>
            <Card.Subtitle className="mb-2 text-muted"> Sentiment: {article.sentiment} </Card.Subtitle>
            <p></p>
            <Button variant="primary" onClick={() => window.open(article.url, '_blank')}>Visit Article</Button>
            </Card.Body>
        </Card>
        </div>
    )
}

export default ArticleCard