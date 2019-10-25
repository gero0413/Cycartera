describe("test", function() {
    it("prueba", function() {
        ingresa();
        consultaMalla();
        // editarTurno();
        // eliminarTurno();
        // detallePausa();
        // agregaTurno();
        // eliminarMasivo();
        importar();
    })

    function ingresa() {
        cy.visit("http://10.181.3.183:8085/cmpqr_cartera/index.php");
        cy.get("input[name=usuario]").type("adminpqr2");
        cy.get("input[name=password]").type("123{enter}");
        cy.visit("http://10.181.3.183:8085/cmpqr_cartera/revisa.php?rand=2040291871&modulo=149&token=454e64462b786948787775465a687a523342633848773d3d");
    }

    function consultaMalla() {
        // cy.frameFecha("object", "input[name=fecha_inicio]", "22-10-2019");
        // cy.frameFecha("object", "input[name=fecha_fin]", "22-10-2019");
        cy.frameSelect("object", "select[name=cod_area]", "Servicio al cliente");
        // cy.get('object').iframeLoaded().its('document').getInDocument('button').first().click();
    }

    function editarTurno() {
        cy.wait(2000);
        cy.frameClic("object", "button.editar", "1");
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument('div#dialog-turno').then(() => {
            cy.frameFecha("object", "input[name=fecha]", "22-10-2019");
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_inicio]").type("08:00:00.000")
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_fin]").type("17:00:00.000")
            cy.get('object').iframeLoaded().its('document').getInDocument("textarea[name=observaciones]").type("Test de modificación")
            cy.get('object').iframeLoaded().its('document').getInDocument("button[type=submit]").eq(1).click()
        })
    }

    function eliminarTurno() {
        cy.wait(2000);
        cy.frameClic("object", "button.eliminar", "2");
        cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
    }

    function detallePausa() {
        cy.wait(2000);
        cy.frameClic("object", "button.detalle-pausas", "3");
        cy.get('object').iframeLoaded().its('document').getInDocument('button.ui-dialog-titlebar-close').eq(1).click();
    }

    function agregaTurno() {
        cy.get('object').iframeLoaded().its('document').getInDocument('button#agrega-turnos').click();
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument('div#form-agregar-turno').then(() => {
            cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_area]").select("Servicio al cliente")
            cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").click()
            cy.get('object').iframeLoaded().its('document').getInDocument(".container-fluid").within(() => {
                cy.get("input[type=checkbox]").eq(3).check()
            })
            cy.frameFecha("object", "input[name=fecha_inicio]", "22-10-2019");
            cy.frameFecha("object", "input[name=fecha_fin]", "22-10-2019");
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_inicio]").type("08:00:00.000")
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_fin]").type("17:00:00.000")
            cy.get('object').iframeLoaded().its('document').getInDocument("button[type=submit]").click()
                // cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").click()
                // cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").click()
                // cy.get('object').iframeLoaded().its('document').getInDocument("button.multiselect").click()
        });
    }

    function eliminarMasivo() {
        cy.wait(2000);
        //Para eliminar todos
        // cy.get('object').iframeLoaded().its('document').getInDocument('input[type=checkbox]').first().check()
        //Para eliminar seleccionados 
        cy.frameCheck("object", "input[type=checkbox]", "1");
        cy.frameCheck("object", "input[type=checkbox]", "4");
        cy.get('object').iframeLoaded().its('document').getInDocument('button#elimina-turnos').click();
        cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
    }

    function importar() {
        cy.get('object').iframeLoaded().its('document').getInDocument('button#importar').click();
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument('div#dialogo-inserta-malla').then(() => { 
            // Cypress.$('input[name=archivo]').css('display', 'block');
            const  fileName  =  'TextImportarMalla.xls'; 
            cy.fixture(fileName).then(fileContent  =>  {
                cy.wait(2000)
                cy.get('object').iframeLoaded().its('document').getInDocument('input[name=nombre_archivo]').type("dfsdf")
                    // .invoke('have.prop', 'readonly', false)
                    // .should('have.attr', 'readonly')
                    // .upload({  fileContent,  fileName,  mimeType: 'application/vnd.ms-excel', encoding: 'utf-8' })

            });
        });


    }

})