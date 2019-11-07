describe("test", function() {
    it("prueba", function() {
        ingresa();
        consultaMalla();
        importar();
    })
})

function ingresa() {
    cy.entrar();
    cy.login("adminpqr2", "123{enter}");
    cy.navbar("Campaña");
}

function consultaMalla() {
    // cy.frameFecha("object", "input[name=fecha_inicio]", "22-10-2019");
    // cy.frameFecha("object", "input[name=fecha_fin]", "22-10-2019");
    cy.frameSelect("object", "select[name=cod_area]", "Servicio al cliente");
    // cy.get('object').iframeLoaded().its('document').getInDocument('button').first().click();
}

function agregaTurno() {
    cy.get('object').iframeLoaded().its('document').getInDocument('button#agrega-turnos').click();
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument('div#form-agregar-turno').then(() => {
        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_area]").select("Servicio al cliente")
        cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").click()
        cy.get('object').iframeLoaded().its('document').getInDocument(".container-fluid").within(() => {
            cy.get("input[type=checkbox]").eq(3).check()
        })
        cy.frameFecha("object", "input[name=fecha_inicio]", "22-10-2019");
        cy.frameFecha("object", "input[name=fecha_fin]", "22-10-2019");
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_inicio]").type("08:00:00.000")
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_fin]").type("17:00:00.000")
        cy.get('object').iframeLoaded().its('document').getInDocument("button[type=submit]").click()
            // cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").click()
            // cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").click()
            // cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").click()
    });
}