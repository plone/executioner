import { Given } from "cypress-cucumber-preprocessor/steps";
import { When } from "cypress-cucumber-preprocessor/steps";
import { Then } from "cypress-cucumber-preprocessor/steps";

const name = 'root'
const password = 'root'

Given('admin login page', () => {
  cy.visit('/+admin/');
});

Given('guillotina home page', () => {
    cy.visit('/+admin/');
    cy.get('input[name="login"]').type(name);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
});

When('I enter user credentials', () => {
        cy.get('input[name="login"]').type(name);
        cy.get('input[name="password"]').type(password);
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

        expect('input[name="login"]').to.exist
        expect('input[name="password"]').to.exist
        expect('button[type="submit"]').to.exist
     });
