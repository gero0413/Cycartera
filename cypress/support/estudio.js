Cypress.Commands.add("flujoVisible", (flujo) => {
    let nameFlujo = Cypress.$(flujo).attr("name");
    if (Cypress.$(flujo).is(':visible')) {
        if (Cypress.$(flujo).hasClass("btn-circle-terminado")) {

        } else {
            cy.get(flujo).click();
            // alert("El flujo " + nameFlujo + " se encuentra visible");
        }
    } else {
        // alert("El flujo " + nameFlujo + " no se encuentra visible");
    }
})

Cypress.Commands.add("verificaDisabled", (campo) => {
    if (Cypress.$(campo).is(':disabled')) {
        return true;
    } else {
        return false;
    }
})

Cypress.Commands.add('fosyga', () => {
    cy.get('#div_fosyga #form_fosyga').each((element, index, list) => {
        cy.wrap(element).within(form => {
            const fileName = 'Otro.pdf';
            const fileType = 'application/pdf';
            const fileInput = ' .fileupload';
            for (let i = 0; i < 1; i++) {
                cy.upload_file(fileName, fileType, fileInput)
            }
        })
        cy.get('button[type=submit]').click()
        cy.get('.confirm').click()
    })
})