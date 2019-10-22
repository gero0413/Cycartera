describe("Diligenciar solicitud", function() {

    it("Diligenciar", function() {
        ingresa();
        consultaMalla();
    })

    function ingresa() {
        cy.visit("http://10.181.3.183:8085/cmpqr_cartera/index.php");
        cy.get("input[name=usuario]").type("demmo");
        cy.get("input[name=password]").type("123{enter}");
        cy.visit("http://10.181.3.183:8085/cmpqr_cartera/revisa.php?rand=2040291871&modulo=149&token=454e64462b786948787775465a687a523342633848773d3d");
    }

    function consultaMalla() {
        cy.wait(3000);
        // cy.get('object').within(() => {
        //     cy.then(() => {
        //         cy.get("input[name=fecha_inicio]").click()
        //             .then(input => {
        //                 input.val('06/09/1985')
        //             })
        //     })
        // })

        cy.wait(5000);
        // cy.get('object').then($element => {

        //     const $body = $element.contents().find('body')

        //     let stripe = cy.wrap($body)
        //     stripe.find('input[name=fecha_inicio]').eq(0).click()
        //         // stripe = cy.wrap($body)
        //         // stripe.find('.Input .InputElement').eq(1).click().type('4242')
        //         // stripe = cy.wrap($body)
        //         // stripe.find('.Input .InputElement').eq(2).click().type('424')
        // })


    }

})