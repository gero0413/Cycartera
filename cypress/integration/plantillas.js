describe("Diligenciar solicitud", function() {

    it("Diligenciar", function() {
        ingresa();
        navbar("Plantillas");
        // buscaPlantilla();
        // agregaPlantilla();
        editaPlantilla();
    })

    function ingresa() {
        cy.visit("http://10.181.3.183:8085/cmpqr_cartera/index.php");
        cy.get("input[name=usuario]").type("adminpqr2");
        cy.get("input[name=password]").type("123{enter}");
    }

    function navbar(modulo) {
        cy.get("a").contains(modulo).invoke("show").click({ force: true })
    }

    function buscaPlantilla() {
        cy.frameSelect("object", "select[name=area_usuario]", "Servicio al cliente");
    }

    function agregaPlantilla() {
        cy.get("object").iframeLoaded().its("document").getInDocument("#agregar-plantilla").click();
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument('#div-formulario-plantilla').then(() => {
            cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_tipo_plantilla]").select("Mensaje de texto")
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name=nombre]").type("Test Cypress geral")
            cy.get('object').iframeLoaded().its('document').getInDocument("textarea[name=detalle]").type("Test Cypress geral campo des")
            cy.get('object').iframeLoaded().its('document').getInDocument("button[type=submit]").click()
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