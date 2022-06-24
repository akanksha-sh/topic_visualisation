import React from 'react';
import ReactDOM from 'react-dom';
import 'react-router-dom';
import App from './App';
import './index.css'; // Standard version
import 'socicon/css/socicon.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/plugins/line-awesome/css/line-awesome.css';
import './assets/plugins/flaticon/flaticon.css';
import './assets/plugins/flaticon2/flaticon.css';
import './assets/plugins/flaticon2/flaticon2.css';
import './assets/plugins/flaticon2/flaticon3.css';
import './assets/plugins/font-awesome/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route} from 'react-router-dom';
import ClusterGraph from './components/clusterGraph';


ReactDOM.render(
  <BrowserRouter>
  <Route path='/' component={App} exact />
  <Route path='/clusterData/:category/:year/:cId' component={ClusterGraph} exact />
  </BrowserRouter>,
  // <App basename={'/'} />,
  document.getElementById('root')
);
