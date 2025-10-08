<script setup lang="ts">

import {useFormStore} from "@/stores/form.ts";
import { storeToRefs } from 'pinia';
import type {EventLog} from "@/types";

const store = useFormStore()
const {events} = storeToRefs(store)

const getEventTypeText = (type: EventLog['type']): string => {
  const types = {
    'input_change': 'Изменение поля',
    'button_click': 'Нажатие кнопки',
    'backend_response': 'Ответ сервера'
  }

  return types[type]
}

const formatTime = (timestamp: number): string => {
  return new Date(timestamp).toLocaleTimeString()
}

const clearEvents = (): void => {
  store.clearEvents()
}

</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold text-gray-900">Журнал событий</h3>
      <button @click="clearEvents" class="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition-colors duration-200">
        Очистить
      </button>
    </div>

    <div class="space-y-3 max-h-96 overflow-y-auto">
      <div
          v-for="event in events"
          :key="event.id"
          class="border-l-4 p-3 rounded-r-md border-green-500 bg-green-50"
      >
        <div class="flex justify-between items-start mb-1">
          <span class="font-medium text-sm capitalize">{{ getEventTypeText(event.type) }}</span>
          <span class="text-xs text-gray-500">{{ formatTime(event.timestamp) }}</span>
        </div>
        <div class="text-sm text-gray-700 mb-2">{{ event.message }}</div>
        <div v-if="event.data" class="bg-gray-100 rounded-md p-2 mt-2">
          <pre class="text-xs text-gray-600 overflow-x-auto">{{ JSON.stringify(event.data, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>