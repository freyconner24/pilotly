import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from './index.js';

Router.route('/', function () {});
Router.route('/finder', function () {});

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('app'));
});
