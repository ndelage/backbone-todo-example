var AllDone = {};

AllDone.Todo = Backbone.Model.extend({});

AllDone.TodoView = Backbone.View.extend({
  tagName: "li",
  className: "todo",

  events: {
    "click .delete" : "removeTodo"
  },

  initialize: function(options) {
    this.template = _.template($('#todo-template').html());
    this.render();
  },

  render: function() {
    var data = this.model.attributes;
    this.$el.html(this.template(data));
  },

  removeTodo: function() {
    console.log("Remove!");
  }
});


AllDone.TodoCollection = Backbone.Collection.extend({
  model : AllDone.Todo,
});


AllDone.TodoListView = Backbone.View.extend({
  tagName: "div",
  className: "todo-list",

  initialize: function(options) {
    _.bindAll(this, "render");
    this.template = _.template($('#todo-list-template').html());

    this.collection.on('add', this.render);
    this.collection.on('change', this.render);
    this.render();
  },

  render: function() {
    this.$el.html(this.template());

    this.collection.models.forEach(function(model){
      var todoView = new AllDone.TodoView({model: model});
      this.$el.find("ul").append(todoView.$el);
    }, this);
  }
});

AllDone.Router = Backbone.Router.extend({
  routes : {
    '' : "index",
    'todos': "todos"
  },

  initialize: function() {
    AllDone.todos = new AllDone.TodoCollection();
    AllDone.todos.add(new AllDone.Todo({title: "Mow the Lawn"}));
  },

  index: function() {
    $("#container").html("<h1>Welcome!</h1><a href='#todos'>Todos</a>");
  },

  todos: function(random) {
    var todoListView = new AllDone.TodoListView({collection: AllDone.todos});

    $("#container").html(todoListView.el);
  }

});


$(document).ready(function() {
  var router = new AllDone.Router();
  Backbone.history.start();
});
