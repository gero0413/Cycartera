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

/**
 * Uploads a file to an input
 * @memberOf Cypress.Chainable#
 * @name upload_file
 * @function
 * @param {String} selector - element to target
 * @param {String} fileUrl - The file url to upload
 * @param {String} type - content type of the uploaded file
 */
Cypress.Commands.add('upload_file', (fileName, fileType = ' ', selector) => {
    return cy.get(selector).then(subject => {
        cy.fixture(fileName, 'base64').then(Cypress.Blob.base64StringToBlob).then(blob => {
            const el = subject[0];
            const testFile = new File([blob], fileName, {
                type: fileType
            });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(testFile);
            el.files = dataTransfer.files;
        });
    });
});

import 'cypress-file-upload';

Cypress.Commands.add('entrar', () => {
    cy.visit('http://10.181.3.183:8085/cmpqr_cartera/index.php')
})

Cypress.Commands.add('login', (user, pass) => {
    cy.get('input[type=text]').type(user)
    cy.get('input[type=password]').type(pass)
})

Cypress.Commands.add('validaForm', () => {
    var data = Cypress.$("div[name=info_personal]").children().find(':input[type="text"]');
    var agregaDatos = 'texto de prueba';
    data.each(function() {
        // alert(Cypress.$(this).val());
        if (Cypress.$(this).val() == '') {
            Cypress.$(this).val(agregaDatos);
        } else {
            // alert(Cypress.$(this).val());
        }
    })
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

// Cypress.Commands.add("validaSeleccion", (name, seleccion) => {
//     if (seleccion == "") {
//         cy.seleccionar(name);
//     }
// })

Cypress.Commands.add("navbar", ($modPrincipal, $modulo) => {
    cy.get('a.dropdown-toggle').contains($modPrincipal)
        .click()
    cy.get('a').contains($modulo)
        .click()
})