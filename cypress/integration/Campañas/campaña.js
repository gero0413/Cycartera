import agregacampa from './crearCampa';
import editarCampa from './editarCampa';
import importarCampa from './importar';
import asignarClientes from './asignaClientes';


describe("Diligenciar solicitud", function() {

    it("Diligenciar", function() {
        ingresa();
        navbar("Campaña");
        // agregacampa();
        // editarCampa();
        // importarCampa();
        asignarClientes();
    })

    function ingresa() {
        cy.visit("http://10.181.3.183:8085/cmpqr_cartera/index.php");
        cy.get("input[name=usuario]").type("adminpqr2");
        cy.get("input[name=password]").type("123{enter}");
    }

    function navbar(modulo) {
        cy.get("a").contains(modulo).invoke("show").click({ force: true })
    }

})