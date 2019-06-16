import { Given } from "cypress-cucumber-preprocessor/steps";
import { When } from "cypress-cucumber-preprocessor/steps";
import { Then } from "cypress-cucumber-preprocessor/steps";
import '../../support/commands';

Given('my container page', () => {
  cy.fixture('container.json').as('container').then((c) => {
  const mycontainer = c;
  cy.visit('/+admin/db/' + mycontainer.id);
  cy.login();
  })
});

Then('updated toast is displayed', () => {
        cy.get('header.o-toast-header').should('be.visible');
        cy.get('header.o-toast-header').should('contain','Updated');
    });
