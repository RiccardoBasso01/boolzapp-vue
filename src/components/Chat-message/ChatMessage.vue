<script>
import OpenAI from "openai";

import { v4 as uuidv4 } from 'uuid';
import { store } from '../../js/store';

import SectionHeader from './header/SectionHeader.vue';
import SectionSearchbar from './header/SectionSearchbar.vue';

import InputMessage from './InputMessage.vue';
import SectionIntro from './SectionIntro.vue';

import AppModal from '../AppModal.vue';

export default {
    components: { SectionHeader, InputMessage, SectionIntro, AppModal, SectionSearchbar },
    data() {
        return {
            store: store,
        }
    },
    computed: {
        // Intro chat
        showIntro() {
            return !Object.keys(this.store.currentContact).length;
        },
        // Current contact from the store
        curCon() {
            return this.store.currentContact
        }
    },
    methods: {
        // Function to generate the src of the image
        avatarImg: ({ avatar }) => `src/assets/img/avatar${avatar}.jpg`,

        // Function to delete the message from the Array
        deleteMessage(messageId) {
            this.curCon.messages = this.curCon.messages.filter(({ id }) => messageId !== id)
        },

        // Set the scrollbar at the bottom of the chat
        scrollbarBottom() { this.$refs.messagePannel.scrollTop = this.$refs.messagePannel.scrollHeight },

        // Function to create the new message
        createNewMes(message, status) {
            const newMess = {
                id: uuidv4(), // Unique ID
                date: this.store.dateTime,
                message,
                status
            }
            this.curCon.messages.push(newMess);
        },

        createNewImg(message, status, url) {
            const newMess = {
                id: uuidv4(), // Unique ID
                date: this.store.dateTime,
                url,
                message,
                status
            }
            this.curCon.messages.push(newMess);
        },

        createImg() {
            this.createNewImg('Ecco l\'immagine', 'received', 'https://picsum.photos/600');
            this.store.isWriting = false;
        },

        // Function to comunicate with ChatGPT
        openAiMessage(message) {
            if (message == 'Immagine') { this.createImg(); return }

            const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

            async function main() {
                const completion = await openai.chat.completions.create({
                    messages: [{ role: "system", content: message }],
                    model: "gpt-3.5-turbo",
                });
                const response = completion.choices[0].message.content;
                if (response.split('')[0] == '1') { return 'json' };
                return response;
            }

            main().then((response) => {
                if (response == 'json') { this.jsonMode(message); return }
                this.createNewMes(response, 'received');
                this.store.isWriting = false
            })

        },

        jsonMode(message) {
            if (message == 'Immagine') { this.createImg(); return }

            const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

            async function main() {
                try {

                    const completion = await openai.chat.completions.create({
                        messages: [
                            {
                                role: "system",
                                content: "You are a helpful assistant designed to output JSON.",
                            },
                            { role: "user", content: message },
                        ],
                        model: "gpt-3.5-turbo-1106",
                        response_format: { type: "json_object" },
                    });
                    console.log(JSON.parse(completion.choices[0].message.content));
                    return (JSON.parse(completion.choices[0].message.content));
                }
                catch (err) {
                    console.log('errore')
                    return err;
                }
            }

            main().then((response) => {
                this.createJson(response.products, response.brand);
                this.store.isWriting = false
            }).catch((err) => {
                this.createNewMes(err, 'received');
                this.store.isWriting = false
            })

        },

        createJson(products, brand) {
            const newMess = {
                id: uuidv4(), // Unique ID
                date: this.store.dateTime,
                products,
                brand,
                status: 'received',
                type: 'list',
            }
            console.log(newMess.products)
            this.curCon.messages.push(newMess);
        },

        // Function to move current contact at the top
        moveCurrentContact() {
            const contacts = this.store.contacts;
            if (contacts[0] !== this.store.currentContact) {
                let currIndex = null;
                for (let i = 0; i < contacts.length; i++) {
                    if (contacts[i] == this.store.currentContact) {
                        currIndex = i;
                    }
                }

                for (let i = currIndex; i >= 0; i--) {
                    contacts[i] = contacts[i - 1];
                }

                contacts[0] = this.store.currentContact;
            }
        },

        // Function to send the message
        sendMessage(message) {
            if (!message) return;

            const newMessage = message.charAt(0).toUpperCase() + message.slice(1);
            this.createNewMes(newMessage, 'sent');

            // Move current contact to the first position of the array contacts
            this.moveCurrentContact();

            this.store.isWriting = true;

            // Call chat gpt
            if (this.store.currentContact.id == 0) { this.openAiMessage(newMessage); return };

            setTimeout(() => {
                if (newMessage == 'Ciao') {
                    this.createNewMes('Ciao', 'received')
                } else if (newMessage == 'Come stai?' || newMessage == 'Come va?') {
                    this.createNewMes('Bene, tu?', 'received')
                } else {
                    this.createNewMes('Hai ragione!', 'received')
                }
                this.store.isWriting = false;
            }, 1000)
        },


        // Search function
        searchResult(data) {
            // If data is empty set the default value
            if (!data) {
                const messages = document.querySelectorAll('.message-text')
                messages.forEach(m => { m.innerText = m.textContent });
                return
            }

            // Search text in upper case
            const filter = data.toUpperCase();
            // All the current chat messages
            const messages = document.querySelectorAll('.message-text')

            messages.forEach(m => {
                // Get the message texts
                let textValue = m.textContent;
                // If the searched text is in the message
                if (textValue.toUpperCase().indexOf(filter) > -1) {
                    // Replace searched text with a span
                    textValue = textValue.replace(
                        new RegExp(filter, 'gi'), // Regular expretion for case sensitive
                        '<mark>$&</mark>'
                    );
                    m.innerHTML = textValue;
                }
            });
        },

        // Go bottom
        scroll() {
            // Height of message pannel (section that you see on the page)
            const messagePannelHeight = this.$refs.messagePannel.getBoundingClientRect().height;
            // The pixels that scrolled the message pannel from the top side of the window
            const messagePannelScroll = this.$refs.messagePannel.scrollTop;
            // Total height of the entire element, visible and invisible
            const totalHeight = this.$refs.messagePannel.scrollHeight;
            // How many pixels before the bottom does the call start
            const tollerance = 50;

            if (messagePannelHeight + messagePannelScroll + tollerance >= totalHeight) {
                this.$refs.goBottom.classList.remove('show')
            } else {
                this.$refs.goBottom.classList.add('show')
            }
        }
    },
    mounted() {
        this.store.sectionChat = this.$refs.sectionChat;
    },
    updated() {
        this.scrollbarBottom();
    }
}
</script>

