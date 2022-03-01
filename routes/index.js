import express from 'express' 
var indexRouter = express.Router();
import * as App from '../views/components/app/index.jsx'
// import ReactDOM from 'react-dom';
// import ReactDOMServer from 'react-dom/server';
/* GET home page. */
 indexRouter.get('/', function(req, res, next) {
   console.log("baby")
  // const aspp = ReactDOMServer.renderToString(App.App);
  res.render('components/app/index.jsx');

  // ReactDOM.render(App.App(), { title: 'Express' });
});
export default indexRouter = indexRouter