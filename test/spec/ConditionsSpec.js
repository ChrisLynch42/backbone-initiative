define(['models/condition','collections/conditions'],function(Condition, Conditions) {

  return describe("ConditionList", function() {
    var conditionList = new Conditions();
    
    
    it("length of conditionList should be 1", function() {
      conditionModel = new Condition();
      conditionList.add(conditionModel);      
      expect(conditionList.length).toEqual(1);
    })

  });

});
