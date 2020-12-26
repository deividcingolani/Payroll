describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/");
    cy.contains("View").click();
    cy.contains("Add Income").click();
    cy.contains("Select").click();
    cy.contains("Add Income").click();
    cy.contains("Select").click();
    cy.contains("Submit and Close").click();
    cy.get("table").contains("td", "John Jones").should("be.visible");
    cy.get("table").contains("td", "Robert Williams").should("be.visible");
    cy.get("table").should("have.length", 1);
  });
});
