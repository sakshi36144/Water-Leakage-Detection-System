document.addEventListener("DOMContentLoaded", () => {
    fetchSensorStatus();
    fetchAlerts();
    document.getElementById('see-status').onclick = () => {
        document.getElementById('monitoring').scrollIntoView({behavior: "smooth"});
    };
});

// Replace with your actual backend API endpoints
const BACKEND_BASE_URL = "https://your-backend.api";

function fetchSensorStatus() {
    // Demo: Use static data, replace this part with your API call
    // fetch(`${BACKEND_BASE_URL}/status`)
    //   .then(res => res.json())
    //   .then(data => { ... });
    setTimeout(() => {
        document.getElementById('zone1-status').textContent = "OK";
        document.getElementById('zone2-status').textContent = "Leak Detected!";
        document.getElementById('zone3-status').textContent = "OK";
        document.getElementById('zone2-status').style.color = "#ff4d4d";
    }, 800);
}

function fetchAlerts() {
    // Demo: Use static data, replace with API call
    // fetch(`${BACKEND_BASE_URL}/alerts`)
    //   .then(res => res.json())
    //   .then(alerts => { ... });
    setTimeout(() => {
        const alerts = [
            {time: "2025-09-18 14:12", msg: "Leak detected in Zone 2"},
            {time: "2025-09-17 18:45", msg: "No issues (Auto-check)"},
        ];
        const alertList = document.getElementById('alertList');
        alertList.innerHTML = "";
        alerts.forEach(a => {
            const li = document.createElement('li');
            li.textContent = `${a.time} — ${a.msg}`;
            alertList.appendChild(li);
        });
    }, 800);
}