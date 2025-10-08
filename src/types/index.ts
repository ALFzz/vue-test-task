export interface FormData {
    price: number,
    amount: number,
    sum: number,
    counter: number
}

export interface LastUpdated {
    price: number,
    amount: number,
    sum: number,
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