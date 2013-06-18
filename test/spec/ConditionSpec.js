define(['models/condition'],function(Condition) {

  return describe("ConditionModel", function() {
    var conditionModel = new Condition();

    it("default name of condition model should be 'empty'", function() {
      expect(conditionModel.get("name")).toEqual('empty');
    });

    it("default effect of condition model should be 'no effect'", function() {
      expect(conditionModel.get("effect")).toEqual('no effect');
    });

    it("default duration of condition model should be 1", function() {
      expect(conditionModel.get("duration")).toEqual(1);
    });

  });

});
