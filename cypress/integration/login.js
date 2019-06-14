describe('Log in admin', function() {
    beforeEach(function () {
      cy.fixture('user.json').as('user');

    })
    it('Given admin login page', function() {

        cy.visit('/+admin/');
    });

    it('When I enter user credentials', function() {
        const user = this.user;
        cy.get('input[name="login"]').type(user.name);
        cy.get('input[name="password"]').type(user.password);
    });

    it('And log in', function() {

        cy.get('button[type="submit"]').click();
    });

    it('Then I see home page', function() {

        expect('pa-button[icon="log-out"]').to.exist
        expect('header').to.exist
     });

});
