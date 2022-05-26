
import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ForceGraph } from "./components/forceGraph";
import MyCard from "./components/mycard";
import ArticleCard from "./components/articleCard";

function ClusterGraph(props) {
  const {category, year, cId} = (props.match.params);
  let relationData = null;
  let article_info = null;

  try {
    relationData = require(`./json/${category}-${year}/Cluster-${cId}-rels.json`)
    article_info = require(`./json/${category}-${year}/article_info.json`);

    console.log("data", relationData);
    console.log("article_info", article_info);
    console.log("topic keys", Object.keys(relationData))

  } catch (e) {
    console.log("No such module");
  }

  const [topicId, setTopicId] = useState(0);
  const [topicData, setTopicData] = useState(null);
  const [articleId, setArticleId] = useState(null);


  const hoverTooltip = React.useCallback((o, type) => {
    return `<div>     
      <b>${o.name}</b>
        </div>`;
  }, []);

  useEffect(() => {
    let new_data = relationData[topicId];
    setTopicData(new_data);
  }, [topicId]);

  return (
    <div>
      <div>
      <section>
          {article_info && relationData && Object.keys(relationData) && <MyCard topics={Object.keys(relationData)} filter={setTopicId} />}
          {articleId && <ArticleCard articleId={articleId} />}
        </section>
        <section>
          {topicData && (
            <ForceGraph
              topicData={topicData}
              hoverTooltip={hoverTooltip}
              setArticle={setArticleId}
            />
          )}
        </section>
      </div>
    </div>
  );
}
export default withRouter(ClusterGraph);
