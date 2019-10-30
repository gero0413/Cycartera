Cypress.Commands.add("seleccionaCanal", function(canal) {
    cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_canal_campana]").select(canal)

    // Predicitiva
    if (canal == "Predictiva") {
        // cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").first().click()
        // cy.get('object').iframeLoaded().its('document').getInDocument(".container-fluid").within(() => {
        //     cy.get("input[type=radio]").eq(2).check()
        // })

        cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").eq(1).click()
        cy.get('object').iframeLoaded().its('document').getInDocument(".container-fluid").within(() => {
            cy.get("input[type=checkbox]").first().check()
        })

        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=id_campana_vd]").select("Kredicomercial")

    }

    // Progresiva
    if (canal == "Progresiva") {
        // cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").first().click()
        // cy.get('object').iframeLoaded().its('document').getInDocument(".container-fluid").within(() => {
        //     cy.get("input[type=radio]").eq(2).check()
        // })

        cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").eq(1).click()
        cy.get('object').iframeLoaded().its('document').getInDocument(".container-fluid").within(() => {
            cy.get("input[type=checkbox]").eq(1).check()
        })

        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=id_campana_vd]").select("Repuestos")
    }

    // Manual
    if (canal == "Manual") {
        // cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").first().click()
        // cy.get('object').iframeLoaded().its('document').getInDocument(".container-fluid").within(() => {
        //     cy.get("input[type=radio]").eq(2).check()
        // })

        cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").eq(1).click()
        cy.get('object').iframeLoaded().its('document').getInDocument(".container-fluid").within(() => {
            cy.get("input[type=checkbox]").first().check()
        })
    }

    // Grabación automatica
    if (canal == "Grabación Automatica") {
        // cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").first().click()
        // cy.get('object').iframeLoaded().its('document').getInDocument(".container-fluid").within(() => {
        //     cy.get("input[type=radio]").eq(2).check()
        // })

        cy.get('object').iframeLoaded().its('document').getInDocument("select[name=id_campana_vd]").select("Repuestos")
    }

    // Mensaje de texto
    if (canal == "Mensaje de texto") {
        // cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").first().click()
        // cy.get('object').iframeLoaded().its('document').getInDocument(".container-fluid").within(() => {
        //     cy.get("input[type=radio]").eq(2).check()
        // })

        cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").eq(2).click()
        cy.get('object').iframeLoaded().its('document').getInDocument(".container-fluid").within(() => {
            cy.get("input[type=radio]").eq(3).check()
        })
    }
})