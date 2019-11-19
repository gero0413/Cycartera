// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-file-upload';

Cypress.Commands.add('entrar', () => {
    cy.visit("http://10.181.3.183:8085/cmpqr_cartera/index.php");
})

Cypress.Commands.add('login', (user, pass) => {
    cy.get('input[name=usuario]').type(user)
    cy.get('input[name=password]').type(pass)
})

Cypress.Commands.add("navbar", (modulo) => {
    cy.get("a").contains(modulo).invoke("show").click({ force: true })
})

Cypress.Commands.add(
    'iframeLoaded', { prevSubject: 'element' },
    ($iframe) => {
        const contentWindow = $iframe.prop('contentWindow')
        return new Promise(resolve => {
            if (
                contentWindow &&
                contentWindow.document.readyState === 'complete'
            ) {
                resolve(contentWindow)
            } else {
                $iframe.on('load', () => {
                    resolve(contentWindow)
                })
            }
        })
    })

Cypress.Commands.add('getInDocument', { prevSubject: 'document' },
    (document, selector) => Cypress.$(selector, document)
)

Cypress.Commands.add("seleccionar", (name) => {
    let options = Cypress.$(name + ">option").length;
    let random = Math.floor(Math.random() * options);
    cy.get(name + ">option").eq(String(random)).then(e => {
        cy.get(name).select(e.val());
        cy.then(() => {
            if (Cypress.$(name).val() == "") {
                cy.seleccionar(name);
            }
        })
    })
})

Cypress.Commands.add("testSelect", function() {
    cy
        .get(frame)
        .iframeLoaded()
        .its('document')
        .getInDocument(element)
        .select(select)
})

Cypress.Commands.add("validaTurno", function() {
    cy.navbar("Pausas");
    cy.get('object').iframeLoaded().its('document').getInDocument('div.row').then(() => {
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("#malla-turnos_wrapper").should("contain", "¡No se encuentra en el malla de turnos! El usuario no está en el horario que le corresponde")
    });
})

Cypress.Commands.add("vHora", function() {
    let hora = Cypress.moment().hours();
    let minuto = Cypress.moment().minutes();
    let sec = Cypress.moment().seconds();

    let str_hora = new String(hora);
    let str_minuto = new String(minuto);
    let str_sec = new String(sec);

    if (str_hora.length == 1) {
        hora = "0" + hora
    }
    if (str_minuto.length == 1) {
        minuto = "0" + minuto
    }
    if (str_sec.length == 1) {
        sec = "0" + sec
    }
    let final = hora + ":" + minuto + ":" + sec;
    return final;
})

Cypress.Commands.add("obtieneValor", function(vPausas) {
    let inicio = vPausas[0];
    let fin = vPausas[1];
    console.log(inicio + "fin" + fin);
})