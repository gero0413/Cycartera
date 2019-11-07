describe("test", function() {
    it("prueba", function() {
        ingresa();
        pausar();
        consultaMalla();
        verificarPausa("Pausado");
        cy.wait(5500)
        despausar();
    })
})

let fecha = new Date();
let hoy = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();

function ingresa() {
    cy.entrar();
    cy.login("1094947267", "123{enter}");
    cy.navbar("Pausas");
}

function pausar() {
    cy.frameSelect("object", "select[name=cod_motivo_pausa]", "Capacitación");
    cy.get('object').iframeLoaded().its('document').getInDocument('button').click();
    cy.log("aqui empieza la pausa")
}

function consultaMalla() {
    cy.navbar("Malla de Turnos");
    cy.frameFecha("object", "input[name=fecha_inicio]", hoy);
    cy.frameFecha("object", "input[name=fecha_fin]", hoy);
    cy.frameSelect("object", "select[name=cod_area]", "Crédito");
    cy.get("object").iframeLoaded().its("document").getInDocument("button").click();
}

function verificarPausa(estado) {
    cy.get('object').iframeLoaded().its('document').getInDocument('div.container-fluid').then(() => {
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("#malla-turnos_wrapper").should("contain", estado)
    });
}

function despausar() {
    cy.navbar("Pausas");
    // Verificar si existe turno

    //Despausar
    cy.get("object").iframeLoaded().its("document").getInDocument("button").click();
    cy.log("aqui termina la pausa")
    consultaMalla();

    // Verificar estado 
    verificarPausa("Activo");
}