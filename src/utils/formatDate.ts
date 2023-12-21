import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importe o local desejado
dayjs.locale('pt-br');

export function formatDate(timestamp: number){
  const date = dayjs(timestamp);

  const dateFormatted = date.format('DD/MM/YYYY');

  return dateFormatted
}