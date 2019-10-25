Cypress.Commands.add("frameFecha", (frame, element, fecha) => {
    cy
        .get(frame)
        .iframeLoaded()
        .its('document')
        .getInDocument(element).click()
        .then(input => {
            input.val(fecha)
        })
})
Cypress.Commands.add("frameClic", (frame, element, position) => {
    cy
        .get(frame)
        .iframeLoaded()
        .its('document')
        .getInDocument(element)
        .eq(position)
        .trigger("click")
})
Cypress.Commands.add("frameCheck", (frame, element, position) => {
    cy
        .get(frame)
        .iframeLoaded()
        .its('document')
        .getInDocument(element)
        .eq(position)
        .check()
})
Cypress.Commands.add("frameSelect", (frame, element, select) => {
    cy
        .get(frame)
        .iframeLoaded()
        .its('document')
        .getInDocument(element)
        .select(select)
})