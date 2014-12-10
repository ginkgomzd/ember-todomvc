
/***
 * Ember Getting Started Guide
 * http://emberjs.com/guides/getting-started/
 *
 * Sample implementation of the ToDoMVC Application
 * http://todomvc.com/
 ***/
window.Todos = Ember.Application.create();

Todos.ApplicationAdapter = DS.FixtureAdapter.extend();