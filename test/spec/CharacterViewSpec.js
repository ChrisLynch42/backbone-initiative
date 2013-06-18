
define(['models/character','views/character'],function(Character, CharacterView) {
  describe("CharacterView", function() {

    beforeEach(function() {
      this.characterModel = new Character();
      this.characterModel.set("name",'sam');
      this.characterView = new CharacterView({model: this.characterModel});
    });

    it("Character view tagName should be 'div'", function() {
      expect(this.characterView.tagName).toBe('div');
    });

    it("Character view template should contain '<div class=\"columnLabel viewClick\">Initiative</div>'", function() {
      characterModel = new Character();
      expect(this.characterView.template(characterModel.toJSON())).toContain('<div class=\"columnLabel viewClick\">Initiative</div>');
    });

    it("Character view buttonTemplate should contain 'id=\"updateCharacter\"'", function() {
      characterModel = new Character();
      expect(this.characterView.buttonTemplate(characterModel.toJSON())).toContain('id=\"updateCharacter\"');
    });

    it("Character view render method should be called", function() {
      sinon.spy(this.characterView,'render');
      this.characterView.render();
      expect(this.characterView.render.called).toBeTruthy();
    });

    it("Character view render method should contain update button and the text 'sam'", function() {
      this.characterView.render();
      expect(this.characterView.$el.html()).toContain('\"updateCharacter\"');
      expect(this.characterView.$el.html()).toContain('sam');
    });

    it("Character view model destroy method should be called", function() {
      sinon.spy(this.characterView.model,'destroy');
      this.characterView.render();
      this.characterView.$el.find('#removeCharacter').trigger('click');
      expect(this.characterView.model.destroy.called).toBeTruthy();
    });

  });
});
