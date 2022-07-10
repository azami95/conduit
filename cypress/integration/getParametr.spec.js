describe('', () => {
    it('', () => {
        cy.logInToApp('azami.95@mail.ru', 'postavshik1995')
        cy.intercept('GET', 'https://api.realworld.io/api/articles?limit*').as('text')
        cy.contains('Global Feed').click()
        cy.wait('@text')
        .then(({response})  => {
                const {articles} = response.body
                const newTitle = articles.map(el => el.title)
                cy.log(articles[0], newTitle)
                // cy.get('.article-preview h1').each(text => cy.wrap(text).invoke('text').then(text => expect(articles).includes(text)))

                const arr = [1, 2, 3, 4]
                const newArr = [...arr]
                const oneSentense = arr.forEach(el => el + 2 )
        })   
    })
})