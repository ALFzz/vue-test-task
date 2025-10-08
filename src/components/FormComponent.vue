<script setup lang="ts">
import {ref, computed} from  'vue'
import {useFormStore} from "@/stores/form.ts";
import {debounce} from "@/utils/debounce.ts";
import { storeToRefs } from 'pinia';

const store = useFormStore()
const {price, qty, amount, localStorageData} = storeToRefs(store)
const isLoading = ref(false);

const localStorageText = computed(() => {
  return localStorageData.value
      ? JSON.stringify(localStorageData.value)
      : 'Нет данных';
});

const handlePriceChange = debounce((event: Event) => {
  const target = event.target as HTMLInputElement;
  store.updatePrice(target.value);
}, 300)

const handleQtyChange = debounce((event: Event) => {
  const target = event.target as HTMLInputElement;
  store.updateQty(target.value);
}, 300)

const handleAmountChange = debounce((event: Event) => {
  const target = event.target as HTMLInputElement;
  store.updateAmount(target.value);
}, 300)

const handleSubmit = async (): Promise<void> => {
  isLoading.value = true;
  try {
    const result = await store.saveToLocalStorage();
    console.log('Backend response:', result);
  }
  catch (error) {
    console.log(error);
  }
  finally {
    isLoading.value = false;
  }
}

</script>

<template>
  <div class="grid grid-cols-4 mt-20  place-items-center">

    <div>
      <input
          :value="price"
          @input="handlePriceChange($event)"
          class="p-4 border-black border-2 rounded-xl"
          placeholder="Введите цену"
          type="number"
          id="price"
      >
      <h1 class="mt-5">Цена: {{price}}</h1>
    </div>

    <div>
      <input
          :value="qty"
          @input="handleQtyChange($event)"
          class="p-4 border-black border-2 rounded-xl"
          placeholder="Введите кол-во"
          type="number"
          id="qty">
      <h1 class="mt-5">Кол-во: {{qty}}</h1>
    </div>

    <div class="">
      <input
          :value="amount"
          @input="handleAmountChange($event)"
          class="p-4 border-black border-2 rounded-xl"
          placeholder="Введите сумму"
          type="number"
          id="amount">
      <h1 class="mt-5">Сумма: {{amount}}</h1>
    </div>

    <div class="">
      <button
          @click="handleSubmit"
          :disabled="isLoading"
          class="bg-emerald-300 transition-all duration-200 hover:scale-105  p-4 w-60 rounded-xl"
      >
        {{isLoading ? 'Отправка...' : 'Отправить' }}
      </button>
      <h1 class="mt-5">Состояние localStorage: {{localStorageText}}</h1>
    </div>

  </div>
</template>

<style scoped></style>