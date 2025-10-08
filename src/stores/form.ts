import { defineStore } from 'pinia'
import { ref, computed, type Ref } from 'vue';
import type {EventLog, LastUpdated, FormData, BackendResponse} from "@/types";

export const useFormStore = defineStore('form', () => {
    const price: Ref<number> = ref(0)
    const qty: Ref<number> = ref(0)
    const amount: Ref<number> = ref(0)
    const counter: Ref<number> = ref(0)
    const events: Ref<EventLog[]> = ref([])

    const lastUpdated: Ref<LastUpdated> = ref({
        price: Date.now(),
        qty: Date.now(),
        amount: Date.now(),
    })


    const formData = computed((): FormData => ({
        price: price.value,
        qty: qty.value,
        amount: amount.value,
        counter: counter.value
    }));

    const localStorageData = computed(() => {
        const stored = localStorage.getItem('formData')
        return stored ? JSON.parse(stored) : null
    })

    const updatePrice = (newValue: number) => {
        price.value = Number(newValue)
        lastUpdated.value.price = Date.now()
        recalculateFields('price');
        addEvent('input_change', `Price updated to ${newValue}`);
    }

    const updateQty = (newValue: number) => {
        qty.value = Number(newValue)
        lastUpdated.value.qty = Date.now()
        recalculateFields('qty');
        addEvent('input_change', `Quantity updated to ${newValue}`);
    }

    const updateAmount = (newValue: number) => {
        amount.value = Number(newValue)
        lastUpdated.value.amount = Date.now()
        recalculateFields('amount');
        addEvent('input_change', `Amount updated to ${newValue}`);
    }

    const getEarliestUpdatedField = (): keyof LastUpdated => {
        const times = lastUpdated.value;
        let earliestField: keyof LastUpdated = 'price';
        let earliestTime = times.price;

        if (times.qty < earliestTime) {
            earliestField = 'qty';
            earliestTime = times.qty;
        }
        if (times.amount < earliestTime) {
            earliestField = 'amount';
        }
        return earliestField;
    };

    const recalculateFields = (changedField: keyof LastUpdated) => {
        const fieldToRecalc = getEarliestUpdatedField()
        if (fieldToRecalc === changedField) return

        switch(fieldToRecalc) {
            case 'price':
                price.value = qty.value > 0 ? amount.value / qty.value : 0
                break;

            case 'qty':
                qty.value = price.value > 0 ? qty.value / price.value : 0
                break;

            case 'amount':
                amount.value = price.value * qty.value;
                break;
        }

        lastUpdated.value[fieldToRecalc] = Date.now()

    }

    const addEvent = (type: EventLog['type'], message: string, data?: unknown) => {
        const event: EventLog = {
            id: Math.random().toString(36).substring(2, 9),
            type,
            timestamp: Date.now(),
            message,
            data
        }
        events.value.unshift(event)
    }

    const saveToLocalStorage = async (): Promise<BackendResponse> => {

        counter.value += 1;
        const success = amount.value % 2 === 0;

        if (success) {
            const dataToSave: FormData = {
                price: price.value,
                qty: qty.value,
                amount: amount.value,
                counter: counter.value
            };
            localStorage.setItem('formData', JSON.stringify(dataToSave));
        }


        addEvent('button_click', 'Submit button clicked', {
            submittedData: {
                price: price.value,
                qty: qty.value,
                amount: amount.value,
                counter: counter.value
            },
            willBeSaved: success,
            currentLocalStorage: localStorageData.value
        });

        return new Promise((resolve) => {
            setTimeout(() => {
                const response: BackendResponse = { success };

                addEvent('backend_response', `Backend response: ${success ? 'SUCCESS - данные сохранены' : 'FAILED - данные не сохранены'}`, {
                    response,
                    currentLocalStorage: localStorageData.value
                });

                resolve(response);
            }, 1000);
        });
    };

    const clearEvents = (): void => {
        events.value = [];
    };

    return {
        // State
        price,
        qty,
        amount,
        counter,
        events,

        // Getters
        formData,
        localStorageData,

        // Actions
        updatePrice,
        updateQty,
        updateAmount,
        saveToLocalStorage,
        clearEvents,
        addEvent
    };



})