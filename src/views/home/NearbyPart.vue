<template>
    <div class="nearby">
      <h3 class="nearby__title">附近店铺</h3>
      <router-link :to="`/shop/${item.id}`" v-for="item in nearbyList" :key="item.id">
        <ShopInfo :item="item" :showBorder="true" />
      </router-link>
    </div>
</template>

<script>
import { ref } from 'vue';
import { getImgUrl } from '../../utils/common';
import { get } from '../../utils/request';
import ShopInfo from '@/components/ShopInfo.vue';

const useNearbyListEffect = () => {
    const nearbyList = ref([]);
    const getNearbyList = async () => {
      const result = await get('/api/shop/hot-list');
      if (result?.errorno === 0 && result?.data?.length > 0) {
        for (const item of result.data) {
          item.imageUrl = getImgUrl(item.imageUrl)
        }
        nearbyList.value = result.data;
      }
    }

    return { nearbyList, getNearbyList };
}

export default {
  name: 'NearbyPart',
  components: { ShopInfo },
  setup () {
    const { nearbyList, getNearbyList } = useNearbyListEffect();
    getNearbyList();
    return {
      nearbyList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';

.nearby {
  &__title {
    margin: .16rem 0 .02rem 0;
    font-size: .18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
  a {
    text-decoration: none;
  }
}
</style>
