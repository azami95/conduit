describe ('first test', () =>  {
    beforeEach ('log in', () => {
        
        cy.logInToApp('azami.95@mail.ru', 'postavshik1995')
        //cy.visit('http://localhost:4200/login') 
    })
    
    it('test1', () => {
        cy.intercept('GET', 'articles?limit*', {fixture:'articles.json'}).as('articles')
        // cy.intercept('GET', 'https://api.realworld.io/api/tags').as('tags')
        cy.intercept('GET', 'https://api.realworld.io/api/tags', {fixture:'tags.json'}).as('tags')
        
        cy.wait('@tags').then(({response}) => {
            // cy.log(res.response.body.tags)
            cy.fixture('tags.json').then(data => {
                response.body.tags.forEach((el) => expect(data.tags).to.includes(el))
                
            })


           
        })
        cy.contains('a', 'Global Feed')
        .click()
        cy.wait('@articles').then(({response}) => {
            cy.fixture('articles.json').then(data => {
                const slugs = data.articles.map(article => article.slug)
                response.body.articles.forEach(el => expect(slugs).to.includes(el.slug))
                const titles = data.articles.map(article => article.title)
                response.body.articles.forEach(el => expect(titles).to.includes(el.title))
            })

            const obj = {
                name: 'Osim'
            }
            const obj1 = {
                name: 'Aziz'
            }
            expect(obj.name).to.eq(obj1.name)
        })
        
    


        cy.wait(1000)
        cy.contains('Global Feed').click()
        cy.get('app-favorite-button').then(listButton => {
            expect(listButton[0]).to.contain('17')
        })

        // cy.fixture('articles').then(file => {
        //     const articleLink = file.articles[2].slug
        //     cy.intercept('POST', '**/articles?limit/'+articleLink+'/favorite', file)
        // })
        cy.get('button').eq(2)
          .click()
        cy.wait(1000)
        cy.get('button').eq(2)
          .should('contain', '16')
    })
})