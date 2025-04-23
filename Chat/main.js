import 'https://esm.sh/@streamerbot/client';
import { Emote, Badge, Message, addMessage, removeMessage, setTemplate } from './chat.js';
import {loadTemplate, getTemplate} from "../Shared/template.js";
import {Settings} from "../Shared/settings.js";

const settings = new Settings("Chat/settings.json");
const client =  new StreamerbotClient(settings.data.websocket);
await loadTemplate("Chat/" + settings.data.templateFile)
    .then(() => {setTemplate(getTemplate("#chat"));})



client.on("Twitch.ChatMessage", convertTwitchChatMessage);

client.on("Twitch.Cheer", convertTwitchChatMessage);

function convertTwitchChatMessage(message) {
    let convertedMessage = new Message();

    // Convert Twitch ChatMessage into common message format
    convertedMessage.rawText = message.data.message.message;
    convertedMessage.color = message.data.message.color;
    convertedMessage.ID = message.data.message.msgId;
    convertedMessage.sender = message.data.message.displayName;
    convertedMessage.value = message.data.message.bits;

    for (let badge of message.data.message.badges) {
        let convertedBadge = new Badge();
        convertedBadge.url = badge.imageUrl;
        convertedMessage.badges.push(convertedBadge);
        convertedMessage.classes.push(badge.Name);
    }

    if (message.data.message.isModerator) {
        convertedMessage.classes.push("Moderator");
    }
    if (message.data.message.isSubscribed) {
        convertedMessage.classes.push("Subscribed");
    }
    if (message.data.message.isVip) {
        convertedMessage.classes.push("VIP");
    }
    if (message.data.message.firstMessage) {
        convertedMessage.classes.push("FirstMessage");
    }
    if (message.data.message.isHighlight) {
        convertedMessage.classes.push("Highlight");
    }
    if (message.data.message.isReply) {
        convertedMessage.classes.push("Reply");
    }
    if (message.data.message.role === 4) {
        convertedMessage.classes.push("Broadcaster");
    }
    if (message.data.message.fromSharedChat) {
        convertedMessage.classes.push("Shared");
    }

    for (let emote of message.data.message.emotes) {
        let convertedEmote = new Emote();
        convertedEmote.start = emote.startIndex;
        convertedEmote.end = emote.endIndex;
        convertedEmote.url = emote.imageUrl;
        convertedMessage.emotes.push(convertedEmote);
    }

    for (let emote of message.data.message.cheerEmotes) {
        let convertedEmote = new Emote();
        convertedEmote.start = emote.startIndex;
        convertedEmote.end = emote.endIndex;
        convertedEmote.url = emote.imageUrl;
        convertedMessage.emotes.push(convertedEmote);
    }

    convertedMessage.duration = settings.data.duration;
    addMessage(convertedMessage);
}

client.on("YouTube.Message", (message) => {
    let convertedMessage = new Message();
    // Convert YouTube ChatMessage into common message format
    convertedMessage.sender = message.data.user.name;
    convertedMessage.ID = message.data.eventId;
    convertedMessage.color = "#002b36"; // TODO: Replace with a configurable color of some sort

    convertedMessage.rawText = message.data.message;

    for (let emote of message.data.emotes)
    {
        let convertedEmote = new Emote();
        convertedEmote.start = emote.startIndex;
        convertedEmote.end = emote.endIndex;
        convertedEmote.url = emote.imageUrl;
        convertedMessage.emotes.push(convertedEmote);
    }

    if (message.data.user.isModerator)
    {
        convertedMessage.classes.push("Moderator");
    }
    if (message.data.user.isSponsor)
    {
        convertedMessage.classes.push("Subscribed");
    }
    if (message.data.user.isOwner)
    {
        convertedMessage.classes.push("Broadcaster");
    }
    if (message.data.user.isVerified)
    {
        convertedMessage.classes.push("VIP");
    }

    convertedMessage.duration = settings.data.duration;
    addMessage(convertedMessage);
});

client.on("YouTube.SuperChat", (message) => {
    let convertedMessage = new Message();
    convertedMessage.sender = message.data.user.name;
    convertedMessage.ID = message.data.messageId;
    convertedMessage.color = "#000000"; // TODO: Replace with a configurable color of some sort

    convertedMessage.rawText = message.data.message;
    convertedMessage.amount = message.data.amount;

    if (message.data.user.isModerator)
    {
        convertedMessage.classes.push("Moderator");
    }
    if (message.data.user.isSponsor)
    {
        convertedMessage.classes.push("Subscribed");
    }

    convertedMessage.duration = settings.data.duration;
    addMessage(convertedMessage);
});

client.on("Twitch.RewardRedemption", (message) => {
    let convertedMessage = new Message();
    // Convert Reward Redemption into common message format
    convertedMessage.classes.push("Reward");
    convertedMessage.rawText = message.data.rawInput;
    convertedMessage.color = "#000000"; // TODO: Replace with a configurable color of some sort
    convertedMessage.ID = message.data.rewardId;
    convertedMessage.value = message.data.rewardCost;

    convertedMessage.duration = settings.data.duration;
    addMessage(convertedMessage);
});

client.on("Twitch.ChatMessageDeleted", (message) => {
    removeMessage(message.data.messageId);
});

client.on("YouTube.MessageDeleted", (message) => {
    removeMessage(message.messageId);
})