


describe('Testando endpoints da API', () => {

    describe('Usuário', () => {
        
        it('Entrando com usuário válido', () => {
            cy.request({
                method: 'POST',
                url : '/user',
                failOnStatusCode: false,
                body: {
                    "user": "admin",
                    "password": "admin123"
                } 
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('status', 1);
                expect(response.body).to.have.property('response', 'Usuário logado com sucesso');
                Cypress.env('token', 'Bearer ' + response.body.token);
                cy.log(Cypress.env('token'));
            });
        });

        it('Entrando com usuário sem senha', () => {
            cy.request({
                method: 'POST',
                url : '/user',
                failOnStatusCode: false,
                body: {
                    "user": "admin",
                } 
            }).then((response) => {
                expect(response.status).to.eq(422)
                expect(response.body).to.have.property('status', 0);
                expect(response.body).to.have.property('response', 'A senha é obrigatória!');
            });
        });

        it('Entrando com usuário sem cadastro', () => {
            cy.request({
                method: 'POST',
                url : '/user',
                failOnStatusCode: false,
                body: {
                    "user": "teste",
                    "password": "teste123"
                } 
            }).then((response) => {
                expect(response.status).to.eq(403)
                expect(response.body).to.have.property('status', 0);
                expect(response.body).to.have.property('response', 'Usuário não encontrado, por favor reveja suas credenciais!');
            });
        });

    });

    describe('Analíses', () => {

        it('Token Inválido', () => {
            cy.request({
                method: 'GET',
                url : '/analysis/1041692465895996',
                failOnStatusCode: false,
                headers: {
                    'Authorization': 'Bearer aadsddsdasd'
                }
            }).then((response) => {
                expect(response.status).to.eq(401)
                expect(response.body).to.have.property('status', 0);
                expect(response.body).to.have.property('response','Token invalido!!');
            });
        });

        it('Listando Analíse com ID válido', () => {
            cy.request({
                method: 'GET',
                url : '/analysis/1041692465895996',
                headers: {
                    'Authorization': Cypress.env('token')
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('status', 1);
                expect(response.body).to.have.property('response');
            });
        });

        it('Listando Analíse com ID que não existe', () => {
            cy.request({
                method: 'GET',
                url : '/analysis/aabsdf',
                headers: {
                    'Authorization': Cypress.env('token')
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('status', 1);
                expect(response.body).to.have.property('response', 'Não foi encontrado nenhum concorrente com esse ID');
            });
        });

    });


});