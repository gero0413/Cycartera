function asignarClientes() {
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument("input[type=search]").type("progresiva")
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument("a").eq(3).click()
    cy.wait(2000)

    // asignar();
    // agregaAsesor();
    reasignar();
}

function asignar() {
    cy.get('object').iframeLoaded().its('document').getInDocument("button#asignar-clientes").click()
    cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
}

function agregaAsesor() {
    cy.get('object').iframeLoaded().its('document').getInDocument("button#nueva-asignacion").click()
    cy.get('object').iframeLoaded().its('document').getInDocument('div#dialog-nueva-asignacion').then(() => {
        cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").click()
        cy.get('object').iframeLoaded().its('document').getInDocument("body").within(() => {
            cy.get("input[type=checkbox]").eq(5).check()
        })
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=horas]").eq(1).type("5", { force: true })
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=no_dias]").eq(1).type("2")
        cy.get('object').iframeLoaded().its('document').getInDocument("button[type=submit]").eq(1).click()
    })
}

function reasignar() {
    cy.get('object').iframeLoaded().its('document').getInDocument("button#reasignar-clientes").click()
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument('div#div-formulario-plantilla').then(() => {
        // cy.get('object').iframeLoaded().its('document').getInDocument("a#volver").click()
        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=asesor_origen]").select("Asesor malla turnos 3")
        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_gestion]").select("SIN GESTION")
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=no_pasar]").type("1")
        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_usuario]").select("Usuario Pruebas")
        cy.get('object').iframeLoaded().its('document').getInDocument("button#reasignar").click()
    })
}

export default asignarClientes;