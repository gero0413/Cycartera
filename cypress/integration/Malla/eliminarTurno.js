describe("test", function() {
    it("prueba", function() {
        ingresa();
        consultaMalla();
        eliminarTurno();
    })
})
let fecha_inicio = "02-01-2020";
let fecha_fin = "02-01-2020";

let hora_inicio = "08:00";
let hora_fin = "20:00";

let area = "Servicio al cliente";

function ingresa() {
    cy.entrar();
    cy.login("adminpqr2", "123{enter}");
    cy.navbar("Malla de Turnos");
}

function consultaMalla() {
    cy.frameFecha("object", "input[name=fecha_inicio]", fecha_inicio);
    cy.frameFecha("object", "input[name=fecha_fin]", fecha_fin);
    cy.frameSelect("object", "select[name=cod_area]", "Servicio al cliente");
    cy.get('object').iframeLoaded().its('document').getInDocument('button').first().click();
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