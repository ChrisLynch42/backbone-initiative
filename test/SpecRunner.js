

require.config({
  baseUrl:  "../js/",
  paths: {
    text:  "lib/text",
    models:  "models",
    collections: "collections",
    views: "views",
    templates: "templates"
  }

  
});



require([], function(){
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };
    $(function() {
      require(
        ["../test/spec/ConditionSpec",
        "../test/spec/ConditionsSpec",
        "../test/spec/ConditionViewSpec",
        "../test/spec/CharacterSpec",
        "../test/spec/CharactersSpec",
        "../test/spec/CombatSessionSpec",
        "../test/spec/CharacterViewSpec",
        "../test/spec/InitiativeViewSpec"
        ],
        function() {
          jasmineEnv.execute();
      });
    });

});
