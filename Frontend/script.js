const API = "https://smart-backend-r7bm.onrender.com/api";

// ================= 🌙 DARK MODE =================
function toggleMode() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
}

// ================= 🔔 TOAST =================
function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.innerText = msg;
  toast.style.opacity = 1;

  setTimeout(() => {
    toast.style.opacity = 0;
  }, 2000);
}

// ================= 👁️ PASSWORD =================
function togglePassword() {
  const pass = document.getElementById("password");
  if (pass) {
    pass.type = pass.type === "password" ? "text" : "password";
  }
}

// ================= AUTH =================
function signup() {
  fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value
    })
  })
  .then(res => res.text())
  .then(msg => {
    showToast(msg);
    setTimeout(() => window.location = "index.html", 1000);
  })
  .catch(() => showToast("Signup failed ❌"));
}

// function login() {
//   showToast("Logging in...");

//   fetch(`${API}/auth/login`, {
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify({
//       email: email.value,
//       password: password.value
//     })
//   })
//   .then(res => res.json())
//   .then(data => {
//     if (data.token) {
//       localStorage.setItem("token", data.token);
//       showToast("Login Success ✅");

//       setTimeout(() => {
//         window.location = "dashboard.html";
//       }, 1000);
//     } else {
//       showToast("Invalid credentials ❌");
//     }
//   })
//   .catch(() => showToast("Server error ❌"));
// }
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("https://smart-backend-r7bm.onrender.com/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    console.log("LOGIN RESPONSE:", data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful ✅");
      window.location = "dashboard.html";
    } else {
      alert("Invalid credentials ❌");
    }
  })
  .catch(err => console.log(err));
}

function logout() {
  localStorage.removeItem("token");
  window.location = "index.html";
}

// ================= NOTES =================
// function uploadNote() {
//   if (!file.files[0]) {
//     showToast("Select a file ❌");
//     return;
//   }

//   if (!file.files[0].name.endsWith(".pdf")) {
//     showToast("Only PDF allowed ❌");
//     return;
//   }

//   if (!title.value) {
//     showToast("Enter title ❌");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("title", title.value);
//   formData.append("file", file.files[0]);

//   fetch(`${API}/notes/upload`, {
//     method: "POST",
//     headers: {
//       "Authorization": "Bearer " + localStorage.getItem("token")
//     },
//     body: formData
//   })
//   .then(res => res.text())
//   .then(msg => showToast(msg))
//   .catch(() => showToast("Upload failed ❌"));
// }

// function getNotes() {
//   fetch(`${API}/notes`, {
//     headers: {
//       "Authorization": "Bearer " + localStorage.getItem("token")
//     }
//   })
//   .then(res => res.json())
//   .then(data => {
//     const list = document.getElementById("notesList");
//     if (!list) return;

//     list.innerHTML = "";

//     if (data.length === 0) {
//       list.innerHTML = "😢 No notes available";
//       return;
//     }

//     data.forEach(n => {
//       list.innerHTML += `
//         <div class="note">
          
//           <div class="note-left">
//             <h3>${n.title || "Untitled 📄"}</h3>
//             <p>👤 ${n.name || "Unknown User"}</p>
//           </div>

//           <div class="note-buttons">
//             <button onclick="previewPDF('${n.file_path}')">👁️ View</button>
//             <button onclick="deleteNote(${n.id})">🗑️ Delete</button>
//           </div>

//         </div>
//       `;
//     });
//   })
//   .catch(() => showToast("Failed to load notes ❌"));
// }
function uploadNote() {
  
  const fileInput = document.getElementById("file");
  const title = document.getElementById("title").value;

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);
  formData.append("title", title);

  const token = localStorage.getItem("token");

  fetch("https://smart-backend-r7bm.onrender.com/api/notes/upload", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
    body: formData
  })
  .then(res => res.text())
  .then(data => alert(data))
  .catch(err => console.log(err));
}

// 🔥 PDF PREVIEW
// function previewPDF(file) {
//   window.open(`https://smart-backend-r7bm.onrender.com/uploads/${file}`, "_blank");
// }
function previewPDF(file) {
  const viewer = document.getElementById("pdfViewer");
  viewer.src = file;
  viewer.style.display = "block";
}

// 🔥 DELETE NOTE
// function deleteNote(id) {
//   if (!confirm("Delete this note? ❗")) return;

