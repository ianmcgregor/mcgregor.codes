import React from 'react';
import {render} from 'react-dom';
// import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './view/App';

const container = document.querySelector('[data-container]');

// const routes = (
//     <Route path="/" component={App} ignoreScrollBehavior={true}>
//         <IndexRoute component={App}/>
//         <Route path="work" component={App}>
//             <Route path=":filter" component={App}>
//                 <Route path=":project" component={App}/>
//             </Route>
//         </Route>
//         <Route path="about" component={App}/>
//         <Route path="contact" component={App}/>
//         <Route path="*" component={App}/>
//     </Route>
// );

// render(<Router history={browserHistory}>{routes}</Router>, container);
render(<App />, container);
