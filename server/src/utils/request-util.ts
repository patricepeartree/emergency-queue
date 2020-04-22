

let idCounter = 0;


export function getNextId(): number {
    idCounter++;
    return idCounter;
}
