const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


export function formatDate(date: Date): string {

    return "" +  ('0' + date.getDate()).slice(-2)  + "/" + (months[date.getMonth()]) + "/" + date.getFullYear();
}
