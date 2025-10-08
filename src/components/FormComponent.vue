<script setup lang="ts">
</script>

<template>
  <div class="grid grid-cols-4 mt-20  place-items-center">
    <div class="">
      <input class="p-4 border-black border-2 rounded-xl" placeholder="Введите цену" type="number" id="price">
      <h1 class="mt-5">Цена</h1>
    </div>
    <div class="">
      <input class="p-4 border-black border-2 rounded-xl" placeholder="Введите кол-во" type="number" id="amount">
      <h1 class="mt-5">Кол-во</h1>
    </div>
    <div class="">
      <input class="p-4 border-black border-2 rounded-xl" placeholder="Введите сумму" type="number" id="sum">
      <h1 class="mt-5">Сумма</h1>
    </div>
    <div class="">
      <button class="bg-emerald-300 transition-all duration-200 hover:scale-105  p-4 w-60 rounded-xl">
        Отправить
      </button>
      <h1 class="mt-5">Состояние localStorage</h1>
    </div>

  </div>
</template>

<style scoped></style>