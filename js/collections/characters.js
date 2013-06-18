define(
    [
    'models/character'
    ], function(Character) {
  

	var Characters = Backbone.Collection.extend({

		// Reference to this collection's model.
    model: Character,

		// Save all of the initiative items under the `"initiatives"` namespace.
		localStorage: new Backbone.LocalStorage('character-collection'),

		comparator: function( character ) {
      var sortOrder = character.get("initiative");
      sortOrder = sortOrder * -1;
      if(character.get("acted") > 0) {
        sortOrder = sortOrder + 1000;
      }
			return sortOrder;
		},

    save: function() {
      var i = 0;
      for(i=0;i < this.length;i++ ) {
        if(this.at(i)) {
          this.at(i).save();
        }
      }
    },

    destroy: function() {
      this.fetch();
      while(this.length > 0) {
        this.at(0).destroy({wait: true});        
      }

    }
	});
  return Characters;
});
