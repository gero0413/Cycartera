function importarCampa() {
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument("input[type=search]").type("geral")
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument("a").eq(2).click()
    cy.get('object').iframeLoaded().its('document').getInDocument('div.panel panel-primary').then(()  =>  {  
        const   fileName   =   'turnos_04102019.csv';        
        cy.fixture(fileName).then(fileContent   =>   {          
            cy.wait(2000)             
            cy.get('object').iframeLoaded().its('document').getInDocument('input[name=archivo]')                
                .upload({   fileContent,   fileName,   mimeType:   'text/comma-separated-values',  encoding:   'ascii',  force:  true  })       
        }); 
    });
}

export default importarCampa;