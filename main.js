require.config({
  baseUrl:  "./js/",
  paths: {
    text:  "lib/text",
    models:  "models",
    collections: "collections",
    views: "views",
    templates: "templates"
  }

});


require(['views/initiative'], function(InitiativeView){
  var app = new InitiativeView();
  app.$el.find('#startSession').attr('disabled',false);
});
