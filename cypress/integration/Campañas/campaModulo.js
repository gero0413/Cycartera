import agregacampa from './crearCampa';
import editarCampa from './editarCampa';

describe("Parametrización de campañas", function() {

    it("Crear campañas", function() {
        cy.entrar();
        cy.login("admingeral", "123{enter}");
        cy.navbar("Campaña");

        // Enviar como parametro en nombre de la campaña a buscar
        // buscarCampana("Test Geral Manual")

        // Para que las funciones se realicen, se debe enviar como parametro 1
        agregacampa();
        editarCampa();
        importarCampa(1);

    })
})

function buscarCampana(campana) {
    cy.get('object').iframeLoaded().its('document').getInDocument('div.container-fluid').then(() => {
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("input[type=search]").type(campana)
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("#table-campanas_wrapper").should("contain", campana)
    });
}

function importarCampa(importar) {
    if (importar == 1) {
        cy.wait(4000)
        cy.get('object').iframeLoaded().its('document').getInDocument("input[type=search]").type("geral")
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("a").eq(2).click()
        cy.CargarDocumento("falla_documento_cliente.csv", "text/csv", "3")
    }
}

