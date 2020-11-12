describe('Fill out the form and submit it', function () {
    it('Get the Name input and type a name in it.', function () {
        cy.visit('http://localhost:3000/')
        cy.contains('Name:').click()

        cy.get('.name-input')
            .type('John Doe')
            .should('have.value', 'John Doe')
    })
    it('Get the Email input and type an email address in it', function () {
        cy.visit('http://localhost:3000/')
        cy.contains('Email:').click()

        cy.get('.email-input')
            .type('john.doe@yahoo.net')
            .should('have.value', 'john.doe@yahoo.net')
    })
    it('Get the password input and type a password in it', function () {
        cy.visit('http://localhost:3000/')
        cy.contains('Password:').click()

        cy.get('.password-input')
            .type('lovetogetbuttfuckedonthedaily123')
            .should('have.value', 'lovetogetbuttfuckedonthedaily123')
    })
    it('Set up a test that will check to see if a user can check the terms of service box', function () {
        cy.visit('http://localhost:3000/')
        // cy.contains('Terms of service:').click()

        cy.get('.tos-input')
            .click()
            .should('have.value', 'on')
    })
    it('Check to see if a user can submit the form data', function () {
        cy.visit('http://localhost:3000/')
        cy.contains('Submit')

        cy.get('button')
            .should('have.disabled', 'false')
    })
    
})