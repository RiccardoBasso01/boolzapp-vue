<script>
import { store } from '../../js/store';
import SectionHeader from './SectionHeader.vue';
import SectionSearchbar from './SectionSearchbar.vue';

export default {
    components: { SectionHeader, SectionSearchbar },
    data() {
        return {
            store: store,
            warningVisible: true,
            searchText: '',
        }
    },
    computed: {
        // Array with searched contacts
        searchResult() {
            return this.store.contacts.filter((contact) => contact.name.toLowerCase().includes(this.searchText.toLowerCase()));
        }
    },
    methods: {
        // Toggle warning
        showWorning() { this.warningVisible = !this.warningVisible },

        // Function to generate the src of the image
        avatarImg: ({ avatar }) => `src/assets/img/avatar${avatar}.jpg`,

        // Function to get the last chat message
        lastMessage: ({ messages }) => !messages.length ? 'Non ci sono messaggi' : messages[messages.length - 1].message,
        // Function to get information about the last message
        lastMessageInfo: ({ messages }, element) => !messages.length ? '' : messages[messages.length - 1][element],

        // Function to change the active chat
        changeChat(contact) {
            this.store.currentContact = contact;
            if (this.store.showSearchMessage == true) this.store.showSearchMessage = false;
        },

        // Functions for changing sections in mobile resolution
        setDisplayNone: (section) => section.style.display = 'none',
        setDisplayFlex: (section) => section.style.display = 'flex',

        changeSection() {
            if (this.store.sectionChatList.style.display === 'none') {
                this.setDisplayFlex(this.store.sectionChatList);
                this.setDisplayNone(this.store.sectionChat);
            } else {
                this.setDisplayFlex(this.store.sectionChat);
                this.setDisplayNone(this.store.sectionChatList);
            }
        },

        // Fetch the search text
        fetchResult(data) {
            this.searchText = data;

            // If data is empty set the default value
            if (!data) {
                const contacts = document.querySelectorAll('.contact-name')
                contacts.forEach(c => { c.innerText = c.textContent });
                return
            }

            // Search text in upper case
            const filter = data.toUpperCase();
            setTimeout(() => {
                // All the contacts name searched
                const contacts = document.querySelectorAll('.contact-name')


                contacts.forEach(c => {
                    // Get the contact name
                    let textValue = c.textContent;
                    // If the searched text is in the contact name 
                    if (textValue.toUpperCase().indexOf(filter) > -1) {
                        // Replace searched text with a span
                        textValue = textValue.replace(
                            new RegExp(filter, 'gi'), // Regular expretion for case sensitive
                            '<span class="text-searched">$&</span>'
                        );
                        c.innerHTML = textValue;
                    } else {
                        c.innerHTML = `<span>${c.textContent}</span>`
                    }
                });
            }, 10)
        }
    },
    mounted() {
        this.store.sectionChatList = this.$refs.sectionChatList;
    },
}
</script>

<template>
    <section id="chatList" ref="sectionChatList">
        <!-- Header -->
        <SectionHeader :name="store.user.name" :image="store.user.avatar" />

        <!-- Search-bar -->
        <SectionSearchbar :warning="warningVisible" @searchText="fetchResult($event)" />

        <!-- warning -->
        <div class="warning" v-if="warningVisible">
            <div class="bell-slash">
                <img src="src/assets/img/bell-slash.png" alt="bell-slash">
            </div>

            <div class="warning-message">
                <div> Ricevi notifiche di nuovi messaggi </div>
                <a href="#"> Attiva notifiche desktop <font-awesome-icon icon="chevron-right" /></a>
            </div>

            <button @click="showWorning">
                <font-awesome-icon icon="xmark" style="color: white;" size="xl" />
            </button>
        </div>

        <!-- Chat list -->
        <div class="chat-list">
            <div v-if="searchResult.length" class="chat-plate search-title"> CHAT </div>
            <div v-else class="chat-empty">Nessuna chat trovata</div>

            <ul :class="{ 'search': searchText }">
                <li v-for="contact in searchResult " @click="changeChat(contact)" class="chat-plate"
                    :class="{ 'active': store.currentContact === contact }">
                    <span @click="changeSection" id="change-section"></span>
                    <div class="img-profile-big">
                        <img :src="avatarImg(contact)" :alt="contact.name">
                    </div>
                    <div class="content">
                        <div class="name">
                            <div :class="{ 'contact-name': searchText.length }">
                                {{ contact.name }}
                            </div>
                            <span>
                                {{ lastMessageInfo(contact, 'date') }}
                            </span>
                        </div>
                        <span v-if="store.currentContact === contact && store.isWriting" class="text-writing">Sta
                            scrivendo...</span>
                        <div v-else :class="{ 'sent': lastMessageInfo(contact, 'status') == 'sent' }" class="w-100">
                            <span class="last-message">{{ lastMessage(contact) }}</span>
                        </div>
                    </div>
                </li>
            </ul>

        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;

.content {
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;

    .name {
        @include flex(space-between);
        width: 100%;

        span {
            @include font(400, 'xs', $color: $grey)
        }
    }
}

.w-100 {
    max-width: 100%;
    width: 100%;
    @include flex(start, $gap: 5px);
}

.last-message {
    // max-width: 280px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    max-width: 100%;
}

.sent::before {
    content: url(src/assets/svg/message-sent.svg);
    @include square(18px);
    filter: invert(69%) sepia(16%) saturate(1665%) hue-rotate(161deg) brightness(97%) contrast(90%);
}

/* Warning */
.warning {
    @include flex(flex-start, center);
    min-height: 90px;
    padding: 15px;
    background-color: $light-blue;
}

.bell-slash {
    @include circle(50px);
    @include flex;
    margin-right: 15px;
    background-color: white;

    img {
        width: 20px;
        filter: invert(62%) sepia(64%) saturate(432%) hue-rotate(157deg) brightness(98%) contrast(87%);
    }
}

.warning-message {
    flex-grow: 1;
    font-weight: 400;

    a {
        @include font($size: 'xs', $color: $dark-grey);
        margin-top: 10px;
    }
}

/* Chat list */
.chat-list {
    overflow: hidden auto;
    font-weight: 400;
    position: relative;
    flex-grow: 1;
}

.chat-plate {
    @include flex(normal, center, $gap: 20px);
    height: 70px;
    border-bottom: 1px solid $light-grey;
    padding: 0 15px 0 15px;
    position: relative;
    background-color: white;

    &:hover,
    &.active {
        background-color: $light-grey;
        cursor: pointer;
    }
}

.chat-empty {
    @include font(300, 'xs', $color: $grey);
    padding-top: 70px;
    text-align: center;
}

.search-title {
    color: $green;
    padding-left: 25px;
    background-color: transparent !important;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;

    &:hover {
        cursor: default;
    }
}

#change-section {
    position: absolute;
    inset: 0;
}

ul {
    transition: all .3s;
}

.search {
    translate: 0 70px;
}
</style>