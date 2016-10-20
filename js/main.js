(function() {

window.App = {
	Models: {},
	Collections: {},
	Views: {}
};

window.template = function(id) {
	return _.template( $('#' + id).html() );
};


// Person Model
App.Models.Person = Backbone.Model.extend({
	defaults: {
		name: 'Guest User',
		mf:'',
		age: '',
		occupation: ''
	}
});

// A List of People
App.Collections.People = Backbone.Collection.extend({
	model: App.Models.Person
});


// View for all people
App.Views.People = Backbone.View.extend({
	tagName: 'ul',
	
	initialize: function() {
		this.collection.on('add', this.addOne, this);
	},
	
	render: function() {
		this.collection.each(this.addOne, this);

		return this;
	},

	addOne: function(person) {
		var personView = new App.Views.Person({ model: person });
		this.$el.append(personView.render().el);
	}
});

// The View for a Person
App.Views.Person = Backbone.View.extend({
	tagName: 'li',

	template: template('personTemplate'),	
	
	initialize: function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
		
	},
	
	events: {
	 'click .edit' : 'editPerson',
	 'click .delete' : 'DestroyPerson',
	 

	},


	
  
	
	editPerson: function(){

		var newName = prompt("Please enter the new name", this.model.get('name'));
		if (!newName) return;
		this.model.set('name', newName);
		var newAge = prompt("Please enter the New age", this.model.get('age'));
		if (!newAge) return;
		this.model.set('age', newAge);
		var newOccupation = prompt("Please enter the New Occupation", this.model.get('occupation'));
		if (!newOccupation) return;
		this.model.set('occupation', newOccupation);

		
	},
	
	DestroyPerson: function(){
		this.model.destroy();
	},
	
	remove: function(){
		this.$el.remove();
	},
	

	
	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
		return this;
	},
});


App.Views.AddPerson = Backbone.View.extend({
	el: '#addPerson',
	tagname: 'input',


	events: {
		'submit': 'submit',
		'click input': 'background'
	},

	submit: function(e) {
		e.preventDefault();
		var newPersonName = $(e.currentTarget).find('input[type=text]').val();
		var newPersonGender = $(e.currentTarget).find('input[type=radio]:checked').val();
		var newPersonAge = $(e.currentTarget).find('.age[type=text]').val();
		var newPersonOccupation = $(e.currentTarget).find('.occupation[type=text]').val();

		this.$el.find("input.name").css("background-color", "white");
		// console.log(this.$el);
		this.$el.find("input.age").css("background-color", "white");
		this.$el.find("input.occupation").css("background-color", "white");

		
		var person = new App.Models.Person({ name: newPersonName, mf:newPersonGender, age:newPersonAge, occupation: newPersonOccupation });
		this.collection.add(person);

	},
	background: function(){

		// this.$el = this.$el.css("background-color", "red");
		// var newPersonName = $(e.currentTarget).find('input[type=text]')
		this.$el.find("input.name").css("background-color", "red");
		// console.log(this.$el);
		this.$el.find("input.age").css("background-color", "blue");
		this.$el.find("input.occupation").css("background-color", "green");

		
	},
});


var peopleCollection = new App.Collections.People([
	{
		name: 'Mohit Jain',
		mf:'female',
		age: 26,
		occupation:'construction'
	},
	{
		name: 'Taroon Tyagi',
		mf:'male',
		age: 25,
		occupation: 'web designer'
	},
	{
		name: 'Rahul Narang',
		mf:'male',
		age: 26,
		occupation: 'Java Developer'
	}
]);
var addPersonView = new App.Views.AddPerson({ collection: peopleCollection });
peopleView = new App.Views.People({ collection: peopleCollection });
$(document.body).append(peopleView.render().el);
})();
