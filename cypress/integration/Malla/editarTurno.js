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

function editarTurno() {
    cy.wait(2000);
    cy.frameClic("object", "button.editar", "1");
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument('div#dialog-turno').then(() => {
        cy.frameFecha("object", "input[name=fecha]", "22-10-2019");
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_inicio]").type("08:00:00.000")
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_fin]").type("17:00:00.000")
        cy.get('object').iframeLoaded().its('document').getInDocument("textarea[name=observaciones]").type("Test de modificación")
        cy.get('object').iframeLoaded().its('document').getInDocument("button[type=submit]").eq(1).click()
    })
}