
define(['models/condition','views/condition'],function(Condition, ConditionView) {
  describe("ConditionView", function() {

    beforeEach(function() {
      this.conditionModel = new Condition();
      this.conditionModel.set("name",'sam');
      this.conditionView = new ConditionView({model: this.conditionModel});
    });

    it("Condition view tagName should be 'div'", function() {
      expect(this.conditionView.tagName).toBe('div');
    });

    it("Condition view template should contain '<div class=\"columnLabel\">Duration</div>'", function() {
      conditionModel = new Condition();
      expect(this.conditionView.template(conditionModel.toJSON())).toContain('<div class=\"columnLabel\">Duration</div>');
    });

    it("Condition view updateButtonTemplate should contain 'updateCondition'", function() {
      conditionModel = new Condition();
      expect(this.conditionView.updateButtonTemplate(conditionModel.toJSON())).toContain('updateCondition');
    });

    it("Condition view addButtonTemplate should contain 'addCondition", function() {
      conditionModel = new Condition();
      expect(this.conditionView.addButtonTemplate(conditionModel.toJSON())).toContain('addCondition');
    });

    it("Condition view render method should be called", function() {
      sinon.spy(this.conditionView,'render');
      this.conditionView.render();
      expect(this.conditionView.render.called).toBeTruthy();
    });

    it("Condition view render method should contain update button and the text 'sam'", function() {
      this.conditionView.render();
      expect(this.conditionView.$el.html()).toContain('\"updateCondition\"');
      expect(this.conditionView.$el.html()).toContain('sam');
    });

    it("Condition view model destroy method should be called", function() {
      sinon.spy(this.conditionView.model,'destroy');
      this.conditionView.render();
      this.conditionView.$el.find('#removeCondition').trigger('click');
      expect(this.conditionView.model.destroy.called).toBeTruthy();
    });

  });
});
