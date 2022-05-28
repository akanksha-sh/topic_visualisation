import * as d3 from "d3";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./forceGraph.module.css";

export function runForceGraph(container, topicData, hoverTooltip, setArticle) {  

  const links = topicData.map((d) => Object.assign({}, d));
  var nodes_list = []
  var set = new Set()
  for (const i of links) {
    set.add(i.source)
    set.add(i.target)
  }
  set.forEach(function (n) {
    nodes_list.push({name: n})
  });
  const nodes =  nodes_list.map((d) => Object.assign({}, d));


  // const containerRect = container.getBoundingClientRect();
  // const height = containerRect.height;
  // const width = containerRect.width;
  const size = 800;
  const color = () => {
    return "blue";
  };

  const drag = (simulation) => {
    const dragstarted = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const dragended = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  // Add the tooltip element to the graph
  const tooltip = document.querySelector("#graph-tooltip");
  if (!tooltip) {
    const tooltipDiv = document.createElement("div");
    tooltipDiv.classList.add(styles.tooltip);
    tooltipDiv.style.opacity = "0";
    tooltipDiv.id = "graph-tooltip";
    document.body.appendChild(tooltipDiv);
  }
  const div = d3.select("#graph-tooltip");

  const addTooltip = (hoverTooltip, d, x, y, type) => {
    div.transition().duration(200).style("opacity", 0.9);
    div
      .html(hoverTooltip(d, type))
      .style("left", `${x}px`)
      .style("top", `${y - 28}px`);
  };

  const removeTooltip = () => {
    div.transition().duration(200).style("opacity", 0);
  };

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.name)
        .distance(300)
    )
    .force("charge", d3.forceManyBody().strength(-300))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .force("center", d3.forceCenter(size / 2, size / 2));

  d3.selectAll("svg").remove();

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", size)
    .attr("height", size);
    // .attr("view", [-width / 2, -height / 2, width, height])
    // .call(
    //   d3.zoom().on("zoom", function () {
    //     svg.attr("transform", d3.event.transform);
    //   })
    // );

  

  const link = svg
    .append("g")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", 2)
    .attr("stroke", (d) => {
      return "black";
    });

  const linkText = svg
    .append("g")
    .attr("class", styles.relation)
    .selectAll("text")
    .data(links)
    .join("text")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .text((d) => {
      return d.relation;
    });

  const node = svg
    .append("g")
    .attr("stroke", "#000")
    .attr("fill-opacity", 0.6)
    .attr("stroke-width", 2)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 25)
    .attr("fill", color)
    .call(drag(simulation));

  linkText
    .on("click", (d) => {
      d.stroke = 
      setArticle(d.articleId)
    });

  node
    .on("mouseover", (d) => {
      addTooltip(hoverTooltip, d, d3.event.pageX, d3.event.pageY, "node");
    })
    .on("mouseout", () => {
      removeTooltip();
    });

  simulation.on("tick", () => {
    // update node positions
    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    // .call(simulation.drag);

    //update link positions
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    linkText
      .attr("x", (d) => {
        return (d.source.x + d.target.x) / 2;
      })
      .attr("y", (d) => {
        return (d.source.y + d.target.y) / 2;
      });

  });
  return {
    destroy: () => {
      simulation.stop();
    },
    nodes: () => {
      return svg.node();
    },
  };
}
