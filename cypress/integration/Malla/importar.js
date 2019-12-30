describe("test", function() {
    it("prueba", function() {
        ingresa();
        consultaMalla();
        importar();
    })
})

function ingresa() {
    cy.entrar();
    cy.login("adminpqr2", "123{enter}");
    cy.navbar("Malla de Turnos");
}

function consultaMalla() {
    // cy.frameFecha("object", "input[name=fecha_inicio]", "22-10-2019");
    // cy.frameFecha("object", "input[name=fecha_fin]", "22-10-2019");
    cy.frameSelect("object", "select[name=cod_area]", "Servicio al cliente");
    // cy.get('object').iframeLoaded().its('document').getInDocument('button').first().click();
}

function  importar()  { 
    cy.get('object').iframeLoaded().its('document').getInDocument('button#importar').click(); 
    cy.wait(2000)
    let fileName = "ImportarMalla.xls";
    cy.get('object').iframeLoaded().its('document').getInDocument('div.panel panel-primary').then(() => {
        cy.fixture(fileName).then(fileContent => {
            cy.wait(2000)
            cy.get('object').iframeLoaded().its('document').getInDocument('input[name=archivo]')
                .upload({fileContent, fileName, mimeType: 'application/vnd.ms-excel', encoding: 'ascii', force: true})
                .trigger("input", {force: true})
                .wait(4000)
        });
        cy.get('object').iframeLoaded().its('document').getInDocument('[name=btn_importa]').click()
    });
}