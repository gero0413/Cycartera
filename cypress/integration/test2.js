describe("test", function() {
    it("prueba", function() {
        ingresa();
        prueba();
    })

    function ingresa() {
        cy.visit("http://10.181.3.183:8085/cmpqr_cartera/index.php");
        cy.get("input[name=usuario]").type("adminpqr2");
        cy.get("input[name=password]").type("123{enter}");
        cy.visit("http://10.181.3.183:8085/cmpqr_cartera/revisa.php?rand=2040291871&modulo=149&token=454e64462b786948787775465a687a523342633848773d3d");
    }

    function prueba() {
        // cy.get('object')
        //     .iframeLoaded()
        //     .its('document')
        //     .getInDocument('input[name=fecha_inicio]').click()
        //     .then(input => {
        //         input.val('06/09/1985')
        //     })

        // cy.get('object')
        //     .iframeLoaded()
        //     .its('document')
        //     .getInDocument('input[name=fecha_fin]').click()
        //     .then(input => {
        //         input.val('06/09/1985')
        //     })

        cy.get('object')
            .iframeLoaded()
            .its('document')
            .getInDocument('select[name=cod_area]').select("Servicio al cliente")

        //Buscar 
        // cy.get('object')
        //     .iframeLoaded()
        //     .its('document')
        //     .getInDocument('button')
        //     .eq(0)
        //     .trigger("click")

        cy.get('object')
            .iframeLoaded()
            .its('document')
            .getInDocument('button')
            .eq(3)
            .trigger("click")

        cy.get('object')
            .iframeLoaded()
            .its('document')
            .getInDocument('input[type=file]')
            .trigger("click")

        //Agregar turno
        // cy.get('object')
        //     .iframeLoaded()
        //     .its('document')
        //     .getInDocument('#asesores').select("Servicio al cliente")

    }


})