

describe ('API calls using Cypress', () => {
    beforeEach('', () => {
        cy.logInToApp('azami.95@mail.ru', 'postavshik1995')
    })


    const usersCredentials = 
    {
        user: {
            email: "azami.95@mail.ru",
             password: "postavshik1995"
            }
    }

    const bodyRequest = {
    article: {
            tagList: [],
             title: "Oss8",
              description: "API calls using Cypress",
               body: "API is cool!"
            }
        }
    
    it ('', () => {
        cy.intercept('https://api.realworld.io/api/users/login').as('login')
        cy.request('POST', 'https://api.realworld.io/api/users/login', usersCredentials)
        .its('body').then(body => {
            cy.log(body)
            console.log(body)
            const {token} = body.user
            cy.log(token)
            cy.wait('@login').then((osim) => {
                expect(osim.request.body.user.email).to.eq('azami.95@mail.ru')
            })
        cy.request({
            url: 'https://api.realworld.io/api/articles/',
            headers: { 'Authorization': 'Token '+token},
            method: 'POST',
            body: bodyRequest
        }).then( ({body}) => {
            cy.log(body)
            const username = body.article.author.username
            // expect(response.status).to.equal(200)
            expect(username).to.eq('Azami.95')
        })    

         })
 
    })

})