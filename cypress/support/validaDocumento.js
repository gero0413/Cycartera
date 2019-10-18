Cypress.Commands.add("validaDocumento", () => {
    let documento = Math.floor(Math.random() * 1000000000 + 1000000000);
    let nit = Math.floor(Math.random() * 100000000 + 800000000);
    let tipo_doc = Cypress.$("select[name=tipo_documento]").val();

    cy.get('#busqueda_solicitud').within(() => {
        // cy.get('input[name=sc_cliente]').type('364092,1069475365,GARCIA,NAVARRO,JUAN,DAVID,M,19921227,O+')
        cy.get('select').select('Cédula ciudadanía')
        cy.get('#documento').type(documento)
        cy.root().submit()
    })

    // if (tipo_doc == 0) {
    //     cy.seleccionar("select[name=tipo_documento]");
    // }

    // if (tipo_doc == 1) {
    //     cy.get("input[name=documento]").type(documento);
    //     cy.get('#busqueda_solicitud > [align="center"] > .btn').click();
    //     cy.then(() => {
    //         cy.crear();
    //     })
    // }



})