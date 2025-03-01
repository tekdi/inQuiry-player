import { SafeHtml } from "@angular/platform-browser";

export interface MtfOption {
    label: string | SafeHtml;
    value: number;
}

export interface MtfOptions {
    left: MtfOption[];
    right: MtfOption[];
}

export interface MtfValidation {
    required: string;
}

export interface MtfResponse {
    type: string;
    options: MtfOptions;
    validation: MtfValidation;
}

export interface MtfInteractions {
    response1: MtfResponse;
}
