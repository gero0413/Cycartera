describe("Diligenciar solicitud", function() {

    it("Diligenciar", function() {
        ingresa();
		//agregaAsesor();
        //asignar();    
        //reasignar();
    })
})

function ingresa() {
    cy.entrar();
    cy.login("adminpqr3", "123{enter}");
    cy.navbar("Campaña");

    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument("input[type=search]").type("Test Geral Manual")
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument("a[title='Asignar asesores']").first().click()
    cy.wait(2000)
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
            cy.get("input[type=checkbox]").eq(2).check()
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
        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=asesor_origen]").select("Asesor Geraldine")
        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_gestion]").select("SIN GESTION")
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=no_pasar]").type("8")
        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_usuario]").select("Asesor Geral 2")
        cy.get('object').iframeLoaded().its('document').getInDocument("button#reasignar").click()
		cy.wait(2000)
		cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
    })
}