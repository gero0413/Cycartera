function agregacampa() {
    cy.get('object').iframeLoaded().its('document').getInDocument("a").first().click()

    cy.wait(3000)
    cy.get('object').iframeLoaded().its('document').getInDocument('div.container-fluid').then(() => {
        cy.get('object').iframeLoaded().its('document').getInDocument("input[name=nombre]").type("Test geral")
        cy.frameFecha("object", "input[name=fecha_inicial]", "29-10-2019");
        cy.frameFecha("object", "input[name=fecha_final]", "30-10-2019");
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

export default agregacampa;