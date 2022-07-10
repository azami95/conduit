


describe ('API Request', () => {

    beforeEach ('log in', () => {

        
        cy.logInToApp('azami.95@mail.ru', 'postavshik1995')
        //cy.visit('http://localhost:4200/login') 
    })

    it ('', () => {

        

        const userCredentials = {
            user: {
            email: "azami.95@mail.ru",
             password: "postavshik1995"
            }
        }

        const bodyRequest = {
            article: {
                tagList: [],
                 title: "Working with API8",
                  description: "Practice makes it perfect",
                   body: "Almost there"
                }
            }

        
       
        cy.request('POST', 'https://api.realworld.io/api/users/login', userCredentials)
        .its('body').then(body => {
            const token = body.user.token
            cy.log(token)
            

            cy.request({
                url: 'https://api.realworld.io/api/articles/',
                headers: {'Authorization': 'Token '+token},
                method: 'POST',
                body: bodyRequest
        }).then(response => {
            console.log(response)
            expect(response.body.article.title).to.equal('Working with API8')
        })
        })

        

       
        })
    })