/*
 * GET home page.
 */

exports.index = function(req, res){
  require('../model/logs_list.js')(function(logs){
    res.render('index', { title: 'Kostal-UI', loggedIn: req.session.loggedIn, logs: logs, logdir:'logs/' });
  });
};


exports.view = function(req, res){
  //res.render('index', { title: 'Express' });
  res.send('ok' + req.params.file);
};