import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {OpenAI} from "openai";
import {APIPromise} from "openai/core";
import {environment} from "../../../environments/environment";
import {ChatLog, MsgGroup} from "../../../stories/sb-main-desk/chat/chat.component";
import {map} from "rxjs/operators";


const openai = new OpenAI({apiKey: environment.apiKey, dangerouslyAllowBrowser: true });

const initChatCompletion: OpenAI.Chat.ChatCompletionCreateParamsNonStreaming = {
    model: "gpt-3.5-turbo",
    messages: [
        { role: "system", content: "You are a contact center agent in Tadiran-Telecom company." },
        { role: "user", content: "please introduce yourself." }
    ]
};



@Injectable({
    providedIn: 'root'
})
export class AIService implements OnInit, OnDestroy {

    static toChatCompletionMessage = map((msgGrp:MsgGroup) =>
        <OpenAI.Chat.Completions.ChatCompletionMessageParam>
            {
                role: (msgGrp.pop().participant == "Agent" ? "assistant" : "user"),
                content: msgGrp.pop().message
            }
    );

    mChatCompletion: OpenAI.Chat.ChatCompletionCreateParamsNonStreaming = {
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a contact center agent in Tadiran-Telecom company." },
            { role: "user", content: "please introduce yourself." }
        ]
    };

    sendBotLog(chatLog: ChatLog): APIPromise<OpenAI.Chat.Completions.ChatCompletion> {
        let chatCompletion: OpenAI.Chat.ChatCompletionCreateParamsNonStreaming = initChatCompletion;

        chatCompletion.messages = chatCompletion.messages.concat(
            chatLog.map(msgGrp => msgGrp?.pop())
                .map(bubble =>
                    <OpenAI.Chat.Completions.ChatCompletionMessageParam> {
                        role: (bubble.participant == "Agent" ? "assistant" : "user"),
                        content: bubble.message
                    }
            )
        )

        return openai.chat.completions.create(chatCompletion);
    }

    sendBotMsg(msg: string) {

        this.mChatCompletion.messages.push(
            <OpenAI.Chat.Completions.ChatCompletionMessageParam> {
                        role: "user",
                        content: msg
            })

        return openai.chat.completions.create(this.mChatCompletion);
    }


    public initBot(): Promise<string> {

        return openai.chat.completions.create(initChatCompletion).withResponse()
            .then(ans =>
                    new Promise<OpenAI.Chat.Completions.ChatCompletionMessage>((resolve, reject) => {
                            resolve(ans.data.choices.pop().message);
            }))
            .then((msg) => new Promise<string>((resolve, reject) => {
                    this.mChatCompletion.messages.push(msg)
                    resolve(msg.content);
            }))

    }


    public toBot(msg: string): Promise<string> {

        return new Promise<OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming>( (resolve, reject) => {
                    this.mChatCompletion.messages.push(<OpenAI.Chat.Completions.ChatCompletionMessageParam>{role: "user", content: msg});
                    resolve(this.mChatCompletion);
            })
            .then(chatCompletion => openai.chat.completions.create(chatCompletion).withResponse())
            .then(ans => new Promise<OpenAI.Chat.Completions.ChatCompletionMessageParam>((resolve, reject) => {
                    resolve(ans.data.choices.pop().message);
            }))
            .then((message) => {
                return new Promise<string>((resolve, reject) => {
                    this.mChatCompletion.messages.push(message);
                    resolve(message.content.toString());
                });
            });

    }

    ngOnDestroy(): void {
        // Implementation for OnDestroy
    }

    ngOnInit(): void {
        // Implementation for OnInit
    }
}
