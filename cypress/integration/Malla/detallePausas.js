describe("test", function() {
    it("prueba", function() {
        ingresa();
        consultaMalla();
        detallePausa();
    })
})

let fecha_inicio = "02-01-2020";
let fecha_fin = "02-01-2020";

let hora_inicio = "08:00";
let hora_fin = "20:00";

let area = "Servicio al cliente";
let motivo_pausa = "Break";

function ingresa() {
    cy.entrar();
    cy.login("adminpqr3", "123{enter}");
    cy.navbar("Malla de Turnos");
}

function consultaMalla() {
    cy.frameFecha("object", "input[name=fecha_inicio]", fecha_inicio);
    cy.frameFecha("object", "input[name=fecha_fin]", fecha_fin);
    cy.frameSelect("object", "select[name=cod_area]", "Servicio al cliente");
    cy.get('object').iframeLoaded().its('document').getInDocument('button').first().click();
}

function detallePausa() {
    cy.wait(2000);
    // cy.frameClic("object", "button.detalle-pausas", "1");
    cy.get('object').iframeLoaded().its('document').getInDocument('button.detalle-pausas').click();
    cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
}