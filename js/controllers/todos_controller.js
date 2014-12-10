
Todos.TodosController = Ember.ArrayController.extend({
  actions: {
    createTodo: function () {
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      this.set('newTitle', '');

      todo.save();
    },
    clearCompleted: function() {
      var completed = this.filterBy('isCompleted', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  },
  hasCompleted: function() {
    return this.get('completed') > 0;
  }.property('completed')
  ,
  /***
   * The completed and clearCompleted methods both invoke the filterBy method,
   * which is part of the ArrayController API and returns an instance of
   * EmberArray which contains only the items for which the callback returns true.
   * http://emberjs.com/api/classes/Ember.ArrayController.html#method_filterProperty
   * http://emberjs.com/api/classes/Ember.Array.html
   */
  completed: function() {
    return this.filterBy('isCompleted', true).get('length');
  }.property('@each.isCompleted')// not sure about "@each"... implies an array maybe
  ,
  remaining: function() {
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted')
  ,
  inflection: function() {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'item' : 'items';
  }.property('remaining')
  ,
  allAreDone: function(key, value) {
    if (value === undefined) {
      return !!this.get('length') && this.isEvery('isCompleted');
    } else {
      this.setEach('isCompleted', value);
      this.invoke('save');
      return value;
    }
  }.property('@each.isCompleted')
});