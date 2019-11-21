describe("test", function() {
    it("prueba", function() {
        ingresa();
        validaBotones("51964417");
    })
})

let usuario = "adminpqr3";
let fecha_inicio = "20-11-2019";
let fecha_fin = "20-11-2019";
let area = "Crédito";

function ingresa() {
    cy.entrar();
    cy.login(usuario, "123{enter}");
}

function consultaMalla() {
    cy.frameFecha("object", "input[name=fecha_inicio]", fecha_inicio);
    cy.frameFecha("object", "input[name=fecha_fin]", fecha_fin);
    cy.frameSelect("object", "select[name=cod_area]", area);
    cy.get('object').iframeLoaded().its('document').getInDocument('button').first().click();
}

function validaBotones(usuario) {
    // Al momento de ingresar a la malla solo se deben visualizar los botones dependiendo del usuario
    cy.verificaPerfil(usuario).then((cod_perfil) => {
        if (cod_perfil == 10) {
            cy.navbar("Malla de Turnos");
            cy.wait(2000)
            cy.get('object').iframeLoaded().its('document').getInDocument('button#agrega-turnos').should('be.visible');
            cy.get('object').iframeLoaded().its('document').getInDocument('button#elimina-turnos').should('be.visible');

            cy.frameSelect("object", "select[name=cod_area]", area);
            cy.get('object').iframeLoaded().its('document').getInDocument('button#importar').should('be.visible');

            consultaMalla();
            cy.get('object').iframeLoaded().its('document').getInDocument('button#exportar').should('be.visible');
            cy.wait(3000)
                // Botones secundarios
            cy.get('object').iframeLoaded().its('document').getInDocument('button.editar').should('be.visible');
            cy.get('object').iframeLoaded().its('document').getInDocument('button.eliminar').should('be.visible');
            cy.get('object').iframeLoaded().its('document').getInDocument('button.detalle-pausas').should('be.visible');
            cy.get('object').iframeLoaded().its('document').getInDocument('button.detalle-pausas-programadas').should('be.visible');
            cy.get('object').iframeLoaded().its('document').getInDocument('#todos').should('be.visible');
        }
        if (cod_perfil == 1) {
            cy.get('a').contains("Salir").click();
            cy.wait(2000)
            cy.get(".confirm").click();

            cy.login(usuario, "123{enter}");
            cy.navbar("Malla de Turnos")
            cy.get('object').iframeLoaded().its('document').getInDocument('button#agrega-turnos').should('not.be.visible');
            cy.get('object').iframeLoaded().its('document').getInDocument('button#elimina-turnos').should('not.be.visible');

            cy.frameSelect("object", "select[name=cod_area]", area);
            cy.get('object').iframeLoaded().its('document').getInDocument('button#importar').should('not.be.visible');

            consultaMalla();
            cy.wait(2000)
            cy.get('object').iframeLoaded().its('document').getInDocument('button#exportar').should('not.be.visible');
            // Botones secundarios
            cy.get('object').iframeLoaded().its('document').getInDocument('button.detalle-pausas').should('be.visible');
            cy.get('object').iframeLoaded().its('document').getInDocument('button.detalle-pausas-programadas').should('be.visible');
            cy.get('object').iframeLoaded().its('document').getInDocument('#todos').should('not.be.visible');
        }
    })
}