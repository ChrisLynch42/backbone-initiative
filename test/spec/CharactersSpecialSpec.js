
  describe("CharacterList (List of characters in order or initiative)", function() {
     
    beforeEach(function() {
      this.characterList = new Characters();
      this.characterList.localStorage._clear();
      this.characterOne = new Character({initiative: 1, name: 'one', acted: 0});
      this.characterTwo = new Character({initiative: 7, name: 'two', acted: 0});
      this.characterThree = new Character({initiative: 20, name: 'three', acted: 1});
      this.characterList.add(this.characterOne);
      this.characterList.add(this.characterTwo);
      this.characterList.add(this.characterThree);
    });

    
    it("in memory length of characterList should be '3'", function() {
      expect(this.characterList.length).toEqual(3);
    });

    it("the first character in the list should have a name of 'two'", function() {
      var characterModel = this.characterList.at(0);
      expect(characterModel.get("name")).toEqual("two");
    });

    it("the the third character in the list should have a name of 'three'", function() {
      var characterModel = this.characterList.at(2);
      expect(characterModel.get("name")).toEqual("three");
    });

    it("the the first character in the list should have a name of 'three' when acted set to '0' for character position '2' in characterlist", function() {
      var characterModel = this.characterList.at(2);
      characterModel.set("acted", 0);
      this.characterList.sort();
      characterModel = this.characterList.at(0);
      expect(characterModel.get("name")).toEqual("three");

    });

    it("in memory length of characterList should be '0'", function() {
      this.characterList.reset();
      expect(this.characterList.length).toEqual(0);
    });

    it("save to localstorage and fetch - length of characterList should be '3'", function() {
      this.characterList.save({wait: true});
      this.characterList.fetch();
      expect(this.characterList.length).toEqual(3);
    });

    it("fetch from local storage - length of characterList should be '3'", function() {
      this.characterList.fetch();
      expect(this.characterList.length).toEqual(3);
    });

    it("destroy then fetch - length of characterList should be '0'", function() {
      this.characterList.destroy({wait: true});
      this.characterList.fetch();
      expect(this.characterList.length).toEqual(0);
    });

  });

