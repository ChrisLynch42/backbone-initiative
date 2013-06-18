define(
    [
    'text!templates/stats-template.html',
    'text!templates/character-template.html',
    'text!templates/character-add-template.html',
    'models/character',
    'models/combatSession',
    'collections/characters',
    'views/character'
    ], function(
      statsTemplate,
      characterTemplate,
      characterAddTemplate,
      Character,
      CombatSession,
      Characters,
      CharacterView) {

	var InitiativeView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#initiativeApplication',

		// Our template for the line of statistics at the bottom of the app.
		statsTemplate: _.template( statsTemplate ),
		addTemplate: _.template( characterTemplate ),
		buttonTemplate: _.template( characterAddTemplate ),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'click #addInitiative': 'createOnEnter',
			'click #prevInitiative': 'prevInitiative',
			'click #startSession': 'startSession',
			'click #endSession': 'endSession',
			'click #resetSession': 'resetSession',
			'click #nextInitiative': 'nextInitiative'
		},

		// At initialization we bind to the relevant events on the `Todos`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.
		initialize: function() {
      this.model = new CombatSession();
      this.model.set({"rounds": 0 });
      this.model.set({"combatants":0});
      this.characters = new Characters();
			this.characters.fetch();

			this.listenTo(this.characters, 'add', this.addOne);
			this.listenTo(this.characters, 'reset', this.addAll);
			this.listenTo(this.characters, 'destroy', this.addAll);
			this.listenTo(this.characters, 'all', this.render);
      this.addAll();

		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function() {
      var characterModel = new Character();
      this.$el.find('#newInitiative').html(this.addTemplate(characterModel.toJSON()));
      this.$el.find('#newInitiative').find(".commandColumn").append(this.buttonTemplate());
		},

    modifyConditionDuration:  function(characterModel,modifyValue) {
      if(characterModel) {
        var conditions = characterModel.get('conditions');
        if(conditions && conditions.length > 0) {
          for(i=0;i < conditions.length;i++) {
            var condition = conditions.at(i);
            if(condition) {
              var newValue = parseFloat(condition.get('duration'));
              newValue += modifyValue;
              if(newValue < 1) {
                condition.destroy();
              } else {
                condition.set('duration', newValue);
              }
            }
          }
          characterModel.save();
          
        }
      }
    },

    prevInitiative:  function() {
      var lastCharacter = this.characters.at(this.characters.length - 1);
      lastCharacter.set({'acted': 0});
      this.characters.sort();
      this.addAll();
    },

    nextInitiative:  function() {
      var firstCharacter = this.characters.at(0);
      if(firstCharacter) {
      firstCharacter.set({'acted': 1 });
      this.modifyConditionDuration(firstCharacter,-1);
      firstCharacter.save();
      this.characters.sort();
      firstCharacter = this.characters.at(0);      
        if(firstCharacter.get("acted") > 0) {
          var roundCount = this.model.get("rounds");
          roundCount++;
          this.model.set({'rounds':roundCount}); 
          this.characters.each(function(character) {
            character.set("acted", 0);
            character.save();
          });
        }
      }

      this.addAll();
    },

    startSession:  function() {
      this.$el.find("#newSection").css("display", "none");
      this.$el.find("#startSession").attr("disabled",true);
      this.$el.find("#startSession").css("display",'none');
      this.$el.find("#resetSession").css("display",'none');
      this.$el.find("#endSession").attr("disabled",false);
      this.$el.find("#endSession").css("display",'inline');
      this.$el.find("#prevInitiative").attr("disabled",false);
      this.$el.find("#prevInitiative").css("display",'inline');
      this.$el.find("#nextInitiative").attr("disabled",false);
      this.$el.find("#nextInitiative").css("display",'inline');
    },                

    endSession:  function() {
      this.$el.find("#newSection").css("display", "block");
      this.$el.find("#startSession").attr("disabled",false);
      this.$el.find("#startSession").css("display",'inline');
      this.$el.find("#endSession").attr("disabled",true);
      this.$el.find("#endSession").css("display",'none');
      this.$el.find("#prevInitiative").attr("disabled",true);
      this.$el.find("#prevInitiative").css("display",'none');
      this.$el.find("#nextInitiative").attr("disabled",true);
      this.$el.find("#nextInitiative").css("display",'none');
    },                

    resetSession:  function() {
      this.characters.destroy();
      this.addAll();
    },                

    

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function( characterModel ) {
			var view = new CharacterView({ model: characterModel });
			$('#characterList').append( view.render().el );
		},

		// Add all items in the **Todos** collection at once.
		addAll: function() {
      this.model.set({combatants: this.characters.length});
			this.$('#characterList').html('');
      this.characters.sort();
			this.characters.each(this.addOne, this);
		  this.$el.find("#footer").html(this.statsTemplate(this.model.toJSON()));
      
		},

		// Generate the attributes for a new Todo item.
		newAttributes: function() {
      var initString = $('#newInitiative .initiative').val().trim();
      var initNumber = parseFloat(initString);
      var hitPointNumber = $('#newInitiative .hitPoints').val().trim();

			return {
				name: $('#newInitiative .name').val().trim(),
				initiative: initNumber,
				acted: 0,
        hitPoints: hitPointNumber
			};
		},

		createOnEnter: function( e ) {

			this.characters.create( this.newAttributes() );
      this.characters.save();
      this.characters.sort();
      this.addAll();
      $('#newInitiative .name').val('');
      $('#newInitiative .initiative').val('');
		},

	});

  return InitiativeView;
});
