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
    cy.navbar("Malla de Turnos");
}

function consultaMalla() {
    // cy.frameFecha("object", "input[name=fecha_inicio]", "22-10-2019");
    // cy.frameFecha("object", "input[name=fecha_fin]", "22-10-2019");
    cy.frameSelect("object", "select[name=cod_area]", "Servicio al cliente");
    // cy.get('object').iframeLoaded().its('document').getInDocument('button').first().click();
}

function detallePausa() {
    cy.wait(2000);
    cy.frameClic("object", "button.detalle-pausas", "3");
    cy.get('object').iframeLoaded().its('document').getInDocument('button.ui-dialog-titlebar-close').eq(1).click();
}