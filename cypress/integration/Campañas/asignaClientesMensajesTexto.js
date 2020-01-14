function enviarMensajes(enviar) {
    if (enviar == 1) {
        cy.wait(4000)
        cy.get('object').iframeLoaded().its('document').getInDocument("input[type=search]").type("Test Geral Mensaje de Texto");
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("a").eq(2).click()
        cy.CargarDocumento("MensajesDeTexto.csv", "text/csv", "3")
    }
}
export default enviarMensajes;