<template>
    <section id="openChat" ref="sectionChat">
        <!-- Intro -->
        <SectionIntro v-if="showIntro" />

        <!-- Header -->
        <div v-else class="header">
            <SectionHeader />
            <SectionSearchbar @searchMessage="searchResult($event)" />
        </div>

        <!-- Message section -->
        <main>
            <!-- Chat messages -->
            <section @scroll="scroll" id="message-pannel" ref="messagePannel" :class="{ 'p-top': store.showSearchMessage }">
                <div v-for="message in curCon.messages" :class="message.status" class="message">
                    <span class="triangle-left"></span>

                    <!-- Content of the message -->
                    <div v-if="message.type == 'list'" class="message-content">
                        <!-- Message dropdown -->
                        <div class="dropdown">
                            <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown">
                                <span><font-awesome-icon icon="angle-down" /></span>
                            </button>

                            <div class="dropdown-menu">
                                <ul>
                                    <li>
                                        <!-- Button delete modal -->
                                        <button type="button" class="dropdown-item" data-bs-toggle="modal"
                                            data-bs-target="#delete-message" @click="currentMessage = message.id">
                                            Elimina
                                        </button>
                                    </li>
                                    <!-- <li><button class="dropdown-item" id="listen">Ascolta</button></li> -->
                                    <li><a class="dropdown-item disabled" href="#">Rispondi</a></li>
                                </ul>
                            </div>

                        </div>

                        <span class="message-text">
                            <div class="row">
                                <div v-for="product in message.products" class="product col">
                                    <div class="product-img">
                                        <img src="src\assets\svg\placeholder.svg" alt="placeholder">
                                    </div>
                                    <div class="name">
                                        {{ product.name }}
                                    </div>

                                    <div class="price">
                                        {{ product.price }}€
                                    </div>
                                </div>
                            </div>
                            <!-- <ul>
                                <li v-for="product in message.products">
                                    {{ product.name }}
                                </li>
                            </ul> -->
                        </span>

                        <div class="date">{{ message.date }}</div>
                    </div>

                    <div v-else class="message-content" :class="{ 'image': message.url }">
                        <!-- Message dropdown -->
                        <div class="dropdown">
                            <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown">
                                <span><font-awesome-icon icon="angle-down" /></span>
                            </button>

                            <div class="dropdown-menu">
                                <ul>
                                    <li>
                                        <!-- Button delete modal -->
                                        <button type="button" class="dropdown-item" data-bs-toggle="modal"
                                            data-bs-target="#delete-message" @click="currentMessage = message.id">
                                            Elimina
                                        </button>
                                    </li>
                                    <!-- <li><button class="dropdown-item" id="listen">Ascolta</button></li> -->
                                    <li><a class="dropdown-item disabled" href="#">Rispondi</a></li>
                                </ul>
                            </div>

                        </div>
                        <!-- Image -->
                        <div v-if="message.url" class="message-text img">
                            <img class="img-test" :src="message.url" :alt="message.url">
                        </div>

                        <span class="message-text">{{ message.message }}</span>
                        <div class="date">{{ message.date }}</div>
                    </div>

                    <span class="triangle-right"></span>
                </div>
            </section>

            <button ref="goBottom" class="go-bottom" @click="scrollbarBottom">
                <font-awesome-icon icon="angle-down" />
            </button>
        </main>

        <!-- Modal delete message -->
        <AppModal message="Eliminare il messaggio?" button="Elimina per me" modal="delete-message"
            @sendingModal="deleteMessage(currentMessage)" />

        <!-- Input Message -->
        <InputMessage @newMessage="sendMessage($event)" />

    </section>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;

