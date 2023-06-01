describe('Adding a new user in the system via email sending', () => {
    it('SHOULD successfully add a new user in the acccount management', () => {
        let accessToken;
        cy.request({
            method: 'POST', 
            url: 'https://innercircle.dev.tourmalinecore.com/api/auth/login',
            body: {
                login: "ceo@tourmalinecore.com", 
                password: "cEoPa$$wo1d"
            },
        })
        .then((response) => {
            accessToken = response.body.accessToken.value;
        })
        .then(() => {
        cy.request({
        method: 'POST',
        url: 'https://innercircle.dev.tourmalinecore.com/api/account-management/accounts/create',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        body: {
            firstName: 'Test1',
            lastName: 'Testov',
            middleName: 'Testovich',
            corporateEmail: "test@mailslurp.com",
            roleIds: [2]
        }
        })
    })
    })
})
    
                
            