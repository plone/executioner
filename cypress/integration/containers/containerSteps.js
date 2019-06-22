import { Given } from "cypress-cucumber-preprocessor/steps";
import { When } from "cypress-cucumber-preprocessor/steps";
import { Then } from "cypress-cucumber-preprocessor/steps";
import '../../support/commands';
import { deleteGuillotinaContainer, createGuillotinaContainer } from '../../support/guillotina';

const container_new_title = 'cycontainer updated'

Given('admin user in db page', () => {
  cy.visit('/db');
  cy.login();
});

Given('an existing container', () => {
  createGuillotinaContainer();
});

When('I delete the container', () => {
        cy.get('pa-button[icon="delete"]').click();
    });

When('I add a new container', () => {
    cy.fixture('container.json').as('container').then((c) => {
       const mycontainer = c;
       cy.get('pa-button[icon="add"]').click();
       cy.get('a').contains('Container').click();
       cy.get('#id-input-Container-input').type(mycontainer.id);
       cy.get('#title-input-Container-input').type(mycontainer.id);
       cy.get('button[aria-label="Save"]').click();
     })

   });

When('I select the container', () => {
    cy.fixture('container.json').as('container').then((c) => {
           const mycontainer = c;
           cy.get('.list-container li').should('be.visible').contains(mycontainer.id).click({ force: true });
         })

    });

When('I open editor mode', () => {
        cy.get('pa-button[icon="pen"]').click();
        cy.get('button[aria-label="Form editor"]').click();
    });

When('I update the title', () => {
        cy.get('textarea').clear();
        cy.get('textarea').type("{");
        cy.get('textarea').type('"title":"' + container_new_title + '"');
        cy.get('textarea').type("}");
        cy.get('button[aria-label="Save"]').click();
    });

Then('container id is shown', () => {
     cy.fixture('container.json').as('container').then((c) => {
       const mycontainer = c;
       cy.get('div.view').should('be.visible');
       cy.get('h2').should('contain', mycontainer.id);
       cy.get('dd').should('contain', mycontainer.name);
     })

   });

Then('container name is shown', () => {
      cy.fixture('container.json').as('container').then((c) => {
           const mycontainer = c;
           cy.get('dt').should('contain', 'Title');
           cy.get('dd').should('contain', mycontainer.name);
       })

    });

Then('container uid is shown', () => {
        cy.get('dt').should('contain', 'UID');
    });

Then('the new title is displayed in the details', () => {
    cy.fixture('container.json').as('container').then((c) => {
               const mycontainer = c;
               cy.get('.list-container li').contains(mycontainer.id).click();
           })

        cy.get('dd').should('contain', container_new_title);
    });
