

describe ('API calls using Cypress', () => {
    it ('first test', () => {
        const logInApp = {
            user: {
                email: "azami.95@mail.ru", 
                password: "postavshik1995"
            },
            token: null
        }


        cy.request('POST', 'https://api.realworld.io/api/users/login', logInApp)
            .its('body.user.token').then(token => {
                logInApp.token = token
            }).then(() => cy.log(logInApp.token))
            // .then(xhr => cy.log(xhr.body.user.token))
    })
})