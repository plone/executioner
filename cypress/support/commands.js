Cypress.Commands.add('autologin', () => {
  let api_url;

  api_url = Cypress.env('guillotina');

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
        cy.get('#login-input-username-input').should('be.visible').type(user.name);
        cy.get('#login-input-password-input').should('be.visible').type(user.password);
        cy.get('button[type="submit"]').should('be.visible').click();
     })

});

