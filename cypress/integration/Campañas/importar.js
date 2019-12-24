function importarCampa(importar, fileName) {
    if (importar == 1) {
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("input[type=search]").type("geral")
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("a").eq(2).click()

        cy.get('object').iframeLoaded().its('document').getInDocument('div.panel panel-primary').then(()  =>  {       
            cy.fixture(fileName).then(fileContent   =>   {          
                cy.wait(2000)             
                cy.get('object').iframeLoaded().its('document').getInDocument('input[name=archivo]')                
                    .upload({   fileContent,   fileName, mimeType:   'text/csv', encoding: 'ascii',  force:  true  })
                    .trigger("input", { force: true })  
            }); 
            cy.get('object').iframeLoaded().its('document').getInDocument("button[name=btn_importa]").click()
            cy.wait(2000)
            cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
        });
        cy.then(() => {
            cy.wait(3000)
            cantidadClientes();
        })

    }
}

function cantidadClientes() {
    cy.obtieneClientes();
    // cy.get('object').iframeLoaded().its('document').getInDocument("button#atras")
    cy.get('object').iframeLoaded().its('document').getInDocument("button#procesar").click()
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
}

export default importarCampa;