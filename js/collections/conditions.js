define(['models/condition'], function(Condition) {
	var Conditions = Backbone.Collection.extend({

		model: Condition,
    
		comparator: function( condition ) {
			return condition.get('name');
		}
	});
  return Conditions;
});
