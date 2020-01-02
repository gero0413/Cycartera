import { agregaAsesor, editaAsesor, eliminaAsesor } from './gestionAsesores';

describe("Distribución clientes", function() {
    it("Gestionar asignación y asesores", function() {
        ingresa();
        verificaDatos()

        agregaAsesor(1);
        editaAsesor();
        eliminaAsesor();

        asignar(1);
        reasignar();
    })
})

let campana = "Test Geral Manual";
let cantidad_clientes = 20;
let n_horas = 8;
let n_dias = 1;

function ingresa() {
    cy.entrar();
    cy.login("admingeral", "123{enter}");
    cy.navbar("Campaña");

    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument("input[type=search]").type(campana)
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument("a[title='Asignar asesores']").first().click()

    // Verificar cantidad de asesores
    // cy.wait(2000)
    // cy.get('object').iframeLoaded().its('document').getInDocument("#tabla-asesores").find("tr").then(el => {
    //     let odd = Cypress.$(el).length - 1;
    //     cy.log(odd)
    // });

}

function verificaDatos(verificarDatos) {
    if(verificarDatos == 1){
        // Datos de la campaña
        cy.get('object').iframeLoaded().its('document').getInDocument("div.text-center").should("contain", campana)
        cy.get('object').iframeLoaded().its('document').getInDocument("div.text-center").should("contain", cantidad_clientes)

        //Campos de la tabla
        cy.get('object').iframeLoaded().its('document').getInDocument("#tabla-asesores").should("contain", "Asesor")
        cy.get('object').iframeLoaded().its('document').getInDocument("#tabla-asesores").should("contain", "N° Horas")
        cy.get('object').iframeLoaded().its('document').getInDocument("#tabla-asesores").should("contain", "N° Días")
        cy.get('object').iframeLoaded().its('document').getInDocument("#tabla-asesores").should("contain", "N° Clientes")
        cy.get('object').iframeLoaded().its('document').getInDocument("#tabla-asesores").should("contain", "Acción")

        // Datos de los asesores
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("#tabla-asesores > tbody > tr > td").then(($td) => {
            if ($td.hasClass('dataTables_empty')) {
                cy.get('object').iframeLoaded().its('document').getInDocument("button#nueva-asignacion").should('be.visible')
                cy.get('object').iframeLoaded().its('document').getInDocument("button#asignar-clientes").should('not.be.visible')
                cy.get('object').iframeLoaded().its('document').getInDocument("button#reasignar-clientes").should('not.be.visible')
            } else {
                cy.get('object').iframeLoaded().its('document').getInDocument("button#nueva-asignacion").should('be.visible')
                cy.get('object').iframeLoaded().its('document').getInDocument("button#asignar-clientes").should('be.visible')
                cy.get('object').iframeLoaded().its('document').getInDocument("button#reasignar-clientes").should('be.visible')
            }
        })
    }
}

function asignar(asignar) {
    if(asignar == 1){
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("button#asignar-clientes").click()
        cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
    }
}

function reasignar(reasigna) {
    if(reasigna == 1){
        cy.get('object').iframeLoaded().its('document').getInDocument("button#reasignar-clientes").click()
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument('div#div-formulario-plantilla').then(() => {
            // cy.get('object').iframeLoaded().its('document').getInDocument("a#volver").click()
            cy.get('object').iframeLoaded().its('document').getInDocument("select[name=asesor_origen]").select("Asesor malla turnos 3")
            cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_gestion]").select("SIN GESTION")
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name=no_pasar]").type("1")
            cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_usuario]").select("Usuario Pruebas")
            cy.get('object').iframeLoaded().its('document').getInDocument("button#reasignar").click()
        })
    }
}