Cypress.Commands.add("Buscar", function(criterio, subcriterio) {
    cy.get("select[name=cod_criterio]").select(criterio);
    cy.get('#capa > .capa > .form-control').type(subcriterio);
    cy.get('#buscar').click();
    cy.get('.lnk_url').click();
})