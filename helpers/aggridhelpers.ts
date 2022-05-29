import { ValueFormatterParams } from "ag-grid-community";

export function dateFormatter(params: ValueFormatterParams){
    return new Date(params.value).toLocaleDateString("en-US")
}