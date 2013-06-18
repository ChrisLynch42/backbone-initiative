define(['models/combatSession'],function(CombatSession) {
  return describe("CombatSessionModel", function() {
    var combatSessionModel = new CombatSession();

    it("default rounds of combat session model should be 0", function() {
      expect(combatSessionModel.get("rounds")).toEqual(0);
    });

    it("default started of combat session model should be 0", function() {
      expect(combatSessionModel.get("started")).toEqual(0);
    });

  });
});
