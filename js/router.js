
Todos.Router.map(function() {
  this.resource('todos', { path: '/' }, function() {
    //additional child routes will go here later
  });
});

Todos.TodosRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});

Todos.TodosIndexRoute = Ember.Route.extend({
  /***
   * When the application loads at the url '/' Ember.js will enter the todos route
   * and render the todos template as before. It will also transition into
   * the todos.index route and fill the {{outlet}} in the todos template with
   * the todos/index template. The model data for this template is the result of
   * the model method of TodosIndexRoute, which indicates that the model for
   * this route is the same model as for the TodosRoute.
   *
   ***/
  model: function() {
    return this.modelFor('todos');
  }
});