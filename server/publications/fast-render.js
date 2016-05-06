FastRender.onAllRoutes(function() {
  this.subscribe('boards');
});

FastRender.route('/b/:id/:slug', function({ id }) {
  this.subscribe('board', id);
});

FastRender.route('/forms', function() {
  this.subscribe('mylists');
});
