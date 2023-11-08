<script>
import { store } from '../../../js/store';

export default {
    data() {
        return {
            store: store,
            searchMessage: '',
            showSearch: false,
            delay: true
        }
    },
    computed: {
        showSearchMessage() {
            if (this.store.showSearchMessage) {
                this.searchMessage = '';
                this.delay = true;

                setTimeout(() => {
                    this.showSearch = true;
                }, 1);

                return true

            } else {
                this.showSearch = false;
                setTimeout(() => {
                    this.delay = false
                }, 200)
            }
        }
    },
    methods: {
        hiddenSearchMessage(hiddenSection) {
            if (!hiddenSection) {
                this.searchMessage = '';
                this.$emit('searchMessage', '');
                return
            };

            this.store.showSearchMessage = false
            this.$refs.searchSection.classList.remove('show');
            this.searchMessage = '';
            this.showSearch = false;
            this.$emit('searchMessage', '');

            setTimeout(() => {
                this.delay = false
            }, 200)
        },
    },
};
</script>

<template>
    <div v-if="showSearchMessage || delay" class="search-section" ref="searchSection" :class="{ 'show': showSearch }">
        <div class="search-bar">
            <label for="searchMessage" class="img-icon"><font-awesome-icon icon="magnifying-glass" /></label>
            <input v-model.trim="searchMessage" @keyup="$emit('searchMessage', searchMessage)" id="searchMessage"
                type="text" placeholder="Cerca messaggi">
            <span v-if="searchMessage.length" @click="hiddenSearchMessage()" class="img-icon">
                <font-awesome-icon icon="xmark" />
            </span>
        </div>

        <div @click="hiddenSearchMessage(true)" class="img-icon svg">
            <font-awesome-icon icon="arrow-up" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../../assets/scss/vars' as *;

// Search-bar
.search-section {
    @include flex;
    position: absolute;
    inset: auto 0 0 0;
    padding: 0 15px;
    min-height: 50px;
    box-shadow: 0 2px 3px rgba(11, 20, 26, 0.08);

    z-index: 2;
    transition: all 0.15s linear;

    &.show {
        inset: auto 0 -50px 0;
    }

    .img-icon {
        filter: none;
        color: $grey;
    }
}

.search-bar {
    @include flex(normal);
    width: 100%;
    height: 35px;
    background-color: $light-grey;
    border-radius: 10px;

    label {
        margin: 0 40px 0 15px;
    }
}
</style>