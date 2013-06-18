define(['models/character'],function(Character) {
  return describe("CharacterModel", function() {
    var characterModel = new Character();

    it("default initiative of character model should be 0", function() {
      expect(characterModel.get("initiative")).toEqual(0);
    });

    it("default name of character model should be 'empty'", function() {
      expect(characterModel.get("name")).toEqual('empty');
    });

    it("default conditions of character model should not be null", function() {
      expect(characterModel.get('conditions')).not.toBe(null);
    });

    it("default conditions of character model should be defined", function() {
      expect(characterModel.get('conditions')).toBeDefined();
    });

    it("default conditions.length of character model should be defined", function() {
      expect(characterModel.get('conditions').length).toBeDefined();
    });

    it("default acted of character model should be 0", function() {
      expect(characterModel.get("acted")).toBe(0);
    });

  });
});
