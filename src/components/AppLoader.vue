<script>
export default {
    data() {
        return {
            showLoader: true,
        }
    },
    created() {
        setTimeout(() => {
            this.showLoader = false
        }, 4000)
    }
}
</script>

<template>
    <section v-if="showLoader" id="loader">
        <div>
            <div class="logo">
                <img src="src/assets/svg/whatsapp.svg" alt="logo">
            </div>
            <div class="progress-bar"></div>
            <span>BoolzApp</span>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../assets/scss/vars' as *;

#loader {
    @include flex;
    @include font(400, 'm', $color: $dark-grey);
    position: absolute;
    inset: 0;
    background-color: $light-grey;
    z-index: 5;
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    >div {
        @include flex(center, center, column, $gap: 20px)
    }
}

img {
    width: 70px;
    filter: invert(99%) sepia(10%) saturate(534%) hue-rotate(176deg) brightness(99%) contrast(93%);
    display: block;
}

.logo {
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
}

.logo::before {
    content: '';
    @include square(90%);
    display: inline-block;
    position: absolute;
    inset: 5%;


    background-image: linear-gradient(90deg, #d5dbe0 0, #d5dbe0 33.33%, #929a9f 44.1%, #929a9f 55.8%, #d5dbe0 66.66%, #d5dbe0);
    background-size: 240% 240%;
    animation: upgradeAnimation 1.5s linear infinite;
}

@keyframes upgradeAnimation {
    0% {
        background-position: 100% 0%;
    }

    100% {
        background-position: 0% 0%;
    }
}

.progress-bar {
    width: calc(20% + 50vw);
    max-width: 350px;
    height: 3px;
    background-color: #d6dce0;
    border-radius: 5px;

    &::before {
        content: '';
        height: 100%;
        width: 0;
        background-color: #00c298;
        animation: progress 3s .5s linear forwards
    }
}

@keyframes progress {
    0% {
        width: 0%;
    }

    100% {
        width: 100%;
    }
}
</style>