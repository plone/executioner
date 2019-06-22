import { Given } from "cypress-cucumber-preprocessor/steps";
import { When } from "cypress-cucumber-preprocessor/steps";
import { Then } from "cypress-cucumber-preprocessor/steps";

const name = 'root'
const password = 'root'

Given('admin login page', () => {
  cy.visit('/');
});

Given('guillotina home page', () => {
    cy.visit('/');
    cy.login();
});

When('I enter user credentials', () => {
        cy.get('#login-input-username-input').type(name);
        cy.get('#login-input-password-input').type(password);
    });

When('I log in', () => {

        cy.get('button[type="submit"]').click();
    });

When('I log out', () => {

        cy.get('pa-button[icon="log-out"]').click();
    });

Then('I see home page', () => {

        expect('pa-button[icon="log-out"]').to.exist
        expect('header').to.exist
     });

Then('I am in login page', () => {

        expect('#login-input-username-input').to.exist
        expect('#login-input-password-input').to.exist
        expect('button[type="submit"]').to.exist
     });
