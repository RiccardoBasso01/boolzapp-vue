<script>
export default {
    data() {
        return {
            newMessage: '',
        }
    }
};
</script>

<template>
    <section class="input-message">
        <button class="img-icon bigger"><img src="src/assets/img/emoji.png" alt="emoji" title="Emojis"></button>
        <button class="img-icon bigger"><img src="src/assets/img/attach.png" alt="attach" title="Allega"></button>
        <div>
            <input v-model.trim="newMessage" type="text" placeholder="Scrivi un messaggio"
                @keyup.enter="$emit('newMessage', newMessage), newMessage = ''">
        </div>
        <button class="img-icon bigger"><img src="src/assets/img/microphone.png" alt="microphone"
                title="Messaggio vocale"></button>
    </section>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;

.input-message {
    padding: 0 15px;
    background-color: $light-grey;
}

div {
    flex-grow: 1;
}

input {
    @include font(300, 's');
    height: 100%;
    padding: 12px 10px;
    border-radius: 8px;
    background-color: white;
}
</style>