//   fetch(`${API}/notes/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Authorization": "Bearer " + localStorage.getItem("token")
//     }
//   })
//   .then(res => res.text())
//   .then(msg => {
//     showToast(msg);
//     getNotes();
//   })
//   .catch(() => showToast("Delete failed ❌"));
// }
function deleteNote(id) {
  const token = localStorage.getItem("token");

  fetch(`https://smart-backend-r7bm.onrender.com/api/notes/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + token
    }
  })
  .then(res => res.text())
  .then(data => alert(data));
}

function loadNotes() {
  const token = localStorage.getItem("token");

  fetch("https://smart-backend-r7bm.onrender.com/api/notes", {
    headers: {
      "Authorization": "Bearer " + token
    }
  })
  .then(res => res.json())
  .then(data => {
    console.log(data); // 🔥 DEBUG

    const container = document.getElementById("notesList");
    container.innerHTML = "";

    data.forEach(note => {
      const div = document.createElement("div");
      div.className = "note-item";

      div.innerHTML = `
        <p>${note.title}</p>
        <a href="${note.file}" target="_blank">View</a>
        <button onclick="deleteNote(${note.id})">Delete</button>
      `;

      container.appendChild(div);
    });
  })
  .catch(err => console.log(err));
}

// ================= DOUBTS =================
function postDoubt() {
  if (!question.value.trim()) {
    showToast("Enter a doubt ❌");
    return;
  }

  fetch(`${API}/doubts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({
      question: question.value
    })
  })
  .then(res => res.text())
  .then(msg => {
    showToast(msg);
    question.value = "";
    getDoubts();
  })
  .catch(() => showToast("Failed ❌"));
}

function getDoubts() {
  fetch(`${API}/doubts`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  })
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("doubtList");
    if (!list) return;

    list.innerHTML = "";

    if (data.length === 0) {
      list.innerHTML = "😢 No doubts yet";
      return;
    }

    data.forEach(d => {
      list.innerHTML += `
        <div class="doubt">
          <div>
            <p><b>👤 ${d.name}</b></p>
            <p>${d.question}</p>
          </div>

          <button onclick="deleteDoubt(${d.id})">🗑️ Delete</button>
        </div>
      `;
    });
  })
  .catch(() => showToast("Failed to load doubts ❌"));
}
function deleteDoubt(id) {
  if (!confirm("Delete this doubt? ❗")) return;

  fetch(`${API}/doubts/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  })
  .then(res => res.text())
  .then(msg => {
    showToast(msg);
    getDoubts();
  })
  .catch(() => showToast("Delete failed ❌"));
}

// ================= 🌌 PAGE LOAD + STARS =================
window.addEventListener("load", () => {

  if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark");
  }

  if (document.getElementById("notesList")) {
    getNotes();
  }

  if (document.getElementById("doubtList")) {
    getDoubts();
  }

  // ⭐ PREMIUM STARS
  const canvas = document.getElementById("bgCanvas");

  if (canvas) {
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let particles = [];
    let mouse = { x: null, y: null };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5),
        speedY: (Math.random() - 0.5)
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.shadowBlur = 15;
        ctx.shadowColor = "white";

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        // mouse connect
        if (mouse.x && mouse.y) {
          let dx = p.x - mouse.x;
          let dy = p.y - mouse.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = "rgba(255,255,255,0.5)";
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      });

      // particle connect
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            ctx.strokeStyle = "rgba(255,255,255,0.25)";
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }
});

// ================= SETTINGS =================
function toggleSettings() {
  const menu = document.getElementById("settingsMenu");

  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
}


// ================= SETTINGS =================

// 🔥 CHANGE PASSWORD
function changePassword() {
  const newPassword = document.getElementById("newPassword").value;

  if (!newPassword) {
    showToast("Enter new password ❌");
    return;
  }

  fetch(`${API}/auth/update-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({
      newPassword: newPassword
    })
  })
  .then(res => res.text())
  .then(msg => {
    showToast(msg);
    document.getElementById("newPassword").value = "";
  })
  .catch(() => showToast("Error ❌"));
}


// 🔥 CHANGE EMAIL
function changeEmail() {
  const newEmail = document.getElementById("newEmail").value;

  if (!newEmail) {
    showToast("Enter new email ❌");
    return;
  }

  fetch(`${API}/auth/update-email`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({
      newEmail: newEmail
    })
  })
  .then(res => res.text())
  .then(msg => {
    showToast(msg);
    document.getElementById("newEmail").value = "";
  })
  .catch(() => showToast("Error ❌"));
}

// ⭐ CONNECTING STARS
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: Math.random() * 1,
    dy: Math.random() * 1
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    p.x += p.dx;
    p.y += p.dy;

    if (p.x > canvas.width || p.x < 0) p.dx *= -1;
    if (p.y > canvas.height || p.y < 0) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      let p2 = particles[j];
      let dist = Math.hypot(p.x - p2.x, p.y - p2.y);

      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();