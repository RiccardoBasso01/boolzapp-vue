<script>
import ChatList from './components/Chat-list/ChatList.vue';
import ChatMessage from './components/Chat-message/ChatMessage.vue';
import AppLoader from './components/AppLoader.vue';

export default {
  components: { ChatList, ChatMessage, AppLoader },
}
</script>

<template>
  <div class="ba-container">
    <!-- Loader -->
    <!-- <AppLoader /> -->

    <!-- Section chat list -->
    <ChatList />

    <!-- Section chat message -->
    <ChatMessage />
  </div>
</template>

<style lang="scss">
@use './assets/scss/style.scss';
</style>
