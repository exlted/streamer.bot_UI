import 'https://esm.sh/@streamerbot/client';
import { Alert, queueAlert, setTemplate} from "./alerts.js";
import { loadTemplate, getTemplates } from "../Shared/template.js";
import {Settings} from "../Shared/settings.js"

const settings = new Settings("Alerts/settings.json");
const client =  new StreamerbotClient(settings.data.websocket);
await loadTemplate("Alerts/" + settings.data.templateFile);
setTemplate(getTemplates("#alert"));


client.on("Twitch.Follow", (message) => {
    let convertedAlert = new Alert();
    convertedAlert.message = `${message.data.user_name} just followed!`;
    convertedAlert.duration = settings.data.duration;
    convertedAlert.type = "follow";
    queueAlert(convertedAlert);
});

client.on("Twitch.Cheer", (message) => {
    let convertedAlert = new Alert();
    convertedAlert.message = `${message.data.message.displayName} just tipped ${message.data.bits} bits!`;
    convertedAlert.duration = settings.data.duration;
    convertedAlert.type = "tip";
    queueAlert(convertedAlert);
});

client.on("Twitch.ShoutoutReceived", (message) => {
    let convertedAlert = new Alert();
    convertedAlert.message = `${message.data.from_broadcaster_user_name} just raided with ${message.data.viewer_count} raiders!`;
    convertedAlert.duration = settings.data.duration;
    convertedAlert.type = "raid";
    queueAlert(convertedAlert);
});

client.on("Twitch.HypeTrainStart", (message) => {
    let convertedAlert = new Alert();
    convertedAlert.message = 'A Hype Train has just left the station!';
    convertedAlert.duration = settings.data.duration;
    convertedAlert.type = "hypeTrain";
    queueAlert(convertedAlert);
});

client.on("Twitch.HypeTrainLevelUp", (message) => {
    let convertedAlert = new Alert();
    convertedAlert.message = `Our Hype Train is now level ${message.data.level}!`;
    convertedAlert.duration = settings.data.duration;
    convertedAlert.type = "hypeTrain";
    queueAlert(convertedAlert);
});

client.on("Twitch.HypeTrainEnd", (message) => {
    let convertedAlert = new Alert();
    convertedAlert.message = `The Hype has died down at level ${message.data.level}.`;
    convertedAlert.duration = settings.data.duration;
    convertedAlert.type = "hypeTrain";
    queueAlert(convertedAlert);
});

client.on("Twitch.Raid", (message) => {
    let convertedAlert = new Alert();
    convertedAlert.message = `${message.data.from_broadcaster_user_name} just raided with ${message.data.viewers} raiders!`;
    convertedAlert.duration = settings.data.duration;
    convertedAlert.type = "raid";
    queueAlert(convertedAlert);
});

client.on("Twitch.GiftSub", (message) => {
    let convertedAlert = new Alert();
    convertedAlert.message = `${message.data.user.name} just gifted a subscription to ${message.data.recipient.name}!`;
    convertedAlert.duration = settings.data.duration;
    convertedAlert.type = "subscription";
    queueAlert(convertedAlert);
});


client.on("Twitch.Sub", (message) => {
    let convertedAlert = new Alert();
    convertedAlert.message = `${message.data.user.name} just subscribed!`;
    convertedAlert.duration = settings.data.duration;
    convertedAlert.type = "subscription";
    queueAlert(convertedAlert);
});

client.on("Twitch.ReSub", (message) => {
    let convertedAlert = new Alert();
    convertedAlert.message = `${message.data.user.name} just resubscribed for ${message.data.cumulativeMonths} months!`;
    convertedAlert.duration = settings.data.duration;
    convertedAlert.type = "subscription";
    queueAlert(convertedAlert);
});