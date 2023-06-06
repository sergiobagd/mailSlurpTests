describe('Adding a new user in the system via email sending', () => {
  it('SHOULD successfully add a new user in the acccount management', () => {
    cy.viewport(1920, 1080);
    let accessToken;
    let mailSlurpEmailId;
    let mailSlurpEmail;
    cy.request({
      method: 'POST',
      url: 'https://innercircle.dev.tourmalinecore.com/api/auth/login',
      body: {
        login: 'ceo@tourmalinecore.com',
        password: 'cEoPa$$wo1d',
      },
    })
      .then((response) => {
        accessToken = response.body.accessToken.value;
      })
      .then(() => {
        cy.mailslurp()
          .then((mailslurp) => mailslurp.createInbox())
          .then((inbox) => {
            mailSlurpEmailId = inbox.id;
            mailSlurpEmail = inbox.emailAddress;
          })
          .then(() => {
            cy.request({
              method: 'POST',
              url: 'https://innercircle.dev.tourmalinecore.com/api/account-management/accounts/create',
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              body: {
                firstName: 'Test1',
                lastName: 'Testov2',
                middleName: 'Testovich3',
                corporateEmail: mailSlurpEmail,
                roleIds: [2],
              },
            });
          })
          .then(() => {
            cy.mailslurp()
              .then((mailslurp) => mailslurp.waitForLatestEmail(mailSlurpEmailId, 30000, true))
              .then((email) => {
                const regex = /(https:\/\/innercircle\.dev\.tourmalinecore\.com\/auth\/change-password\?passwordResetToken=[\w%\-]+&corporateEmail=[\w%\-]+@mailslurp\.com)/;
                const verificationLink = email.body.match(regex)[0];

                // visit the verification link and complete registration
                const newPassword = 'Testtest123!';
                cy.visit(verificationLink);

                cy.get('#password').type(newPassword);
                cy.contains('Done')
                  .click();
                cy.contains('Sign Out')
                  .click();
                cy.request({
                  method: 'POST',
                  url: `https://innercircle.dev.tourmalinecore.com/api/auth/reset?corporateEmail=${mailSlurpEmail}`,
                });
                cy.mailslurp()
                  .then((mailslurp) => mailslurp.waitForLatestEmail(mailSlurpEmailId, 30000, true))
                  .then((email2) => {
                    const regex2 = /(https:\/\/innercircle\.dev\.tourmalinecore\.com\/auth\/change-password\?passwordResetToken=[\w%\-]+&corporateEmail=[\w%\-]+@mailslurp\.com)/;
                    const verificationLink2 = email2.body.match(regex2)[0];

                    // visit the verification link and complete registration
                    const newPassword2 = 'Testtest1234!';
                    cy.visit(verificationLink2);
                    cy.get('#password').type(newPassword2);
                    cy.contains('Done')
                      .click();
                  });
              });
          });
      });
  });
});
