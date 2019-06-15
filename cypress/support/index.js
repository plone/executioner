require('cypress-xpath')
import './commands';
import { setupGuillotina, tearDownGuillotina } from './guillotina';

beforeEach(function() {

    setupGuillotina();
});

afterEach(function() {

    cy.clearCookies();

});
