function importarCampa(importar, nombre_archivo) {
    if (importar == 1) {
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("input[type=search]").type("geral")
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("a").eq(2).click()

        cy.get('object').iframeLoaded().its('document').getInDocument('div.panel panel-primary').then(()  =>  {  
            const   fileName   =   'importarClientes2.csv';        
            cy.fixture(fileName).then(fileContent   =>   {          
                cy.wait(2000)             
                cy.get('object').iframeLoaded().its('document').getInDocument('input[name=archivo]')                
                    .upload({   fileContent,   fileName, mimeType:   'text/csv', encoding: 'ascii',  force:  true  })       
            }); 

            // cy.fixture('test.csv', 'ascii').then(fileContent => {
            //     console.log(fileContent);
            //     cy.get('object').iframeLoaded().its('document').getInDocument('input[name=archivo]').upload({
            //         fileContent,
            //         fileName: 'test.csv',
            //         mimeType: 'text/comma-separated-values',
            //         encoding: 'ascii'
            //     }, { subjectType: 'input' });
            // });
        });
    }
}

export default importarCampa;