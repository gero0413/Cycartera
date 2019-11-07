describe("Diligenciar solicitud", function() {

    it("Diligenciar", function() {
        ingresa();
        // agregacampa();
        buscaCampaña();
    })
})
let fecha = new Date();
let hoy = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();


function ingresa() {
    cy.entrar();
    cy.login("adminpqr3", "123{enter}");
    cy.navbar("Campaña");
}

function agregacampa() {

    cy.get('object').iframeLoaded().its('document').getInDocument("a").first().click()
    cy.wait(3000)
    cy.get('object').iframeLoaded().its('document').getInDocument('div.container-fluid').then(() => {
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=nombre]").type("Test geral 1")
        cy.frameFecha("object", "input[name=fecha_inicial]", hoy);
        cy.frameFecha("object", "input[name=fecha_final]", hoy);
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_inicial]").type("08:00:00.000")
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_final]").type("17:00:00.000")
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=dias]").type("0")
        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=actualizar]").select("NO")
        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_area_interna]").select("Servicio al cliente")
        cy.seleccionaCanal("Mensaje de Texto");
        cy.get('object').iframeLoaded().its('document').getInDocument("textarea[name=observacion]").type("Test geral campo observaciones")
        cy.get('object').iframeLoaded().its('document').getInDocument("button[type=submit]").click()
    });
}

function buscaCampaña() {
    cy.get('object').iframeLoaded().its('document').getInDocument('div.container-fluid').then(() => {
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("input[type=search]").type("Test geral")
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("#table-campanas_wrapper").should("contain", "Test geral 1")
        cy.get('object').iframeLoaded().its('document').getInDocument("a[title='Editar campana']").eq(5).click().wait(2000)

        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=nombre]").should("have.value", "Test geral 1")
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=fecha_inicial]").should("have.value", hoy)
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=fecha_final]").should("have.value", hoy)
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_inicial]").should("have.value", "08:00:00.000")
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_final]").should("have.value", "17:00:00.000")
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=dias]").should("have.value", "0")
        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=actualizar]").should("contain", "NO")
        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_area_interna]").should("contain", "Servicio al cliente")
        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_canal_campana]").should("contain", "Servicio al cliente")
        cy.get('object').iframeLoaded().its('document').getInDocument("textarea[name=observacion]").should("have.value", "Test geral campo observaciones")
        cy.get('object').iframeLoaded().its('document').getInDocument("button[type=submit]").click()
    });
}