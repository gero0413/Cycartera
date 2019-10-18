Cypress.Commands.add("scanCliente", () => {
    cy.get("input[name=sc_codeudor]").type("364092,1036661446,GALLEGO,VALLEJO,LORENA,,F,19921227,O+");
    cy.root().submit()
})

Cypress.Commands.add("scanCodeudor", () => {

    cy.get("#formulario_codeudor > [name='info_personal'] > form > .col-md-12 > .has-success > .input-group > .form-control")
        .then(input => {
            input.val('364092,1069475365,GARCIA,NAVARRO,JUAN,DAVID,M,19921227,O+')
        })
        // .type('364092,1069475365,GARCIA,NAVARRO,JUAN,DAVID,M,19921227,O+')
})

Cypress.Commands.add("scanCodeudor2", () => {
    cy.get("#formulario_codeudor2 > [name='info_personal'] > form > .col-md-12 > .has-success > .input-group > .form-control").type("364092,1036661446,GALLEGO,VALLEJO,LORENA,,F,19921227,O+");
})

Cypress.Commands.add("preselecta", () => {
    let preselecta = "#dialog_preselecta";

    if (Cypress.$(preselecta).is(":visible")) {
        cy.get(preselecta).within(() => {
            cy.get("#sc_preselecta").type("364092,1036661446,GALLEGO,VALLEJO,LORENA,,F,19921227,O+");

            // cy.get("select[name=tipo_documento]").select("Cédula ciudadanía");
            // cy.get("input[name=documento]").type("1036661446");
            // cy.get("input[name=apellido]").type("vallejo");
            cy.get("select[name=actividad]").select("INDEPENDIENTE");
            cy.get("button[type=submit]").click();
        })
        cy.wait(2000)
        cy.get(".confirm").click()
    } else {
        cy.scanCodeudor();
    }

})

Cypress.Commands.add('nombreCliente', () => {
    Cypress.$.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
            Cypress.$("div[name=info_personal] input[name=primer_nombre]").val(data.results[0].name.first);
            Cypress.$("div[name=info_personal] input[name=primer_apellido]").val(data.results[0].name.last);
        }
    });
})

Cypress.Commands.add('direccion', () => {
    cy.get('#dialog_georeferenciacion > form > fieldset > :nth-child(2) > .ciudad').type('Armenia')
    cy.get('.ui-menu-item').first().click()
    cy.get('#dialog_georeferenciacion input[name=direccion]').type('cra 27 21 23 {enter}')
    cy.get('#dialog_georeferenciacion input[value=Continuar]').click()
})

Cypress.Commands.add('telefono', (num) => {
    cy.get('#dialog_telefono_mixto input[name=telefono]').type(num)
    cy.get('#dialog_telefono_mixto input[value=Continuar]').click()
})

Cypress.Commands.add("mail", (formulario, selector) => {
    let valor = Cypress.$(selector).val();
    cy.get(formulario + ' input[name=mail]').type(valor.toLowerCase() + '@gmail.com');
})

Cypress.Commands.add('otrosNombres', (campo) => {
    Cypress.$.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
            Cypress.$(campo).val(data.results[0].name.first);
        }
    });
})