/// <reference types="Cypress" />

context("Reddit", () => {
  it("should do a list of actions", () => {
    cy.visit("https://www.reddit.com/");

    cy
      .get("#header-search-bar")
      .type("gaming")
      .should("have.value", "gaming")
      .type("{enter}");

    cy
      .get("span")
      .contains("Communities and users")
      .parent()
      .find("a")
      .first()
      .click();

    cy.get("a[data-click-id='body']").should($div => {
      const text = $div.text();
      console.log("text", text);
    });

    cy.get("log in").click();

    cy
      .contains("Username")
      .click()
      .type("test123@gmail.com");

    cy
      .contains("Password")
      .click()
      .type("Test123");

    const secondArticle = cy.get("#scrollerItem").eq(1);
    const upvote = secondArticle.get("[data-click-id='upvote']");
    const downvote = secondArticle.get("[data-click-id='downvote']");

    upvote.then($upvote => {
      if ($upvote.attr("aria-pressed") === "false") {
        upvote.click();
      } else {
        downvote.click();
      }
    });
  });
});
