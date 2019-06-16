import { When } from "cypress-cucumber-preprocessor/steps";
import { Then } from "cypress-cucumber-preprocessor/steps";

When('I open permission editor', () => {
    cy.xpath('//div[@class="list-container"][1]//pa-button[@icon="sharing"]').should('be.visible').click();
   });

When('I save changes', () => {
    cy.xpath('//button[@aria-label="Save"]').should('be.visible').click();
   });

When('I share with a user', () => {
    cy
      .readFile('./cypress/fixtures/permission.json')
      .then((str) => {
        // parse the object into string literal
         const share = JSON.stringify(str);
         const s = share.replace(/{/gi, '{{}');
         const ss = s.replace(/,/gi, ',{enter}');
         cy.get('textarea').clear();
         cy.get('textarea').type(ss);
      })
   });

Then('permissions updated toast is displayed', () => {
        cy.get('header.o-toast-header').should('be.visible');
        cy.get('header.o-toast-header').should('contain','Permissions updated');
    });


