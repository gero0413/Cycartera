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

// Eliminar manual
function eliminarTurno() {
    cy.wait(2000);
    cy.frameClic("object", "button.eliminar", "2");
    cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
}

// Eliminar masivo
function eliminarMasivo() {
    cy.wait(2000);
    //Para eliminar todos
    // cy.get('object').iframeLoaded().its('document').getInDocument('input[type=checkbox]').first().check()
    //Para eliminar seleccionados 
    cy.frameCheck("object", "input[type=checkbox]", "1");
    cy.frameCheck("object", "input[type=checkbox]", "4");
    cy.get('object').iframeLoaded().its('document').getInDocument('button#elimina-turnos').click();
    cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
}