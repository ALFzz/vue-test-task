export interface FormData {
    price: number,
    qty: number,
    amount: number,
    counter: number
}

export interface LastUpdated {
    price: number,
    qty: number,
    amount: number,
}

export interface EventLog {
    id: string,
    type: 'input_change' | 'button_click' | 'backend_response',
    timestamp: number;
    message: string;
    data?: unknown;
}

export interface BackendResponse {
    success: boolean;
}