<script>
import { store } from '../../../js/store';

import AppModal from '../../AppModal.vue';

export default {
    components: { AppModal },
    data() {
        return {
            store: store,
            searchMessage: '',
            emits: ["searchMessage"],
        }
    },
    methods: {
        // Funzione per generare l' src dellimmagine
        avatarImg: ({ avatar }) => `src/assets/img/avatar${avatar}.jpg`,

        // Ora e minuti attuali
        getTime() {
            return store.dateTime
        },

        // !Funzioni per cambiare sezione in mobile
        setDisplayNone(section) {
            section.style.display = 'none';
        },
        setDisplayFlex(section) {
            section.style.display = 'flex';
        },

        changeSection() {
            this.store.showSearchMessage = false;
            this.searchMessage = '';
            this.$emit('searchMessage', '');

            if (this.store.sectionChatList.style.display === 'none') {
                this.setDisplayFlex(this.store.sectionChatList);
                this.setDisplayNone(this.store.sectionChat);
            } else {
                this.setDisplayFlex(this.store.sectionChat);
                this.setDisplayNone(this.store.sectionChatList);
            }
        },

        showSearchMessage() {
            this.store.showSearchMessage = true;
        },

        deleteChat(contact) {
            contact.messages = [];
            this.store.currentContact = {}
            this.changeSection();
        },

        deleteContact(contact) {
            this.store.contacts = this.store.contacts.filter(({ id }) => contact.id !== id);
            this.store.currentContact = {};
            this.changeSection();
        }
    }
};
</script>

<template>
    <header>
        <button @click="changeSection" class="img-icon-small arrow-back"><img src="src/assets/img/arrow_back_icon.png"
                alt="arrow-back"></button>
        <button><img class="img-profile-small" :src="avatarImg(store.currentContact)"
                :alt="store.currentContact.name"></button>
        <div class="content">
            <div>{{ store.currentContact.name }}</div>
            <span v-if="store.isWriting" class="text-writing">Sta scrivendo...</span>
            <span v-else>Ultimo accesso oggi alle {{ getTime() }}</span>
        </div>

        <!-- Button for search-bar -->
        <button class="img-icon svg" @click="showSearchMessage()"><font-awesome-icon icon="magnifying-glass" /></button>

        <div class="dropdown">
            <button type="button" class="img-icon dropdown-toggle" data-bs-toggle="dropdown">
                <img src="src/assets/img/Menu.png" alt="menu" title="Menu">
            </button>

            <ul class="dropdown-menu">
                <li>
                    <button type="button" class="dropdown-item" @click="changeSection(), store.currentContact = {}">
                        Chiudi chat
                    </button>
                </li>
                <li>
                    <!-- Button delete modal -->
                    <button type="button" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete-chat">
                        Svuota chat
                    </button>
                </li>
                <li>
                    <button type="button" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete-contact">
                        Elimina contatto
                    </button>
                </li>
            </ul>
        </div>
    </header>


    <!-- Modal delete chat -->
    <AppModal message="Vuoi svuotare la chat?" button="Svuota chat" modal="delete-chat"
        @sendingModal="deleteChat(store.currentContact)" />

    <!-- Modal delete contact -->
    <AppModal message="Vuoi eliminare il contatto?" button="Elimina contatto" modal="delete-contact"
        @sendingModal="deleteContact(store.currentContact)" />
</template>

<style lang="scss" scoped>
@use '../../../assets/scss/vars' as *;

header {
    position: relative;
    z-index: 3;
}

.content {
    flex-grow: 1;
    height: 100%;
    font-weight: 400;
}

.dropdown-toggle {
    position: relative;
}

@media screen and (min-width: 750px) {
    .img-icon.svg {
        filter: invert(38%) sepia(3%) saturate(2452%) hue-rotate(159deg) brightness(93%) contrast(81%);
    }
}
</style>