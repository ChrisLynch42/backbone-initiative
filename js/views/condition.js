define(
    [
    'text!templates/condition-template.html',
    'text!templates/condition-update-template.html',
    'text!templates/condition-add-template.html',
    'models/condition'
    ], function(viewTemplate,buttonUpdateTemplate,buttonAddTemplate,Condition) {

    var ConditionView = Backbone.View.extend({

      tagName:  'div',
      className: 'itemRow',
      newCondition: false,
      template:  _.template(viewTemplate),
      updateButtonTemplate:  _.template(buttonUpdateTemplate),
      addButtonTemplate:  _.template(buttonAddTemplate),

      // The DOM events specific to an item.
      events: {
        'click .conditionClick': 'edit',
        'click #updateCondition': 'updateMe',
        'click #returnCondition': 'returnMe',
        'click #removeCondition': 'removeMe'
      },

      // The InitiativeView listens for changes to its model, re-rendering. Since there's
      // a one-to-one correspondence between a **Initiative** and a **InitiativeView** in this
      // app, we set a direct reference on the model for convenience.
      initialize: function() {
        if(this.model) {
        } else {
          this.model = new Condition();
          this.newCondtion = true;
        }
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'visible', this.toggleVisible);
      },

      // Re-render the titles of the condition item.
      render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        if(this.newCondition) {
          this.$el.find(".commandColumn").append(this.addButtonTemplate());
        } else {
          this.$el.find(".commandColumn").append(this.updateButtonTemplate());
        }
        return this;
      },

      // Switch this view into `"editing"` mode, displaying the input field.
      edit: function() {
        this.$el.addClass('editing');
        this.$el.find('.duration').focus();
      },

      // Close the `"editing"` mode, saving changes to the condition.
      updateMe: function() {
        var value = this.$el.find('.duration').val().trim();
        var nameValue = this.$el.find('.conditionName').val().trim();
        var effectValue = this.$el.find('.effect').val().trim();
        if ( value ) {
          this.model.set({ name: nameValue, effect: effectValue, duration: value });
          this.options.parentView.model.get('conditions').add(this.model);
          this.options.parentView.model.save({wait: true, silent: true});
          this.options.parentView.addAllConditions();
        } else {
          this.clear();
        }
        this.returnMe();
      },

      returnMe: function() {
        this.$el.removeClass('editing');
      },

      removeMe: function() {        
        this.model.destroy({wait: true});
        if(this.options.parentView) {
          this.options.parentView.model.save({wait: true});
          this.options.parentView.addAllConditions();
        }
      }

    });

    return ConditionView;
});
