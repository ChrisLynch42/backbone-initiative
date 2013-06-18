define(['models/condition','collections/conditions'], function(Condition,Conditions) {
	var Character = Backbone.Model.extend({

		//localStorage: new Backbone.LocalStorage('initiative'),
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			initiative: 0,
			name: 'empty',
      acted: 0,
      hitPoints: 0

		},
    
    initialize:  function() {
      if(typeof this.get('conditions') == 'undefined') {
        this.set('conditions',new Conditions());
      }
    }, 

    parse: function(response) {
      response.conditions = new Conditions(response.conditions);
      return response;
    },

	});
	
  return Character;
});
