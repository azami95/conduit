

describe ('Articles lenght', () => {


    it ('', () => {

        cy.intercept('GET', 'https://api.realworld.io/api/articles?limit*').as('osim1')
        cy.logInToApp('azami.95@mail.ru', 'postavshik1995')

        cy.contains('Global Feed').click()

        cy.get('app-article-list').find('app-article-preview')
        .then(locator => {
            cy.wrap(locator).should('have.length', 10)

        cy.wait('@osim1')
        .then(allParams => {
            cy.wrap(locator).should('have.length', allParams.response.body.articlesCount)
        })    


        
        })


    })

    it ('', () => {
        cy.contains('azami')
    })
})