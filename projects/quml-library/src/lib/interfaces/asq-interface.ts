import { SafeHtml } from "@angular/platform-browser";

export interface AsqOptions {
    label: string | SafeHtml;
    value: number;
}

export interface AsqValidation {
    required: string;
}

export interface AsqResponse {
    type: string;
    options: AsqOptions [];
    validation: AsqValidation;
}

export interface AsqInteractions {
    response1: AsqResponse;
}
