import '../../support/commands';
import { createGuillotinaContainer } from '../../support/guillotina';

beforeEach(() => {
  cy.fixture('user.json').as('user');
  cy.fixture('container.json').as('container');
  createGuillotinaContainer();
});


