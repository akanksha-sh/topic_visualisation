import * as d3 from "d3";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./forceGraph.module.css";

export function runForceGraph(container, topicData, hoverTooltip, setArticle) {  

  const links = topicData.map((d) => Object.assign({}, d));
  var nodes_list = []
  const nodeMap = new Map();

  const sentColours = {
    'Positive': '#40c945',
    'Negative': '#f55045',
    'Neutral': '#003899'
  }

  links.forEach((object) => {
    nodeMap.set(object.source, "#FFBD69");
    nodeMap.set(object.target, sentColours[object.sentiment]);
  });

  nodeMap.forEach(function (val, key) {
    nodes_list.push({name: key, color: val, degree:0})
  });

  const nodes =  nodes_list.map((d) => Object.assign({}, d));

  // Calculate degree
  links.forEach(function(d){
      console.log("d", d.source)
      const source_node = nodes.find(n=> n.name ===  d.source)
      const target_node = nodes.find(n=> n.name ===  d.target)
      source_node.degree += 1
      target_node.degree += 1
    });

    // Get min degree and max degree for range
    var minDeg = d3.min(
      d3.values(nodes), function(d) {
        return d.degree; })

    var maxDeg = d3.max(
      d3.values(nodes), function(d) { 
        return d.degree; })

    // Create node scale based on degree
    var scaledNodeSize = d3.scaleSqrt()
      .domain( [minDeg, maxDeg] )
      .range( [3, 20] ); 

  // const containerRect = container.getBoundingClientRect();
  // const height = containerRect.height;
  // const width = containerRect.width;

  const width = 1200;
  const height = 1000;
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
  function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(' ').reverse(),
            word,
            line = [],
            dy = 0,
            tspan = text.text(null)
                        .append("tspan")
                        .attr("dy", dy + "em");
        while (word = words.pop()) {
            console.log("scscs", tspan.node());
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("dy", dy + "em")
                            .text(word);
                            
            }
            dy += 0.5
        }
    });
  }

  function trimText(text, threshold) {
    if (text.length <= threshold) return text;
    return text.substr(0, threshold).concat("...");
  }


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
    .force("charge", d3.forceManyBody().strength(-400))
    .force("x", d3.forceX(width / 2))
    .force("y", d3.forceY(height / 2))
    // .force('collision', d3.forceCollide(100))
    .force("center", d3.forceCenter(1400 / 2, height/2));

  d3.selectAll("svg").remove();

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height);
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
    .attr("r", (d)=> 30 + scaledNodeSize(d.degree))
    .attr("fill", (d) => {
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
    .attr("dy", 0)
    .style("font-size", "10px")
    .attr('fill', "black")
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .text(d => {return trimText(d.name, 30);})
    .call(wrap, 80)
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
