export {Alert, setTemplate, queueAlert}

class Alert {
    message;
    duration;
    type = "alert";
    #generatedElement;

    show() {

        let type = this.type;
        if (!template.has(this.type))
        {
            type =  "alert";
            console.error(`Template File did not implement a template for ${this.type}`);
        }

        let clone = template.get(type).content.cloneNode(true);
        clone.querySelector(".message").appendChild(document.createTextNode(this.message));
        this.#generatedElement = clone.children[0];
        document.body.appendChild(clone);

        setTimeout(this.timeout.bind(this), this.duration);
    }

    timeout() {

        if (this.#generatedElement)
        {
            this.#generatedElement.classList.remove("show");
            this.#generatedElement.classList.add("hide");
        }

        setTimeout(() => {
            if (this.#generatedElement) {
                this.#generatedElement.remove();
                this.#generatedElement = null;
            }

            nextAlert();
        }, 300);

    }
}

let template;

function setTemplate(templateObject) {
    template = templateObject;
}

/**
 *
 * @type {Alert[]}
 */
let alertQueue = [];
let alertActive = false;

function queueAlert(alert) {
    if (alertActive)
    {
        alertQueue.push(alert);
    }
    else
    {
        alertActive = true;
        alert.show();
    }
}

function nextAlert() {
    let alert = alertQueue.shift();
    if (alert)
    {
        alert.show();
    }
    else
    {
        alertActive = false;
    }
}

