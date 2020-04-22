
export enum RequestErrors {
    NOT_A_VALID_ID = "NOT_A_VALID_ID",
}

let idCounter = 0;


export function getNextId(): number {
    idCounter++;
    return idCounter;
}
