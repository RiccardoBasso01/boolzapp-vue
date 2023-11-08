<script>
export default {
    props: {
        warning: Boolean,
    },
    data() {
        return {
            searchText: '',
            emits: ["searchText"],
        }
    }
};
</script>

<template>
    <div class="search-section" :class="{ 'search-shadow': !warning && searchText.length }">
        <div class="search-bar">
            <label for="search"><font-awesome-icon icon="magnifying-glass" /></label>
            <input @keyup="$emit('searchText', searchText)" v-model.trim="searchText" id="search" type="text"
                placeholder="Cerca o inizia una nuova chat">
            <span v-if="searchText.length" class="btn-remove"
                @click="searchText = '', $emit('searchText', '')"><font-awesome-icon icon="xmark" /></span>
        </div>
        <img class="img-icon-small" src="src/assets/img/filter.png" alt="filter" title="Filtro chat non lette">
    </div>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;

.search-section {
    @include flex;
    min-height: 50px;
}

.search-shadow {
    box-shadow: 0 2px 3px rgba(11, 20, 26, 0.08);
}

.search-bar {
    @include flex(normal);
    width: 100%;
    height: 35px;
    margin-left: 15px;
    background-color: $light-grey;
    color: $grey;
    border-radius: 10px;

    label {
        margin: 0 40px 0 15px;
    }

    .btn-remove {
        padding: 0 10px;
        cursor: pointer;
    }
}
</style>