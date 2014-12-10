
Todos.Router.map(function() {
  this.resource('todos', { path: '/' }, function() {
    //additional child routes
    this.route('active');
    this.route('completed');
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
   * This mapping is described in more detail in the Naming Conventions Guide.
   * http://emberjs.com/guides/concepts/naming-conventions
   *
   ***/
  model: function() {
    return this.modelFor('todos');
  }
});

Todos.TodosActiveRoute = Ember.Route.extend({
  model: function() {
    return this.store.filter('todo', function(todo) {
      return !todo.get('isCompleted');
    });
  },
  /***
   * Normally transitioning into a new route changes the template rendered into
   * the parent {{outlet}}, but in this case we'd like to reuse the existing
   * todos/index template. We can accomplish this by implementing the
   * renderTemplate method and calling render ourselves with the specific
   * template and controller options.
   ***/
  renderTemplate: function(controller) {
    this.render('todos/index', {controller: controller});
  }
});

Todos.TodosCompletedRoute = Ember.Route.extend({
  model: function() {
    return this.store.filter('todo', function(todo) {
      return todo.get('isCompleted');
    });
  },
  /***
   * see comment on TodosActiveRoute renderTemplate
   */
  renderTemplate: function(controller) {
    this.render('todos/index', {controller: controller});
  }
});