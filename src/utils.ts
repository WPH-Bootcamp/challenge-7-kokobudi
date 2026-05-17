import { Todo } from './types';

// TODO: Implementasikan type guards di sini

// Hint: Type guard berguna untuk memastikan tipe data saat runtime

// TODO: Buat fungsi untuk memvalidasi apakah suatu objek adalah To-Do yang valid
export function isValidTodo(obj: any): obj is Todo {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.text === 'string' &&
    typeof obj.completed === 'boolean'
  );
}

// TODO: Buat fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus
export function formatDateTime(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

// TODO: Buat fungsi untuk memastikan input dari user adalah string yang valid
export function isValidInputString(input: any): boolean {
  return typeof input === 'string' && input.trim().length > 0;
}