describe('Adding a new user in the system via email sending', () => {
    it('SHOULD successfully authenticate in dev', () => {
        cy.request({
            method: 'POST', 
            url: 'https://innercircle.dev.tourmalinecore.com/auth',
            body: {
                login: "ceo@tourmalinecore.com", 
                password: "cEoPa$$wo1d"
            },
        }).then((response) => {
            const accessToken = response.body.accessToken;
        })
    })

    it('SHOULD successfully add a new user in the acccount management', () => {
        cy.request({
            method: 'POST',
            url: 'https://innercircle.dev.tourmalinecore.com/api/account-management/accounts/create',
            headers: {
                Authorization: 'Bearer ${accessToken}'
            },
            body: {
                firstName: 'Test',
                lastName: 'Testov',
                middleName: 'Testovich',
                corporateEmail: "test@mailslurp.com",
                roleIds: [2]
            }
        })
    })
})

    
                
            