// Go bottom button
.go-bottom {
    @include circle(42px);
    @include flex;
    font-size: 20px;
    color: $grey;
    position: absolute;
    z-index: 2;
    bottom: 17px;
    right: 11px;
    background-color: white;
    box-shadow: 0 1px 1px 0 rgba(black, .06), 0 2px 5px 0 rgba(black, .2);
    cursor: pointer;

    scale: 0.2;
    opacity: 0;

    transition: all .2s linear;

    &.show {
        opacity: 1;
        scale: 1;
    }
}

.header {
    position: relative;
}

// Message section
main {
    flex-grow: 1;
    background-color: $chat-background;
    overflow: hidden;
    position: relative;

    &::before {
        content: '';
        background-image: url(../../assets/img/bg-chat.png);
        background-repeat: repeat;
        opacity: 0.4;
        position: absolute;
        inset: 0;
    }
}

// Chat messages
#message-pannel {
    padding: 12px 0 0 0;
    overflow: hidden scroll;
    position: absolute;
    inset: 0;

    transition: all .15s linear;

    &.p-top {
        padding: 60px 0 0 0;
    }
}

.message {
    display: flex;
    padding: 0 5%;
    margin-bottom: 10px;
}

.message-text.img {
    margin-bottom: 7px;
    border-radius: 10px;
    overflow: hidden;
}

.message.sent {
    justify-content: flex-end;
}

.message.received {
    justify-content: flex-start;
}

// Content of the message
.message-content {
    padding: 8px;
    box-shadow: 1px 1px 1px $grey-shadow;
    position: relative;

    max-width: 80%;
    overflow-wrap: break-word;
    white-space: pre-wrap;

    &.image {
        max-width: 50%;
    }
}

.message.sent .message-content {
    background-color: $light-green;
    border-radius: 10px 0 10px 10px;
}

.message.received .message-content {
    background-color: #fff;
    border-radius: 0 10px 10px 10px;
}

.product {
    .name {
        margin-top: 10px;
        @include font();
    }

    .price {
        @include font(400, 'xs', );
    }
}

.product-img {
    @include square(100px);
    border: 5px solid $light-green;
    border-radius: 10px;
}


// Message triangles
.message.sent .triangle-right {
    width: 0;
    height: 0;
    border-left: 8px solid $light-green;
    border-bottom: 12px solid transparent;
    position: relative;
}

.message.received .triangle-left {
    width: 0;
    height: 0;
    border-right: 8px solid #fff;
    border-bottom: 12px solid transparent;
}

// Hour and minutes
.date {
    font-size: .6875rem;
    color: $grey;
}

.message.sent .date {
    text-align: end;
}

// Dropdown
.dropdown-toggle {
    position: absolute;
    inset: 0 0 auto auto;

    opacity: 0;
    overflow: hidden;

    span {
        translate: 100%;
        position: absolute;
        inset: 0 0 auto auto;
        opacity: 0;

        transition: all 0.3s;
    }

    &:focus {
        opacity: 1;

        span {
            translate: 0;
            opacity: 1;
        }
    }
}

.message.sent {
    .dropdown-toggle {
        background: radial-gradient(at top right, rgba(#d9fdd3, 1) 60%, rgba(#d9fdd3, 0) 80%);

        &:focus+.dropdown-menu {
            animation: scale .15s linear forwards;
        }
    }
}

.received.message {
    .dropdown-toggle {
        background: radial-gradient(at top right, rgba(white, 1) 60%, rgba(white, 0) 80%);

        &:focus+.dropdown-menu {
            animation: scale .15s linear forwards;
        }
    }
}

.message-content:hover .dropdown-toggle {
    opacity: 1;

    span {
        translate: 0;
        opacity: 1;
    }
}
</style>