import { popFirstFromQueue } from "../repository/queue-repository";


export async function getNextIdInQueue(): Promise<string | null> {
    const result = await popFirstFromQueue(); // returns the original document before being updated

    const { ok, value } = result || {};
    const { queue } = value || {};

    if (ok === 1) { // is 1 if the update executed correctly
        return (queue || [])[0];
    }
    return null; // TODO log lastErrorObject if update failed
}
