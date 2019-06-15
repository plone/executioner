Cypress.Commands.add('autologin', () => {
  let api_url;

  api_url = 'http://localhost:8081/db/cycontainer';

  //cy.fixture('user.json').as('user');
  //const user = this.user;

  cy.request({
    method: 'POST',
    url: `${api_url}/@login`,
    headers: { Accept: 'application/json' },
    body: { login: 'root', password: 'root' },
  }).then(response => cy.setCookie('auth_token', response.body.token));
});

Cypress.Commands.add('login', () => {
    cy.fixture('user.json').as('user').then((u) => {
        const user = u;
        cy.get('input[name="login"]').should('be.visible').type(user.name);
        cy.get('input[name="password"]').should('be.visible').type(user.password);
        cy.get('button[type="submit"]').should('be.visible').click();
     })

});

