<div id="top"></div>

# Visualisation Tool For Semantic Analysis of News

<!-- TABLE OF CONTENTS -->
  ## Table of Contents
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>  
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
     <li><a href="#license">License</a></li>
  </ol>

<!-- ABOUT THE PROJECT -->
## About The Project

This repository presents a visualisation tool for the semantic analysis of news articles performed by the engine in repository: <a href=https://github.com/akanksha-sh/visualisingNews.git> <tt> semantic-analysis-news</tt> </a>.

It uses two primary frameworks: 

* [D3.js](https://d3js.org/) - A JavaScript library for building customisable data visualisations using DOM manipulation.

* [React](https://reactjs.org/) - A JavaScript library for building user interfaces.

This tool displays the results in using two primary data visualisations: 

* <tt>Cluster-Topic Diagram</tt> - A circle packing graph that displays the hierarchy of semantic clusters &rarr; topics &rarr; articles. 

* <tt>Knowledge Graph </tt> - A force directed graph for displaying the semantic triples for each topic. 

For more information about the semantic analysis results, please refer to this <a id="raw-url" href="https://github.com/akanksha-sh/FYP_report/blob/main/main.pdf">paper</a>.
 


<p align="right">(<a href="#top">back to top</a>)</p>



## Getting Started

To use this visualisation tool, clone this repository on your machine. 

```
git clone https://github.com/akanksha-sh/visualisation-semantic-analysis.git
```

Before we run the tool, we need to ensure the analysis results to be visualised are imported to this repo. After running the pipeline from <a href=https://github.com/akanksha-sh/visualisingNews.git> <tt> semantic-analysis-news</tt> </a>, import the files from the <tt> **data/** </tt> folder. 

Particularly, the <tt>combined_articles.csv</tt> and <tt>combined_topics.csv</tt> in the <tt>public/</tt> folder of this repo and the <tt>json/</tt> folder in <tt>src/</tt> folder of this repo. 

```
scp -r <path>/semantic-analysis-news/data/combined* <path>/semantic-analysis-news/public/.

scp -r <path>/semantic-analysis-news/data/json <path>/semantic-analysis-news/src/.
```

Once the results data is stored, we install the dependencies for node modules using npm or yarn (whichever is a preference).

```
yarn install
# or 
npm install 
```
To run the app in the development mode.
Open http://localhost:3000 to view it in the browser. 
```
yarn start
# or 
npm run build
npm start 
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Acknowledgements

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). To learn more: [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

Material UI was used for bootstrapping and pre-built components that implement Google's Material Design. To learn more: [Material UI documentation](https://mui.com/material-ui/getting-started/overview/).

<p align="right">(<a href="#top">back to top</a>)</p>


## License
Copyright &#169; 2022 Akanksha Sharma

Licensed under the MIT license. 
