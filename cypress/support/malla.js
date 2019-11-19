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

Cypress.Commands.add("verificaLugarPausa", function(area) {
    cy.navbar("Configuracion");
    cy.get('object').iframeLoaded().its('document').getInDocument("a").eq(1).click();
    cy.then(() => {
        cy.wait(2000)
        let indice = "";
        if (area == "Cartera") {
            indice = 1;
        }
        if (area == "Servicio al cliente") {
            indice = 2;
        }
        if (area == "Despachos") {
            indice = 3;
        }
        if (area == "Crédito") {
            indice = 4;
        }
        if (area == "Otros ingresos") {
            indice = 5;
        }

        cy.get('object').iframeLoaded().its('document').getInDocument("#tablas-parametrizables > tbody > tr:nth-child(" + indice + ") > td.sorting_1 > button").click();
        cy.get('object').iframeLoaded().its('document').getInDocument('div#dialog-edita').then(()  =>  { 
            cy.wait(2000)   
            cy.get('object').iframeLoaded().its('document').getInDocument("#vicidial").invoke("val").then((valor)  =>  {     
                return valor;
            })
        })
    })
})