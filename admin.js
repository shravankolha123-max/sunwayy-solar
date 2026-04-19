/* Use backend on :5000 for Live Server/local; same-origin for Render/production */
const API_BASE =
  typeof location !== "undefined" &&
  (location.hostname === "127.0.0.1" || location.hostname === "localhost") &&
  location.port === "5500"
    ? "https://sunwayy-solar.onrender.com"
    : typeof location !== "undefined" &&
        (location.protocol === "http:" || location.protocol === "https:") &&
        location.hostname
      ? ""
      : "https://sunwayy-solar.onrender.com";

function fmtDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return String(iso);
  }
}

function setError(el, msg) {
  el.textContent = msg || "";
  el.hidden = !msg;
}

async function loadRecords() {
  const errEl = document.getElementById("errorMsg");
  const secretInput = document.getElementById("adminSecret");
  setError(errEl, "");

  const headers = { Accept: "application/json" };
  const secret = secretInput.value.trim();
  if (secret) headers["X-Admin-Secret"] = secret;

  let res;
  try {
    res = await fetch(`${API_BASE}/api/records`, { headers });
  } catch {
    setError(
      errEl,
      "Could not reach the API. Start the backend (npm start in /backend) and try again."
    );
    return;
  }

  const data = await res.json().catch(() => ({}));

  if (res.status === 401) {
    setError(
      errEl,
      "Unauthorized. If ADMIN_SECRET is set in backend/.env, enter it above and click Refresh."
    );
    return;
  }

  if (!res.ok || !data.ok) {
    let msg = data.error;
    if (!msg && !res.ok) msg = `HTTP ${res.status}`;
    if (!msg) msg = "Failed to load records.";
    if (res.status === 404) {
      msg +=
        " Start the backend, then open admin at https://sunwayy-solar.onrender.com/admin.html (do not open the file from disk).";
    }
    setError(errEl, msg);
    return;
  }

  document.getElementById("dbStatus").textContent =
    data.database === "connected" ? "MongoDB: connected" : "MongoDB: disconnected";
  document.getElementById("dbStatus").className =
    "pill " + (data.database === "connected" ? "ok" : "bad");

  document.getElementById("countBookings").textContent =
    "Bookings: " + (data.counts?.bookings ?? 0);
  document.getElementById("countMessages").textContent =
    "Messages: " + (data.counts?.contactMessages ?? 0);
  document.getElementById("countConsult").textContent =
    "Consultations: " + (data.counts?.consultations ?? 0);

  renderTable(
    "tbodyBookings",
    data.bookings || [],
    8,
    (row) => [
      fmtDate(row.createdAt),
      row.name,
      row.mobile,
      row.city,
      row.bill,
      row.scheme,
      row.size,
      row._id,
    ]
  );

  renderTable(
    "tbodyMessages",
    data.contactMessages || [],
    3,
    (row) => [fmtDate(row.createdAt), row.message, row._id]
  );

  renderTable(
    "tbodyConsult",
    data.consultations || [],
    5,
    (row) => [fmtDate(row.createdAt), row.name, row.mobile, row.city, row._id]
  );
}

function renderTable(tbodyId, rows, colspan, mapRow) {
  const tbody = document.getElementById(tbodyId);
  tbody.innerHTML = "";
  if (!rows.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="${colspan}" class="empty">No records yet.</td>`;
    tbody.appendChild(tr);
    return;
  }
  for (const row of rows) {
    const tr = document.createElement("tr");
    const cells = mapRow(row);
    tr.innerHTML = cells
      .map((c, i) => {
        const isId = i === cells.length - 1;
        const cls = isId ? " mono" : "";
        return `<td class="${cls}">${escapeHtml(String(c ?? ""))}</td>`;
      })
      .join("");
    tbody.appendChild(tr);
  }
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

document.getElementById("refreshBtn").addEventListener("click", loadRecords);
window.addEventListener("DOMContentLoaded", loadRecords);
