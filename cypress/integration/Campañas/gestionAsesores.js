// Agregar asesor (es)
function agregaAsesor(agregar) {
    if(agregar == 1){
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("button#nueva-asignacion").click()
        cy.get('object').iframeLoaded().its('document').getInDocument('div#dialog-nueva-asignacion').then(() => {
            cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").click();
            cy.get('object').iframeLoaded().its('document').getInDocument('.multiselect-search').type("geral");
            cy.get('object').iframeLoaded().its('document').getInDocument("body").within(() => {
                cy.get("input[type=checkbox]").first().check()
            })
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name=horas]").eq(1).type("5", { force: true })
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name=no_dias]").eq(1).type("2")
            cy.get('object').iframeLoaded().its('document').getInDocument("button[type=submit]").eq(1).click()
        })

        cy.then(() => {
			cy.wait(2000)
            cy.get('object').iframeLoaded().its('document').getInDocument("button#nueva-asignacion").should('be.visible')
            cy.get('object').iframeLoaded().its('document').getInDocument("button#asignar-clientes").should('be.visible')
            cy.get('object').iframeLoaded().its('document').getInDocument("button#reasignar-clientes").should('be.visible')
        })
    }
}

// Editar asesor (es)
function editaAsesor(editar) {
    if(editar == 1){
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("button.editar-asignacion").first().click()
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=horas]").eq(1).clear().type(n_horas, { force: true })
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=no_dias]").eq(1).clear().type(n_dias)
        cy.get('object').iframeLoaded().its('document').getInDocument("button[type=submit]").eq(1).click()

        cy.then(() => {
            cy.get('object').iframeLoaded().its('document').getInDocument("#tabla-asesores > tbody > tr").first().should("contain", n_horas).and("contain", n_dias)
        })
    }
}

// Eliminar asesor (es)
function eliminaAsesor(eliminar) {
    if(eliminar == 1){
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("button.borrar-asignacion").first().click()

        // cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
        cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--cancel').click();
    }
}

export { agregaAsesor, editaAsesor, eliminaAsesor };