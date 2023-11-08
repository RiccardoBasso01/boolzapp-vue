<script>
</script>

<template>
    <div class="intro">
        <div>
            <img src="src\assets\svg\intro.svg" alt="chat-intro">
            <h2>BoolzApp Web</h2>
            <p>Invia e ricevi messaggi senza mantenere il telefono connesso a Internet. <br>
                Usa BoolzApp su un massimo di 4 dispositivi collegati e 1 telefono contemporaneamente.
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/vars' as *;

.intro {
    @include flex;
    @include max-size;
    position: absolute;
    z-index: 1;
    background-color: $light-grey;
    text-align: center;

    >div {
        @include flex($direction: column);
    }
}

img {
    width: 360px;
}

h2 {
    margin: 40px 0 20px 0;
    font-weight: 300;
    color: $dark-grey;
}

p {
    line-height: 25px;
    color: $grey;
}
</style>