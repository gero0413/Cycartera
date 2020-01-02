const moment = require("moment");

describe("test", function() {
    it("prueba", function() {
        ingresa();
        consultaMalla();
        pausaProgramada();
    })
})

let fecha = new Date();
let hoy = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();

function ingresa() {
    cy.entrar();
    cy.login("adminpqr3", "123{enter}");
    cy.navbar("Malla de Turnos");
}

function consultaMalla() {
    cy.navbar("Malla de Turnos");
    cy.frameFecha("object", "input[name=fecha_inicio]", hoy);
    cy.frameFecha("object", "input[name=fecha_fin]", hoy);
    cy.frameSelect("object", "select[name=cod_area]", "Servicio al cliente");
    cy.get("object").iframeLoaded().its("document").getInDocument("button", { timeout: 10000 }).first().click();
}

function pausaProgramada() {
    cy.wait(2000);
    cy.frameClic("object", "button.detalle-pausas-programadas", "0");
    // cy.get('object').iframeLoaded().its('document').getInDocument('button.ui-dialog-titlebar-close').eq(1).click();
}