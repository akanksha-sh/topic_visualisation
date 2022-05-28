import * as d3 from "d3";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./forceGraph.module.css";

export function runForceGraph(container, topicData, hoverTooltip, setArticle) {  

  const links = topicData.map((d) => Object.assign({}, d));
  var nodes_list = []
  const nodeMap = new Map();

  const sentColours = {
    'Positive': '#035200',
    'Negative': '#9c0d00',
    'Neutral': '#003899'
  }

  links.forEach((object) => {
    nodeMap.set(object.source, "#eddb3b");
    nodeMap.set(object.target, sentColours[object.sentiment]);
  });
  console.log(nodeMap);

  nodeMap.forEach(function (val, key) {
    console.log("o", key, val)
    nodes_list.push({name: key, color: val})
  });

  const nodes =  nodes_list.map((d) => Object.assign({}, d));
  console.log(nodes)

  // const containerRect = container.getBoundingClientRect();
  // const height = containerRect.height;
  // const width = containerRect.width;
  const size = 800;

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

  // function wrap(text, width) {
  //   text.each(function () {
  //       var text = d3.select(this),
  //           words = text.text().split(/s+/).reverse(),
  //           word,
  //           line = [],
  //           lineNumber = 0,
  //           lineHeight = 1.1, // ems
  //           x = text.attr("x"),
  //           y = text.attr("y"),
  //           dy = 0, //parseFloat(text.attr("dy")),
  //           tspan = text.text(null)
  //                       .append("tspan")
  //                       .attr("x", x)
  //                       .attr("y", y)
  //                       .attr("dy", dy + "em");
  //       while (word = words.pop()) {
  //           line.push(word);
  //           tspan.text(line.join(" "));
  //           if (tspan.node().getComputedTextLength() > width) {
  //               line.pop();
  //               tspan.text(line.join(" "));
  //               line = [word];
  //               tspan = text.append("tspan")
  //                           .attr("x", x)
  //                           .attr("y", y)
  //                           .attr("dy", ++lineNumber * lineHeight + dy + "em")
  //                           .text(word);
  //           }
  //       }
  //   });
  // }


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
        .distance(250)
    )
    .force("charge", d3.forceManyBody().strength(-100))
    .force("x", d3.forceX(size / 2))
    .force("y", d3.forceY(size / 2))
    .force('collision', d3.forceCollide(80))
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
      return sentColours[d.sentiment];
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
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 35)
    .attr("fill", (d) => {
      console.log(d)
      return d.color
    })
    .call(drag(simulation));

  linkText
    .on("click", (d) => {
      d.stroke = 
      setArticle(d.articleId)
    });

  const label = svg.append("g")
    .attr("class", styles.label)
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr('fill', "white")
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .text(d => {return d.name;})
    .call(drag(simulation));

  node
    .on("mouseover", (d) => {
      addTooltip(hoverTooltip, d, d3.event.pageX, d3.event.pageY, "node");
    })
    .on("mouseout", () => {
      removeTooltip();
    });

  simulation.on("tick", () => {
    // update node positions
    node
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y);
    // .call(simulation.drag);
    label
    .attr("x", d => { return d.x; })
    .attr("y", d => { return d.y; })
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
