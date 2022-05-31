import React from "react";
import * as d3 from "d3";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Box, Grid } from "@material-ui/core";

const year = [
  {
    value: "all",
    name: "All",
  },
  {
    value: "2020",
    name: "2020",
  },
  {
    value: "2021",
    name: "2021",
  },
];
const category = [
  {
    value: "all",
    name: "All",
  },
  {
    value: "Business",
    name: "Business",
  },
  {
    value: "Markets",
    name: "Markets",
  },
  {
    value: "Misc",
    name: "Misc",
  },
];

const useStyles = (theme) => ({
  leaf_circle: {
    fill: "#ff0e42",
    fillOpacity: 1,
  },
});

class D3Component extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      topics: "",
      articles: "",
    };
  }

  start = () => {
    Promise.all([
      d3.csv("/combined_topics.csv"),
      d3.csv("/combined_articles.csv"),
    ])
      .then(([data2, data3]) => {
        this.setState({
          topics: data2,
          articles: data3,
        });
      })
      .catch((err) => console.log(err));
  };

  componentWillMount() {
    this.start();
  }

  componentDidUpdate() {
    this.drawCluster();
    // this.start()
  }

  drawCluster = () => {
    const { topics } = this.state;
    const { classes } = this.props;
    //TODO: Fix svg sizing
    // const containerRect = this.myRef.current.getBoundingClientRect();
    // const height = containerRect.height;
    // const width = containerRect.width;

    let size = 800;
    d3.select("div.App div.MuiBox-root.MuiBox-root-7 div svg").remove();
    let svg = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("width", size)
      .attr("height", size);
    var pack = d3.pack().size([size - 4, size - 4]);

    let dataset = d3
      .nest()
      .key(function (d) {
        return d["Category"];
      })
      .entries(this.state.topics);

    var subCat = [];
    dataset.forEach((i) => {
      subCat.push(i.key);
    });
    var groups = ["2020", "2021"];

    var newObj2 = {};
    var newObj3 = {};
    newObj2.name = "data";
    newObj2.children = [];

    groups.forEach(function (d, i) {
      var newObj = {};

      newObj.name = d;
      let d1 = topics.filter(function (a) {
        return a.Year == d;
      });
      newObj.children = [];

      subCat.forEach(function (j, k) {
        newObj3 = {};
        var d2 = d1.filter(function (a) {
          return a["Category"] == j;
        });
        if (d2.length !== 0) {
          newObj3.name = j;
          d2 = d1.filter(function (a) {
            return a["Category"] == j;
          });
          newObj3.children = [];
          var arr = [];
          d2.forEach(function (m, n) {
            if (!arr.includes(m["ClusterId"])) {
              arr.push(m["ClusterId"]);
            }
          });

          arr.forEach(function (p, q) {
            var obj4 = {};
            var d3 = d2.filter((e) => {
              return e.ClusterId == p;
            });

            obj4.name = p;
            obj4.children = [];
            d3.forEach(function (m, n) {
              var obj5 = {};
              obj5.name = m.TopicId;
              obj5.children = [];
              var arr2 = JSON.parse(m.Articles);
              arr2.forEach(function (e) {
                obj5.children.push({ name: e, size: 10 });
              });
              obj4.children.push(obj5);
            });
            newObj3.children.push(obj4);
          });
          newObj.children.push(newObj3);
        }
      });
      newObj2.children.push(newObj);
    });
    var comb = newObj2;

    //select year based on option selected from dropdown
    let selectedYear = d3.select("#year").property("value");

    //select category based on option selected from dropdown
    let selectedCategory = d3.select("#category").property("value");

    let root2 = comb;
    let art = this.state.articles;
    let top = this.state.topics;

    if (selectedYear != "all") {
      root2.children = root2.children.filter((d) => {
        return d.name == selectedYear;
      });
    }
    if (selectedCategory != "all") {
      for (let i = 0; i < root2.children.length; i++) {
        root2.children[i].children = root2.children[i].children.filter((d) => {
          return d.name == selectedCategory;
        });
        if (root2.children[i].children.length == 0) root2.children.shift();
      }
    }
    if (root2.children.length === 0) {
      return 0;
    }

    let g = svg.append("g").attr("transform", "translate(2,2)");

    let root = d3
      .hierarchy(root2)
      .count()
      .sort(function (a, b) {
        return b.value - a.value;
      });

    let node = g
      .selectAll(".node")
      .data(pack(root).descendants())
      .enter()
      .append("g")
      .attr("class", function (d) {
        return d.children ? "node" : classes.leaf_circle;
      })
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    node.append("title").text(function (d) {
      var year, category, artID, topId, clusterID;
      if (d.height == 1) {
        if (d.depth == 4) {
          year = d.parent.parent.parent.data.name;
          category = d.parent.parent.data.name;
          clusterID = d.parent.data.name;
          topId = d.data.name;
        } else {
          year = d.parent.parent.parent.data.name;
          category = d.parent.parent.data.name;
          clusterID = d.parent.data.name;
          topId = d.data.name;
        }
        let details = top.filter((d) => {
          return (
            d.Year == year &&
            d.Category == category &&
            d.ClusterId == clusterID &&
            d.TopicId == topId
          );
        });
        if (details[0] != undefined)
          return (
            "Topic Name: " +
            details[0]["Topic Name"] +
            "\n" +
            "Keywords: " +
            details[0].Keywords +
            "\n" +
            "Sentiment: " +
            details[0].Sentiment
          );
      } else if (d.height == 0) {
        if (d.depth == 5) {
          year = d.parent.parent.parent.parent.data.name;
          category = d.parent.parent.parent.data.name;
        }
        artID = d.data.name;
        let details = art.filter((d) => {
          return d.Year == year && d.Category == category && d.id == artID;
        });
        if (details[0] != undefined) {
          return (
            "Title: " +
            details[0].title +
            "\nURL: " +
            details[0].url +
            "\nSentiment: " +
            details[0].sentiment
          );
        }
      }
    });

    node
      .append("circle")
      .attr("r", function (d) {
        // if (d.height == 0) return d.r * 0.4;
        // else if (d.height == 1) return d.r * 0.9;
        if (d.height == 0) return d.r - 6;
        else if (d.height == 1) return d.r - 3;
        else return d.r;
      })
      .style("fill", function (d) {
        if (d.height == 0) return "#8F1D14";
        else if (d.height == 1) return "#FFD6C2";
        else if (d.height == 2) return "#1B120F";
        else return "#F89D13";
      })
      .style("fill-opacity", function (d) {
        if (d.height == 0 || d.height == 1 || d.height == 2) return 1;
        else return 0.25;
      })
      .on("click", (d) => {
        if (d.height == 2)
          return this.props.triplesCallBack(
            d.data.name,
            d.parent.data.name,
            d.parent.parent.data.name
          );
      });

    node
      .append("text")
      .style("font-size", (d) => {
        if (d.height == 0) return "12px";
        else return "0px"
      })
      .attr("fill", (d) => {
        if (d.height == 0) return "white";
        else if (d.height == 1) return "black";
        else if (d.height == 2) return "white";
      })
      .attr("dominant-baseline", "central")
      .attr('text-anchor', 'middle')
      .text((d) => {
        var cond = selectedYear != "all" && selectedCategory != "all" && (d.height == 0)
        if (cond) return  `${d.data.name}`;
      })
      
  };

  render() {
    return (
      <>
        <Box p={3} pt={2}>
          <Grid
            container
            spacing={5}
            direction="row"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={6}>
              <div>
                <p>Year:</p>

                <TextField
                  fullWidth
                  placeholder="Year"
                  id="year"
                  name="year"
                  onChange={(e) => {
                    this.props.setYear(e.target.value);
                    this.start();
                  }}
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  {year.map((year) => (
                    <option key={year.value} value={year.value}>
                      {year.name}
                    </option>
                  ))}
                </TextField>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <p>Category:</p>
                <TextField
                  fullWidth
                  placeholder="Category"
                  id="category"
                  name="Category"
                  onChange={(e) => {
                    this.props.setCategory(e.target.value);
                    this.start();
                  }}
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  {category.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </div>
            </Grid>
          </Grid>
        </Box>
        <Box p={3} textAlign="center">
          <div
            ref={this.myRef}
            width="1400"
            style={{ position: "relative" }}
          ></div>
        </Box>
      </>
    );
  }
}

export default withStyles(useStyles)(D3Component);
