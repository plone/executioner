import { Given } from "cypress-cucumber-preprocessor/steps";
import { When } from "cypress-cucumber-preprocessor/steps";
import { Then } from "cypress-cucumber-preprocessor/steps";
import '../../support/commands';

Given('my container page', () => {
  cy.fixture('container.json').as('container').then((c) => {
  const mycontainer = c;
  })

  cy.visit('/+admin/db/' + mycontainer.id);
  cy.login();

});

When('I add a new behavior', () => {
  cy.xpath('//div[@class="list-container"][1]//pa-button[@icon="properties"]').should('be.visible').click();
  cy.xpath('(//div[@class="behaviors-container"]//pa-button[@icon="add"])[1]').should('be.visible').click();

});

Then('the behavior is enabled', () => {
  cy.visit('/+admin/db/' + container_id);
  cy.get('h4').contains('guillotina.behaviors');

});
