describe("test", function() {
    it("prueba", function() {
        ingresa();
        // loginVD();
    })
})

function ingresa() {
    // cy.entrar();
    // cy.login("adminpqr2", "123{enter}");
    // cy.navbar("Campaña");
    cy.visit("http://10.181.3.171/agc/vicidial.php?relogin=YES&session_epoch=1572984989&session_id=8600068&session_name=1572984608_cc53614236593&VD_login=QA004&VD_campaign=TESTMAN&phone_login=536&phone_pass=pys123&VD_pass=pys123")
    cy.get("input[type=submit]").click()
}

function loginVD() {
    cy.get("a").contains("Agent Login").click()
    cy.get("input[name=phone_login]").type("536")
    cy.get("input[name=phone_pass]").type("pys123")
    cy.get("input[type=submit]").click()

    // VD Login
    cy.get("input[name=VD_login]").type("QA004")
    cy.get("input[name=VD_pass]").type("pys123")
    cy.wait(2000)
    cy.get("#VD_campaign")
        .contains('TESTMAN - Campaña de Marcación Manual')
        .then(function($select) {
            var value = $select[0].value;
            cy.get('[data-cy=test_select]').select(value, { force: true });
        });
}

function pausaVD() {
    // submit de login
    cy.get("a").contains("SUBMIT").click()

    // llamada entrante a zoiper
    cy.wait(4000)

    // Group selection
    // cy.get("a").contains("OK").click()
    // cy.wait(4000)

    cy.get("a").contains("SUBMIT").click()
    cy.wait(2000)

}