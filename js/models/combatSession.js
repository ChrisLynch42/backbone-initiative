define([], function() {
    var CombatSession  = Backbone.Model.extend({

      localStorage: new Backbone.LocalStorage('combat-session'),

      defaults: {
        rounds: 0,
        started: 0,
        combatants: 0
      }

    });

    return CombatSession;

});

