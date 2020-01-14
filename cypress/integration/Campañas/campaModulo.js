import agregacampa from './crearCampa';
import editarCampa from './editarCampa';
import enviarMensajes from './asignaClientesMensajesTexto';

describe("Parametrización de campañas", function() {

    it("Crear campañas", function() {
        cy.entrar();
        cy.login("admingeral", "123{enter}");
        cy.navbar("Campaña");

        // Enviar como parametro en nombre de la campaña a buscar
        // buscarCampana("Test Geral Mensaje de Texto")

        // Para que las funciones se realicen, se debe enviar como parametro 1
        agregacampa();
        editarCampa();
        importarCampa(1);
        enviarMensajes();
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
        cy.get('object').iframeLoaded().its('document').getInDocument("input[type=search]").type("Test Geral Manual");
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("a").eq(2).click()
		
		// Parametros
		// Nombre y extensión del archivo a cargar, estos estan en la carpeta fixtures
		// Tipo de archivo a cargar ej: application/pdf o application/vnd.ms-excel
		// Cantidad en números de clientes que se deben cargar correctamente
        cy.CargarDocumento("carga_clientes_exitoso.csv", "text/csv", "20");
    }
}

