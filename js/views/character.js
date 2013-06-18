define(
    [
    'text!templates/character-template.html',
    'text!templates/character-update-template.html',
    'collections/conditions',
    'views/condition'
    ], function(viewTemplate,viewButtonTemplate,Conditions,ConditionView) {

    var CharacterView = Backbone.View.extend({

      tagName:  'div',
      className: 'itemRow',

      template:  _.template(viewTemplate),
      buttonTemplate:  _.template(viewButtonTemplate),

      // The DOM events specific to an item.
      events: {
        'click .viewClick': 'edit',
        'click #updateCharacter': 'update',
        'click #returnCharacter': 'returnMe',
        'click #addCondition': 'addNewCondition',
        'click #removeCharacter': 'removeMe'
      },

      initialize: function() {
        if(this.model) {
          this.listenTo(this.model, 'change:initiative', this.render);
          this.listenTo(this.model, 'change:name', this.render);
          this.listenTo(this.model, 'visible', this.toggleVisible);
        }
      },

      render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        this.$el.find(".commandColumn").append(this.buttonTemplate());
        this.addAllConditions();
        return this;
      },

      // Switch this view into `"editing"` mode, displaying the input field.
      edit: function() {
        this.$el.find('.character').addClass('editing');
        this.$el.find('.initiative').focus();
      },

      // Close the `"editing"` mode, saving changes to the condition.
      update: function() {
        var value = this.$el.find('.name').val().trim();
        var initiativeValue = this.$el.find('.initiative').val().trim();
        var hitPointValue = this.$el.find('.hitPoints').val().trim();
        if ( value ) {
          this.model.set({ name: value, initiative: initiativeValue, hitPoints: hitPointValue });
          this.model.save();
        } else {
          this.clear();
        }
        this.returnMe();
      },

      returnMe: function() {
        this.$el.find('.character').removeClass('editing');
      },

      removeMe: function() {
        this.model.destroy();
      },

      addCondition: function(conditionModel)  {
        var conditionView = new ConditionView({model: conditionModel, parentView: this });
        var conditionList = this.$el.find(".conditionList");
        conditionView.render();
        conditionList.append(conditionView.el);
        
      },

      addNewCondition: function() {
        var conditionView = new ConditionView({parentView: this });
        var conditionList = this.$el.find(".conditionList");
        conditionView.render();
        conditionView.$el.addClass('editing');
        conditionList.append(conditionView.el);        
      },

      addAllConditions: function() {
        var conditionList = this.$el.find(".conditionList");
        conditionList.html('');
        this.model.get('conditions').each(this.addCondition, this);
      },

      // Remove the item, destroy the model from *localStorage* and delete its view.
      clear: function() {
        this.model.destroy();
      }
    });

    return CharacterView;
});
