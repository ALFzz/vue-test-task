<script setup lang="ts">

</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold text-gray-900">Журнал событий</h3>
      <button  class="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition-colors duration-200">
        Очистить
      </button>
    </div>

    <div class="space-y-3 max-h-96 overflow-y-auto">
      <div
          class="border-l-4 p-3 rounded-r-md border-green-500 bg-green-50"
      >
        <div class="flex justify-between items-start mb-1">
          <span class="font-medium text-sm capitalize">Обработка клика</span>
          <span class="text-xs text-gray-500">{{ "12:00:00"}}</span>
        </div>
        <div class="text-sm text-gray-700 mb-2">значение </div>
        <div  class="bg-gray-100 rounded-md p-2 mt-2">
          <pre class="text-xs text-gray-600 overflow-x-auto">{"price":5.5,"qty":12,"amount":66,"counter":1}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>