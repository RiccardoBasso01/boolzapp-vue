<script>
export default {
    props: {
        message: String,
        button: String,
        modal: String
    }
}
</script>


<template>
    <!-- Modal -->
    <div class="modal" :id="modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" id="mod-con">
                <!-- Modal message -->
                <div>{{ message }}</div>

                <!-- Modal buttons -->
                <div class="modal-actions">
                    <button type="button" class="ba-button light" id="btn" data-bs-dismiss="modal">
                        Annulla
                    </button>
                    <button type="button" class="ba-button" data-bs-dismiss="modal" @click="$emit('sendingModal')">
                        {{ button }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/vars' as *;

.modal {
    background-color: transparent;
    transition: background-color .1s ease-in;
}

.modal.show {
    background-color: rgba($color: white, $alpha: .85);
}

.modal-content {
    padding: 22px 24px;
    border: none;
    border-radius: 3px;
    box-shadow: 0 17px 50px 0 rgba(black, .19), 0 12px 15px 0 rgba(black, .24);

    scale: 0.5;
    transition: scale .2s ease-out;
}

.show .modal-content {
    scale: 1;
}

.modal-actions {
    @include flex(end, $gap: 15px);
    padding-top: 50px;
}
</style>