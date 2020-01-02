Cypress.Commands.add("frameFecha", (frame, element, fecha) => {
    cy
        .get(frame)
        .iframeLoaded()
        .its('document')
        .getInDocument(element).click()
        .then(input => {
            input.val(fecha)
        })
})
Cypress.Commands.add("frameClic", (frame, element, position) => {
    cy
        .get(frame)
        .iframeLoaded()
        .its('document')
        .getInDocument(element)
        .eq(position)
        .trigger("click")
})
Cypress.Commands.add("frameCheck", (frame, element, position) => {
    cy
        .get(frame)
        .iframeLoaded()
        .its('document')
        .getInDocument(element)
        .eq(position)
        .check()
})
Cypress.Commands.add("frameSelect", (frame, element, select) => {
    cy
        .get(frame)
        .iframeLoaded()
        .its('document')
        .getInDocument(element)
        .select(select)
})

Cypress.Commands.add("verificaLugarPausa", function (area) {
    cy.navbar("Áreas");
    cy.then(() => {
        cy.wait(2000)
        let indice = "";
        if (area == "Cartera") {
            indice = 1;
        }
        if (area == "Servicio al cliente") {
            indice = 5;
        }
        if (area == "Despachos") {
            indice = 3;
        }
        if (area == "Crédito") {
            indice = 2;
        }
        if (area == "Otros ingresos") {
            indice = 4;
        }
        if (area == "Telemercadeo") {
            indice = 6;
        }
        cy.get('object').iframeLoaded().its('document').getInDocument("#tabla-areas tbody tr:nth-child(" + indice + ") a").click();
        cy.get('object').iframeLoaded().its('document').getInDocument('div#dialog-edita').then(() => {
            cy.wait(2000)
            cy.get('object').iframeLoaded().its('document').getInDocument("select[name=vicidial]").invoke("val").then((valor) => {
                return valor;
            })
        })
    })
})

Cypress.Commands.add("verificaPerfil", function (usuario) {
    cy.navbar("Usuario");
    cy.get('object').iframeLoaded().its('document').getInDocument("#tabla-usuarios_wrapper").then(() => {
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("input.input-sm").type(usuario);
        cy.get('object').iframeLoaded().its('document').getInDocument("a.editar").click();
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("#perfil").invoke("val").then((cod_perfil) => {
            return cod_perfil;
        })
    })
})