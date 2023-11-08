<script>
export default {
    props: {
        name: String,
        image: String
    },
};
</script>

<template>
    <header>
        <button class="profile-button">
            <img class="img-profile-small" :src="`src/assets/img/avatar${image}.jpg`" alt="my-profile-image">
            <div>{{ name }}</div>
        </button>
        <button class="img-icon"><img src="src/assets/img/users.png" alt="Users" title="Community"></button>
        <button class="img-icon"><img src="src/assets/img/status.png" alt="status" title="Stato"></button>
        <button class="img-icon"><img src="src/assets/img/New-chat.png" alt="new-chat" title="Nuova chat"></button>
        <button class="img-icon"><img src="src/assets/img/Menu.png" alt="menu" title="Menu"></button>
    </header>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;

.profile-button {
    @include flex(flex-start, center, $gap: 8px);
    flex-grow: 1;
    height: 40px;
}
</style>