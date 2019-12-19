describe("Gestionar clientes manual", function() {

    it("Gestionar clientes", function() {
        ingresa();
        cy.wait(2000)
            // gestionClientes();
        repiteFuncion(1);

    })
})

let campana = "Test Geral Manual";
let gestion = "SIN GESTION";
let indicativo = 1;


function ingresa() {
    cy.entrar();
    cy.login("1094947267", "123{enter}");
    cy.navbar("Principal");
    cy.visit("http://10.181.3.183:8085/cmpqr_cartera/revisa.php?rand=804324054&modulo=3")

    cy.contains(campana).click();
    cy.contains(gestion).click();
    cy.get("body > div.container-fluid > table > tbody > tr:nth-child(1) > td.tdmenuiz > h6").should("contain", "Modulo:Campañas (" + campana + ")")
}

function repiteFuncion(repeticiones) {
    for (let i = 0; i < repeticiones; i++) {
        gestionClientes();
    }
}

function gestionClientes() {
    cy.get("#idgrillalistado tr").find("a").then(el => {
        let odd = Cypress.$(el).length;
        for (let i = 0; i < odd; i++) {    
            cy.get("#idgrillalistado > tbody > tr:nth-child(1) > td.sorting_1 > a").click().then(() => {
                cy.get("#marcar").click()
                cy.wait(3000)
                cy.get('[type="radio"]').check(indicativo + '$3000000000')
                cy.get("#marcacion").click()
                cy.seleccionar("select[name=cod_gestion_nu]")
                cy.get("#observacion").type("Test Geral automatización")
                cy.get("#actualizar").click()
                cy.wait(2000)
            })
        }
        cy.then(() => {
            cy.visit("http://10.181.3.183:8085/cmpqr_cartera/revisa.php?rand=804324054&modulo=3")
            cy.contains(campana).click();
            cy.get("tbdetcart").should("not.contain", gestion)
        })
    });
}

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