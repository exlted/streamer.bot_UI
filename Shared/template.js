export {loadTemplate, getTemplate, getTemplates};

/**
 *
 * @param fileName {string}
 */
async function loadTemplate(fileName) {
    return fetch(fileName)
        .then(res => res.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            let templates  = doc.querySelectorAll("template");

            for (let template of templates) {
                document.body.appendChild(template);
            }
        })
}

/**
 *
 * @param templateId {string}
 */
function getTemplate(templateId) {
    return document.querySelector(templateId);
}

function getTemplates() {
    let templates = document.querySelectorAll("template");
    let templatesByID = new Map();
    for  (let template of templates) {
        templatesByID.set(template.id, template);
    }
    return templatesByID;
}