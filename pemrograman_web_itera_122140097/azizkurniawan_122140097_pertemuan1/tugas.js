document.addEventListener("DOMContentLoaded", function () {
    // To-Do List
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
  
    function renderTodos() {
      todoList.innerHTML = "";
      todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.className = "flex items-center justify-between bg-gray-100 p-2 rounded";
        li.innerHTML = `
            <div class="flex items-center">
              <input type="checkbox" class="mr-2" ${todo.completed ? "checked" : ""} data-index="${index}">
              <span class="${todo.completed ? "line-through text-gray-500" : ""}">${todo.text}</span>
            </div>
            <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded" data-index="${index}">Hapus</button>
          `;
        todoList.appendChild(li);
      });
    }
  
    renderTodos();
  
    document.getElementById("add-todo").addEventListener("click", function () {
      const text = todoInput.value.trim();
      if (text !== "") {
        todos.push({ text, completed: false });
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
        todoInput.value = "";
      }
    });
  
    // Tandai item selesai
    todoList.addEventListener("change", function (e) {
      if (e.target.type === "checkbox") {
        const idx = e.target.getAttribute("data-index");
        todos[idx].completed = e.target.checked;
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
      }
    });
  
    // Hapus item
    todoList.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete-btn")) {
        const idx = e.target.getAttribute("data-index");
        todos.splice(idx, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
      }
    });
  
    // Kalkulator Modifikasi
    const calcButtons = document.querySelectorAll(".calc-btn");
    const calcResult = document.getElementById("calc-result");
  
    calcButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const op = btn.getAttribute("data-op");
        const opSymbol = btn.getAttribute("data-op-symbol");
        const bgClass = btn.getAttribute("data-bg");
  
        const num1 = parseFloat(document.getElementById("calc-num1").value);
        const num2 = parseFloat(document.getElementById("calc-num2").value);
        let result;
  
        if (isNaN(num1)) {
          calcResult.className = "mt-4 p-4 bg-red-500 text-white rounded";
          calcResult.textContent = "Masukkan angka yang valid untuk Angka 1!";
          return;
        }
  
        // Operasi Matematika
        if (op === "tambah") {
          result = num1 + num2;
        } else if (op === "kurang") {
          result = num1 - num2;
        } else if (op === "kali") {
          result = num1 * num2;
        } else if (op === "bagi") {
          if (isNaN(num2) || num2 === 0) result = "Error: Pembagian dengan nol";
          else result = num1 / num2;
        } else if (op === "pangkat") {
          if (isNaN(num2)) {
            result = "Error: Angka 2 tidak valid untuk pangkat!";
          } else {
            result = Math.pow(num1, num2);
          }
        } else if (op === "akar") {
          if (num1 < 0) result = "Error: Akar dari angka negatif";
          else result = Math.sqrt(num1);
        } else if (op === "modulus") {
          if (isNaN(num2) || num2 === 0) result = "Error: Modulus dengan nol";
          else result = num1 % num2;
        }
  
        let outputText = "";
        if (op === "akar") {
          outputText = `Hasil ${opSymbol}${num1} = ${result}`;
        } else {
          outputText = `Hasil ${num1} ${opSymbol} ${num2} = ${result}`;
        }

        calcResult.className = `mt-4 p-4 rounded text-white ${bgClass}`;
        calcResult.textContent = outputText;
      });
    });
  
    // Validasi Form Input
    const form = document.getElementById("validation-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const formSuccess = document.getElementById("form-success");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Reset pesan error dan success
      nameError.textContent = "";
      emailError.textContent = "";
      passwordError.textContent = "";
      formSuccess.textContent = "";
  
      let valid = true;
  
      // Validasi Nama: minimal lebih dari 3 karakter
      if (nameInput.value.trim().length <= 3) {
        nameError.textContent = "Nama harus lebih dari 3 karakter.";
        valid = false;
      }
  
      // Validasi Email menggunakan regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = "Email tidak valid.";
        valid = false;
      }
  
      // Validasi Password: minimal 8 karakter
      if (passwordInput.value.length < 8) {
        passwordError.textContent = "Password minimal 8 karakter.";
        valid = false;
      }
  
      if (valid) {
        formSuccess.textContent = "Form berhasil divalidasi!";
        form.reset();
      }
    });
  });
  