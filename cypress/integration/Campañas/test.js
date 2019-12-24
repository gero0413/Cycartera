describe("Gestionar clientes manual", function() {

    it("Gestionar clientes", function() {
        ingresa();

    })
})

function ingresa() {
    cy.visit("http://10.181.3.183:8085/cmpqr_cartera/index.php");
    // cy.login("1094947267", "123{enter}");
    // cy.navbar("Salir");
    // cy.get(".confirm").click()
    cy.wait(2000)
    cy.visit("https://10.181.0.153/fabricacreditos/index.php")

}