// TODO: Import tipe-tipe yang sudah didefinisikan di types.ts
import { Todo, AddTodoFn, CompleteTodoFn, DeleteTodoFn, ListTodosFn } from './types';

// TODO: Import fungsi storage untuk baca/tulis file
import { readTodos, writeTodos } from './storage';

// TODO: Buat fungsi untuk menambahkan To-Do baru
// - Generate id yang unik (bisa pakai timestamp atau counter)
// - Pastikan text tidak kosong
// - Set default status sebagai active
export const addTodo: AddTodoFn = (text: string) => {
  if (!text || text.trim() === '') {
    console.log('\nError: Text To-Do tidak boleh kosong!');
    return;
  }

  const todos = readTodos();
  const newTodo: Todo = {
    id: Date.now(), // Menggunakan timestamp waktu saat ini sebagai ID unik
    text: text.trim(),
    completed: false, // Default status: active (belum selesai)
  };

  todos.push(newTodo);
  writeTodos(todos);
  console.log(`\nSukses: To-Do "${newTodo.text}" berhasil ditambahkan!`);
};

// TODO: Buat fungsi untuk menandai To-Do sebagai selesai
// - Cari To-Do berdasarkan id
// - Ubah statusnya menjadi completed
// - Handle kasus jika id tidak ditemukan
export const completeTodo: CompleteTodoFn = (id: number) => {
  const todos = readTodos();
  // Cari posisi (index) To-Do di dalam array berdasarkan ID-nya
  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    console.log(`\nError: To-Do dengan ID ${id} tidak ditemukan.`);
    return;
  }

  // Ubah status completed menjadi true
  todos[todoIndex].completed = true;
  writeTodos(todos);
  console.log(`\nSukses: To-Do "${todos[todoIndex].text}" ditandai sebagai selesai!`);
};

// TODO: Buat fungsi untuk menghapus To-Do
// - Filter To-Do berdasarkan id
// - Handle kasus jika id tidak ditemukan
export const deleteTodo: DeleteTodoFn = (id: number) => {
  const todos = readTodos();
  // Filter: Simpan semua To-Do KECUALI yang ID-nya mau dihapus
  const filteredTodos = todos.filter((t) => t.id !== id);

  // Kalau jumlahnya masih sama, berarti ID yang dicari nggak ada
  if (todos.length === filteredTodos.length) {
    console.log(`\nError: To-Do dengan ID ${id} tidak ditemukan.`);
    return;
  }

  // Simpan data yang sudah difilter (tanpa To-Do yang dihapus)
  writeTodos(filteredTodos);
  console.log(`\nSukses: To-Do dengan ID ${id} berhasil dihapus!`);
};

// TODO: Buat fungsi untuk menampilkan semua To-Do
// - Tampilkan dengan format yang rapi
// - Tambahkan status [ACTIVE] atau [DONE] di depan setiap To-Do
// - Berikan nomor urut untuk memudahkan user memilih
export const listTodos: ListTodosFn = () => {
  const todos = readTodos();

  console.log('\n--- DAFTAR TO-DO ---');
  if (todos.length === 0) {
    console.log('Belum ada To-Do. Silakan tambahkan tugas baru!');
    return;
  }

  todos.forEach((todo, index) => {
    // Tentukan label berdasarkan status completed
    const statusLabel = todo.completed ? '[DONE]' : '[ACTIVE]';
    console.log(`${index + 1}. ${statusLabel} ${todo.text} (ID: ${todo.id})`);
  });
};

// TODO: Buat fungsi untuk mencari To-Do berdasarkan keyword
export const searchTodos = (keyword: string) => {
  const todos = readTodos();
  const lowerKeyword = keyword.toLowerCase(); // Biar pencariannya tidak peduli huruf besar/kecil
  
  const results = todos.filter((t) => t.text.toLowerCase().includes(lowerKeyword));

  console.log(`\n--- HASIL PENCARIAN UNTUK "${keyword}" ---`);
  if (results.length === 0) {
    console.log('Tidak ada To-Do yang cocok dengan kata kunci tersebut.');
    return;
  }

  results.forEach((todo, index) => {
    const statusLabel = todo.completed ? '[DONE]' : '[ACTIVE]';
    console.log(`${index + 1}. ${statusLabel} ${todo.text} (ID: ${todo.id})`);
  });
};