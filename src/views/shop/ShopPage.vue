<template>
    <div class="wrapper">
        <ShopInfo :item="item" :showBorder="false" />
    </div>
</template>

<script>
import { getImgUrl } from '../../utils/common';
import ShopInfo from '@/components/ShopInfo.vue';

export default {
    name: 'ShopDetail',
    components: { ShopInfo },
    setup () {
        const item = {
            id: '1',
            name: '京东',
            imageUrl: getImgUrl('near.png'),
            tags: [
                { name: '售100万+' },
                { name: '基础运费¥5' },
                { name: '月售493万+' }
            ],
            slogan: 'VIP尊享满89减4元运费券'
        }

        return { item };
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding: 0 .18rem;
}
</style>
