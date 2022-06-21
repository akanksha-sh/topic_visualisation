
import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ForceGraph } from "./components/forceGraph";
import MyCard from "./components/mycard";
import ArticleCard from "./components/articleCard";

function ClusterGraph(props) {
  const {category, year, cId} = (props.match.params);
  let relationData = null;
  let article_info = null;
  let topics = null;
  try {
    relationData = require(`./json/${category}-${year}/Cluster-${cId}-rels.json`)
    article_info = require(`./json/${category}-${year}/article_info.json`);
    topics = require(`./json/${category}-${year}/topics.json`)[cId];
    
  } catch (e) {
    console.log("No such module");
  }

  const [topicId, setTopicId] = useState(0);
  const [topicRelations, setTopicRelations] = useState(null);
  const [articleId, setArticleId] = useState(null);
  const [selectedTriple, setTriple]= useState([]);


  const hoverTooltip = React.useCallback((o, type) => {
    return `<div>     
      <b>${o.name}</b>
        </div>`;
  }, []);

  useEffect(() => {
    let new_data = relationData[topicId];
    setTopicRelations(new_data);
  }, [topicId]);

  return (
    <div>
      <section>
          <header className="App-header">SEMANTIC TRIPLES </header>
          {article_info && topics && <MyCard topics={topics} filter={setTopicId} />}
        </section>
        <div>
        <section>
        {articleId && <ArticleCard articleId={articleId} artcileData={article_info} tripleData={selectedTriple} />}
        </section>
        
        <section className="ForceGraph">
          {topicRelations && (
            <ForceGraph
              topicData={topicRelations}
              hoverTooltip={hoverTooltip}
              setArticle={setArticleId}
              selectTriple = {setTriple}
            />
          )}
        </section>
        </div>
      </div>
  );
}
export default withRouter(ClusterGraph);
