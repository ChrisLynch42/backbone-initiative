
define(['collections/characters','views/initiative'],function(Characters, InitiativeView) {
  describe("InitiativeView (The main application view)", function() {

    beforeEach(function() {
      this.initiativeView = new InitiativeView();
    });

    it("Initiative view tagName should be 'div'", function() {
      expect(this.initiativeView.tagName).toBe('div');
    });

  });
});
