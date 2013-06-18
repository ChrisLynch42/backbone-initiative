define([], function() {
    var Condition = Backbone.Model.extend({



      defaults: {
        name: 'empty',
        effect: 'no effect',
        duration: parseFloat(1)
      }

    });

    return Condition;

});

