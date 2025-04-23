export {Emote, Badge, Message, setTemplate, addMessage, removeMessage}

class Badge {
	url;
	constructor() {}
}

class Emote {
	start;
	end;
	url;
	constructor(){}
}

class Message {
	color;
	rawText;
	emotes = [];
	classes = [];
	ID;
	sender;
	badges = [];
	value;
	duration;

	processedText;
	processedBadges;


	constructor() {}

	process() {
		this.processedText = this.rawText;

		this.emotes.sort((a, b) => {
			if (a.start < b.start) {
				return -1;
			}
			else if (a.start > b.start) {
				return 1;
			}
			return 0;
		})

		let prevStart = this.processedText.length - 1;
		if (this.emotes.length > 0)
		{
			for (let index = this.emotes.length - 1; index >= 0; index--) {
				let emote = this.emotes[index];
				if (prevStart !== emote.end) {
					this.processedText = wrapRange(this.processedText, emote.end + 1, prevStart - 1, "<span>", "</span>");
				}
				prevStart = emote.start;
				this.processedText = replaceRange(this.processedText, emote.start, emote.end + 1, `<img alt="" src="${emote.url}" class="emote"/>`);
			}
			if (prevStart !== 0)
			{
				this.processedText = wrapRange(this.processedText, 0, prevStart - 1, "<span>", "</span>");
			}
		}
		else
		{
			this.processedText = `<span>${this.processedText}</span>`
		}

		this.processedBadges = "";

		for (let badge of this.badges) {
			this.processedBadges = this.processedBadges + `<img alt="" src="${badge.url}"/>`;
		}
	}
}

let template;

function setTemplate(templateObject) {
	template = templateObject;
}

/**
 *
 * @param message {Message}
 */
function addMessage(message) {
	message.process();

	let clone = template.content.cloneNode(true);

	clone.querySelector("li").id = message.ID;
	let name = clone.querySelector(".name");
	name.innerText = message.sender ;
	name.style["color"] = message.color;

	clone.querySelector(".badges").innerHTML = message.processedBadges;
	clone.querySelector(".message").innerHTML = message.processedText;

	document.getElementById("chatbox").appendChild(clone);

	if (message.duration > -1)
	{
		setTimeout(removeMessage.bind(this, message.ID), message.duration);
	}
}

function wrapRange(string, start, end, pre, post) {
	return string.substring(0, start) + pre + string.substring(start, end) + post + string.substring(end);
}

function replaceRange(string, start, end, substitute) {
	return string.substring(0, start) + substitute + string.substring(end);
}

function removeMessage(messageId) {
	document.getElementById(messageId).remove();
}