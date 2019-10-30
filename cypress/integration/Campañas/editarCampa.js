function editarCampa() {
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument("input[type=search]").type("geral")
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument("a").eq(1).click()

    cy.wait(3000)
    cy.get('object').iframeLoaded().its('document').getInDocument('div.container-fluid').then(() => {
        // cy.get('object').iframeLoaded().its('document').getInDocument("input[name=nombre]").type("Test geral")
        cy.frameFecha("object", "input[name=fecha_inicial]", "2019-10-29");
        cy.frameFecha("object", "input[name=fecha_final]", "2019-10-30");
        // cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_inicial]").type("08:00:00.000")
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_final]").type("18:00:00.000")
            // cy.get('object').iframeLoaded().its('document').getInDocument("input[name=dias]").type("0")
            // cy.get('object').iframeLoaded().its('document').getInDocument("select[name=actualizar]").select("NO")
            // cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_area_interna]").select("Servicio al cliente")
        cy.seleccionaCanal("Predictiva");
        // cy.get('object').iframeLoaded().its('document').getInDocument("textarea[name=observacion]").type("Test geral campo observaciones")
        cy.get('object').iframeLoaded().its('document').getInDocument("button[type=submit]").click()
    });
}

export default editarCampa;