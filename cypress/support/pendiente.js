let tel = Math.floor(Math.random() * 1000000000 + 3000000000);
const datos = () => {
    let str = '';
    let ref = 'abcdefghijklmnñopqrstuvwxyz';
    for (var i = 0; i < 7; i++) {
        str += ref.charAt(Math.random() * ref.length);
    }
    return str;
}
Cypress.Commands.add('ref_familiar', () => {
    cy.get('.form_pendiente input[name=referencia_familiar_nombre]').then(elem => {
        Cypress.$(elem).val(datos);
    })
    cy.get('.form_pendiente input[name=referencia_familiar_celular]').click()
    cy.telefono(tel)

    cy.get('.form_pendiente .guardar').each((element, index, list) => {
        cy.wrap(element).click({ force: true })
    })
    cy.wait(2000)
    cy.get('.confirm').click()
})

Cypress.Commands.add('ref_laboral', () => {
    cy.get('.form_pendiente input[name=referencia_laboral_nombre]').then(elem => {
        Cypress.$(elem).val(datos);
    })
    cy.get('.form_pendiente input[name=referencia_laboral_telefono]').click()
    cy.telefono(tel)

    cy.get('.form_pendiente .guardar').each((element, index, list) => {
        cy.wrap(element).click({ force: true })
    })
    cy.wait(2000)
    cy.get('.confirm').click()

})

Cypress.Commands.add('ref_personal', () => {
    cy.get('.form_pendiente input[name=referencia_personal_nombre]').then(elem => {
        Cypress.$(elem).val(datos);
    })
    cy.get('.form_pendiente input[name=referencia_personal_celular]').click()
    cy.telefono(tel)

    cy.get('.form_pendiente .guardar').each((element, index, list) => {
        cy.wrap(element).click({ force: true })
    })
    cy.wait(2000)
    cy.get('.confirm').click()
})