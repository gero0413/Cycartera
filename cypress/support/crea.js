Cypress.Commands.add('crear', () => {
    cy.get('#creacion_solicitud').within(() => {
        cy.get('select[name=tipo_solicitud]').select('Crédito 20 minutos');
        cy.wait(3000);
        cy.seleccionar("select[name=tipo_credito]");
        cy.root().submit()
    })

    let tipo_solicitud = Cypress.$("select[name=tipo_solicitud]").val();
    let tipo_credito = Cypress.$("select[name=tipo_credito]").val();

    // if (tipo_solicitud !== 0) {
    //     cy.get('#creacion_solicitud').within(() => {
    //         cy.seleccionar("select[name=tipo_credito]");
    //     })
    // }
    if (tipo_credito == 0) {
        cy.get('#creacion_solicitud').within(() => {
            cy.seleccionar("select[name=tipo_credito]");
        })
    }

})