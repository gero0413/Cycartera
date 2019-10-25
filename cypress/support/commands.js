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

Cypress.Commands.add("CargarDocumentos", (selector, cantidad) => {
    cy.get('object').iframeLoaded().its('document').getInDocument(selector).each((element, index, list) => {
        cy.wrap(element).within(form => {
            const  fileName  =  'TextImportarMalla.xls'; 
            cy.get('input[type=file]')
                .invoke('attr', 'style', 'display: block')
                .should('have.attr', 'style', 'display: block')
            cy.fixture(fileName).then(fileContent  =>  {
                for (let i = 0; i < cantidad; i++) {   
                    cy.get('input[type=file]')
                        .upload({  fileContent,  fileName,  mimeType:   'application/vnd.ms-excel', encoding: 'utf-8'  });
                } 
            });
        })
    });
})



Cypress.Commands.add('entrar', () => {
    cy.visit('http://10.181.3.183:8085/cmpqr_cartera/index.php')
})

Cypress.Commands.add('login', (user, pass) => {
    cy.get('input[type=text]').type(user)
    cy.get('input[type=password]').type(pass)
})

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

Cypress.Commands.add("navbar", ($modPrincipal, $modulo) => {
    cy.get('a.dropdown-toggle').contains($modPrincipal)
        .click()
    cy.get('a').contains($modulo)
        .click()
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