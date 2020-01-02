describe("test", function() {
    it("prueba", function() {
        ingresa();
        consultaMalla();
        editarTurno();
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
    cy.login("adminpqr2", "123{enter}");
    cy.navbar("Malla de Turnos");
}

function consultaMalla() {
    cy.frameFecha("object", "input[name=fecha_inicio]", fecha_inicio);
    cy.frameFecha("object", "input[name=fecha_fin]", fecha_fin);
    cy.frameSelect("object", "select[name=cod_area]", area);
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument('button').first().click();
}

function editarTurno() {
    cy.wait(2000);
    cy.get('object').iframeLoaded().its('document').getInDocument('button.editar').click();
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument('div#dialog-turno').then(() => {
        cy.frameFecha("object", "input[name=fecha]", fecha_inicio);
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_inicio]").type("08:00:00.000")
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_fin]").type("17:00:00.000")
        cy.get('object').iframeLoaded().its('document').getInDocument("textarea[name=observaciones]").type("Test de modificación")
        cy.get('object').iframeLoaded().its('document').getInDocument("button[type=submit]").eq(1).click()
    })
}