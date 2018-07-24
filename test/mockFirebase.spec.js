describe("mockFirebase", () => {

  // solo la login
  it("la función de logIn debe ser global", () => {
    assert.isFunction(logIn);
  });

  // solo facebook
  it("la función de facebookAccount debe ser global", () => {
    assert.isFunction(facebookAccount);
  });

  // solo google
  it("la función de googleAccount debe ser global", () => {
    assert.isFunction(googleAccount);
  });

});
