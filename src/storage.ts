import * as fs from 'fs';
import * as path from 'path';
import { Todo } from './types';
import { isValidTodo } from './utils';

// TODO: Definisikan path file untuk menyimpan data To-Do
// Kita buat folder 'data' di root project dan file 'todos.json' di dalamnya
const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'todos.json');

// TODO: Buat fungsi untuk membaca To-Do dari file
// Hint: Gunakan try-catch untuk handle error saat membaca file
export function readTodos(): Todo[] {
  try {
    initStorage(); // Pastikan file dan folder sudah ada sebelum dibaca
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    const parsedData = JSON.parse(data);
    
    // Kita panggil si 'satpam' dari utils.ts buat mastiin datanya valid
    if (Array.isArray(parsedData) && parsedData.every(isValidTodo)) {
      return parsedData;
    }
    return []; // Kalau datanya rusak/nggak sesuai, balikkan array kosong
  } catch (error) {
    console.error('Gagal membaca data To-Do:', error);
    return [];
  }
}

// TODO: Buat fungsi untuk menyimpan To-Do ke file
// Hint: Jangan lupa konversi ke JSON string sebelum disimpan
export function writeTodos(todos: Todo[]): void {
  try {
    initStorage(); // Pastikan folder ada sebelum kita menulis
    // JSON.stringify mengubah data TypeScript jadi teks (string)
    // Angka 2 di belakang itu biar format JSON-nya rapi (ada spasi/indentasi)
    const jsonString = JSON.stringify(todos, null, 2);
    fs.writeFileSync(FILE_PATH, jsonString, 'utf-8');
  } catch (error) {
    console.error('Gagal menyimpan data To-Do:', error);
  }
}

// TODO: Buat fungsi untuk inisialisasi storage (buat file kosong jika belum ada)
export function initStorage(): void {
  try {
    // Kalau folder 'data' belum ada, buat foldernya
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    // Kalau file 'todos.json' belum ada, buat file berisi array kosong []
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, JSON.stringify([]), 'utf-8');
    }
  } catch (error) {
    console.error('Gagal inisialisasi storage:', error);
  }
}