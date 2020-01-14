describe("prueba de url", function(){
    it("prueba", function(){
        cy.visit("http://10.181.3.183:8085/cmpqr_cartera");
        cy.login("1094785632", "123{enter}");
        cy.navbar("Principal");
        VD();
    })

    function VD(){
        cy.visit("http://10.181.3.171/");
    }
})