describe("Diligenciar solicitud", function() {

    it("Diligenciar", function() {
        ingresa();
        buscaPlantilla();
        // agregaPlantilla();
        // editaPlantilla();
    })

    function ingresa() {
        cy.entrar();
        cy.login("adminpqr2", "123{enter}");
        cy.navbar("Plantillas");
    }

    function buscaPlantilla() {
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("input[type=search]").type("geral")
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("#tabla-plantillas_wrapper").should("contain", "Test geral 2")
        cy.get('object').iframeLoaded().its('document').getInDocument("button.editar").eq(1).click().wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument('#div-formulario-plantilla').then(() => {
            // vista de caracteres especiales que no se pueden usar para la plantilla
            cy.get('object').iframeLoaded().its('document').getInDocument("a").contains("mirala aqui").click()

            cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_tipo_plantilla]").should("contain", "Mensaje de texto")
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name=nombre]").should("have.value", "Test geral 2")
            cy.get('object').iframeLoaded().its('document').getInDocument("textarea[name=detalle]").should("have.value", "Test Cypress geral campo des")
            cy.get('object').iframeLoaded().its('document').getInDocument("#volver").click()
        });

    }

    function agregaPlantilla() {
        cy.get("object").iframeLoaded().its("document").getInDocument("#agregar-plantilla").click();
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument('#div-formulario-plantilla').then(() => {
            // vista de caracteres especiales que no se pueden usar para la plantilla
            cy.get('object').iframeLoaded().its('document').getInDocument("a").contains("mirala aqui").click()

            cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_tipo_plantilla]").select("Mensaje de texto")
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name=nombre]").type("Test geral 2")
            cy.get('object').iframeLoaded().its('document').getInDocument("textarea[name=detalle]").type("Test Cypress geral campo des")
            cy.get('object').iframeLoaded().its('document').getInDocument("button[type=submit]").click()
            cy.wait(2000)
                // buscaPlantilla();
        });
    }

    function editaPlantilla() {
        cy.wait(2000);
        cy.get('object').iframeLoaded().its('document').getInDocument("a.editar").first().click()
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument('#div-formulario-plantilla').then(() => {
            cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_tipo_plantilla]").select("Mensaje de texto")
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name=nombre]").type("Test Cypress geral")
            cy.get('object').iframeLoaded().its('document').getInDocument("textarea[name=detalle]").type("Test Cypress geral campo des")
            cy.get('object').iframeLoaded().its('document').getInDocument("button[type=submit]").click()
        });
    }

})