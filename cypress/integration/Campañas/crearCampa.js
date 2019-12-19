let fecha = new Date();
let fecha_automatica = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();
let fecha_manual = "2019-12-17";
let dias = 0;

function agregacampa(crea) {
    if (crea == 1) {
        cy.get('object').iframeLoaded().its('document').getInDocument("a").first().click()
        cy.wait(3000)
        cy.get('object').iframeLoaded().its('document').getInDocument('div.container-fluid').then(() => {
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name=nombre]").type("Test geral 1")
            cy.frameFecha("object", "input[name=fecha_inicial]", fecha_automatica);
            cy.frameFecha("object", "input[name=fecha_final]", fecha_automatica);
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_inicial]").type("08:00:00.000")
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_final]").type("17:00:00.000")
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name=dias]").type(dias)
            cy.get('object').iframeLoaded().its('document').getInDocument("select[name=actualizar]").select("NO")
            cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_area_interna]").select("Servicio al cliente")
            cy.seleccionaCanal("Manual");
            cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_usuarios]").select("Administrador Pqr 3")
            cy.get('object').iframeLoaded().its('document').getInDocument("textarea[name=observacion]").type("Test geral campo observaciones")
            cy.get('object').iframeLoaded().its('document').getInDocument("button[type=submit]").click()

            verificaCampaña();
        });
    }
}

function verificaCampaña() {
    cy.get('object').iframeLoaded().its('document').getInDocument('div.container-fluid').then(() => {
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("input[type=search]").type("Test geral")
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("#table-campanas_wrapper").should("contain", "Test geral 1")
            // cy.get('object').iframeLoaded().its('document').getInDocument("a[title='Editar campana']").eq(125).click().wait(2000)

        // cy.get('object').iframeLoaded().its('document').getInDocument("input[name=nombre]").should("have.value", "Test geral 1")
        // cy.get('object').iframeLoaded().its('document').getInDocument("input[name=fecha_inicial]").should("have.value", fecha_manual)
        // cy.get('object').iframeLoaded().its('document').getInDocument("input[name=fecha_final]").should("have.value", fecha_manual)
        // cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_inicial]").should("have.value", "08:00:00.000")
        // cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_final]").should("have.value", "17:00:00.000")
        // cy.get('object').iframeLoaded().its('document').getInDocument("input[name=dias]").should("have.value", "0")
        // cy.get('object').iframeLoaded().its('document').getInDocument("select[name=actualizar]").should("contain", "NO")
        // cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_area_interna]").should("contain", "Servicio al cliente")
        // cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_canal_campana]").should("contain", "Servicio al cliente")
        // cy.get('object').iframeLoaded().its('document').getInDocument("textarea[name=observacion]").should("have.value", "Test geral campo observaciones")
        // cy.get('object').iframeLoaded().its('document').getInDocument("button[type=submit]").click()
    });
}

export default agregacampa;