import agregacampa from './crearCampa';
import editarCampa from './editarCampa';
import importarCampa from './importar'

describe("Parametrización de campañas", function() {

    it("Crear campañas", function() {
        cy.entrar();
        cy.login("adminpqr3", "123{enter}");
        cy.navbar("Campaña");

        // Para que las funciones se realicen, se debe enviar como parametro 1
        agregacampa();
        editarCampa();
        //adicional enviar el nombre del archivo a cargar
        importarCampa();

        // Enviar como parametro en nombre de la campaña a buscar
        buscarCampana("Test Geral Manual")
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