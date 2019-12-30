Cypress.Commands.add("seleccionaCanal", function(canal) {
    cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_canal_campana]").select(canal)

    // Predicitiva o Progresiva
    if (canal == "Predictiva" || canal == "Progresiva") {
        cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").first().click()
        cy.get('object').iframeLoaded().its('document').getInDocument(".container-fluid").within(() => {
            cy.get("input[type=checkbox]").eq(2).check()
        })

        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=id_campana_vd]").select("Kredicomercial")
    }

    // Manual
    if (canal == "Manual") {
        cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").first().click()
        cy.get('object').iframeLoaded().its('document').getInDocument(".container-fluid").within(() => {
            cy.get("input[type=checkbox]").eq(3).check()
        })
    }

    // Grabación automatica
    if (canal == "Grabación Automatica") {
        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=id_campana_vd]").select("Repuestos")
    }

    // Mensaje de texto
    if (canal == "Mensaje de Texto") {
        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_plantilla]").select("test1")
    }
})

Cypress.Commands.add("obtieneClientes", function() {
    cy.get('object').iframeLoaded().its('document').getInDocument("#clientes-cargados").then(elem => {
        let n_clientes = elem.val();
        cy.log(n_clientes);
    })
})