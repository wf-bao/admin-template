<template>
    <svg :class="svgName" aria-hidden="true">
        <use :xlink:href="iconClass"></use>
    </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    iconName: {
        type: String,
        default: 'chat'
    },
    svgClass: {
        type: String,
        default: 'small'
    }
})
const iconClass = computed(() => {
    return '#icon-' + props.iconName
})
const svgName = computed(() => {
    return props.svgClass
})

</script>

<style lang="scss" scoped>
.small {
    width: 20px;
    height: 20px;
}

.lager {
    width: 30px;
    height: 30px;
}
</style>