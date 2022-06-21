import React from "react";
import { runForceGraph } from "./forceGraphGenerator";
import styles from "./forceGraph.module.css";

export function ForceGraph({topicData, hoverTooltip, setArticle, selectTriple }) {
  const containerRef = React.useRef(null);
  React.useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
    const { destroy } = runForceGraph(containerRef.current, topicData, hoverTooltip, setArticle, selectTriple);
    destroyFn = destroy;
    }
    return destroyFn;
  }, [topicData]);

  return <div ref={containerRef} className={styles.container} />;
}
