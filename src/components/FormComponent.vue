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
  <div class="flex flex-col w-full lg:flex-row mt-20 px-4 ">
    <div class="flex flex-col sm:flex-row justify-center gap-10 w-full">
      <div class="w-full sm:w-auto">
        <input
            :value="price"
            @input="handlePriceChange($event)"
            class="w-full p-4 border-black border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Введите цену"
            type="number"
            id="price"
        >
        <h1 class="mt-5 text-lg font-medium break-words">Цена: {{price}}</h1>
      </div>

      <div class="w-full sm:w-auto">
        <input
            :value="qty"
            @input="handleQtyChange($event)"
            class="w-full p-4 border-black border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Введите кол-во"
            type="number"
            id="qty">
        <h1 class="mt-5 text-lg font-medium break-words">Кол-во: {{qty}}</h1>
      </div>

      <div class="w-full sm:w-auto">
        <input
            :value="amount"
            @input="handleAmountChange($event)"
            class="w-full p-4 border-black border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Введите сумму"
            type="number"
            id="amount">
        <h1 class="mt-5 text-lg font-medium break-words">Сумма: {{amount}}</h1>
      </div>

      <div class="w-full sm:w-auto flex flex-col items-start">
        <button
            @click="handleSubmit"
            :disabled="isLoading"
            class="bg-emerald-300 transition-all duration-200 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 p-4 w-full sm:w-60 rounded-xl font-medium disabled:cursor-not-allowed"
        >
          {{isLoading ? 'Отправка...' : 'Отправить' }}
        </button>
        <h1 class="mt-5 text-lg font-medium break-words whitespace-normal max-w-80">
          Состояние localStorage: <span class="break-all">{{localStorageText}}</span>
        </h1>
      </div>
    </div>

  </div>
</template>

<style scoped></style>