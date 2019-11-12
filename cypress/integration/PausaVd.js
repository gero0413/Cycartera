describe("test", function() {
    it("prueba", function() {
        loginVD();
        pausaVD();
        cy.wait(9000);
        despausarVD();
        // verificaPausa("Activo");
    })
})

function loginVD() {
    cy.visit("http://10.181.3.171/");
    cy.get("a").contains("Agent Login").click()
    cy.get("input[name=phone_login]").type("536")
    cy.get("input[name=phone_pass]").type("pys123")
    cy.get("input[type=submit]").click()

    // VD Login
    cy.get("input[name=VD_login]").type("QA004")
    cy.get("input[name=VD_pass]").type("pys123")
    cy.get('#VD_campaign').select('')
    cy.wait(1000)
    cy.get('#VD_campaign').select('TESTMAN - Campaña de Marcación Manual').should('have.value', 'TESTMAN')
    cy.get("input[type=submit]").click()

    //Click en submit
    // Group selection
    cy.wait(4000)
    cy.xpath('//*[@id="CloserSelectBox"]/table/tbody/tr/td/font[2]/a[2]').click()
}

function pausaVD() {
    let almuerzo = '//*[@id="PauseCodeSelectA"]/font[1]/b/a';
    let backOffice = '//*[@id="PauseCodeSelectA"]/font[2]/b/a';
    let capacitacion = '//*[@id="PauseCodeSelectB"]/font[1]/b/a';
    let descanso = '//*[@id="PauseCodeSelectB"]/font[2]/b/a';
    let pausas_activas = '//*[@id="PauseCodeSelectB"]/font[3]/b/a';

    cy.xpath('//*[@id="DiaLControl"]/a[1]').click()
    cy.wait(1000)
    cy.xpath('//*[@id="DiaLControl"]/a[1]').click()
    cy.wait(1000)
    cy.xpath(capacitacion).click()
}

function despausarVD() {
    cy.xpath('//*[@id="DiaLControl"]/a[1]').click()
    cy.wait(1000)
    cy.xpath('//*[@id="Header"]/table/tbody/tr/td[2]/font/a[2]').click()
}

function verificaPausa(estado) {
    cy.entrar();
    cy.login("1094947267", "123{enter}");

    // consultar malla
    cy.navbar("Malla de Turnos");
    cy.frameFecha("object", "input[name=fecha_inicio]", hoy);
    cy.frameFecha("object", "input[name=fecha_fin]", hoy);
    cy.frameSelect("object", "select[name=cod_area]", "Crédito");
    cy.get("object").iframeLoaded().its("document").getInDocument("button").click();

    //Verificar estado
    cy.get('object').iframeLoaded().its('document').getInDocument('div.container-fluid').then(() => {
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("#malla-turnos_wrapper").should("contain", estado)
    });

    // Verificar registro

}