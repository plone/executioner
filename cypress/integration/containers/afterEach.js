import '../../support/commands';
import { deleteGuillotinaContainer } from '../../support/guillotina';


afterEach(() => {
    cy.fixture('container.json').as('container');
    deleteGuillotinaContainer();

});


