describe("test", function() {
    it("prueba", function() {
        ingresa();
        agregaTurno();
        validarIngreso();
        // cy.wait(2000)
        // consultaMalla();
    })
})

let fecha_inicio = "20-11-2019";
let fecha_fin = "20-11-2019";

let hora_inicio = "08:00";
let hora_fin = "20:00";

let area = "Crédito";
let motivo_pausa = "Break";

let prueba = "";

function ingresa() {
    cy.entrar();
    cy.login("adminpqr3", "123{enter}");
    cy.navbar("Malla de Turnos");
}

function consultaMalla() {
    cy.frameFecha("object", "input[name=fecha_inicio]", fecha_inicio);
    cy.frameFecha("object", "input[name=fecha_fin]", fecha_fin);
    cy.frameSelect("object", "select[name=cod_area]", area);
    cy.get('object').iframeLoaded().its('document').getInDocument('button').first().click();
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument('button.detalle-pausas-programadas').should('be.visible');
}

function agregaTurno() {
    cy.get('object').iframeLoaded().its('document').getInDocument('button#agrega-turnos', { timeout: 10000 }).click();
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument('div#form-agregar-turno').then(() => {
        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_area]").select(area)
        cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").click()
        cy.get('object').iframeLoaded().its('document').getInDocument(".container-fluid").within(() => {
            cy.get("input[type=checkbox]").eq(0).check()
            cy.get("input[type=checkbox]").eq(0).check()
        })

        cy.frameFecha("object", "input[name=fecha_inicio]", fecha_inicio);
        cy.frameFecha("object", "input[name=fecha_fin]", fecha_fin);
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_inicio]").type(hora_inicio)
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_fin]").type(hora_fin)

        cy.get('object').iframeLoaded().its('document').getInDocument("div.pausas-programadas").then(() => {
            cy.get('object').iframeLoaded().its('document').getInDocument("select#pausas-area").select(motivo_pausa)
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name='hora_inicio_pausa[]']").type("09:15")
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name='hora_fin_pausa[]']").type("09:30")
        })

        cy.get('object').iframeLoaded().its('document').getInDocument("button[type=submit]").click()
    });
}

function validarIngreso() {
    cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").invoke("attr", "title").then((usuario) => {
        prueba = usuario
            // cy.log(prueba)
        cy.verificaLugarPausa(area).then((flag) => {
            flag == 1 ? vPausasVd() : vPausasCrm();
        });
    })
}

function vPausasVd() {
    cy.get('a').contains("Salir").click();
    cy.wait(2000)
    cy.get(".confirm").click();

    cy.login("51964417", "123{enter}");
    cy.navbar("Pausas")
    cy.get('object').iframeLoaded().its('document').getInDocument(".row").should("contain", "Las pausas de este usuario se getionan directamente en Vicidial")
    cy.wait(2000)
    cy.get('a').contains("Salir").click();
    cy.wait(2000)
    cy.get(".confirm").click();
}

function vPausasCrm() {
    cy.get('a').contains("Salir").click();
    cy.wait(2000)
    cy.get(".confirm").click();

    cy.login("51964417", "123{enter}");
    cy.navbar("Pausas")
    cy.get('object').iframeLoaded().its('document').getInDocument('select[name=cod_motivo_pausa]').should("be.visible");
    cy.get('object').iframeLoaded().its('document').getInDocument('button').should("be.visible");
}