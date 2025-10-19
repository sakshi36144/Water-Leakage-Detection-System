// Demo zone data
const sampleZones = {
  "TechnoFactory Maintenance": [
    {id:1, name:"Zone A - Production", status:"leak", details:"Leak detected near water valve area."},
    {id:2, name:"Zone B - Packaging", status:"fixed", details:"Leak fixed last week."},
    {id:3, name:"Zone C - Storage", status:"normal", details:"No leakage detected."}
  ],
  "GlobalCorp HQ": [
    {id:1, name:"Floor 1 - Washrooms", status:"normal", details:"Routine checked."},
    {id:2, name:"Floor 2 - Pantry", status:"leak", details:"Leak under sink - urgent fix needed."},
    {id:3, name:"Floor 3 - Data Center", status:"fixed", details:"Previous leak now fixed."}
  ],
  "CareHealth Hospital": [
    {id:1, name:"Ward 12", status:"leak", details:"Pipe burst behind wall."},
    {id:2, name:"ICU", status:"normal", details:"All safe."},
    {id:3, name:"Basement Water Plant", status:"fixed", details:"Pump leak fixed 2 days ago."}
  ]
};

function showZonesPanel(teamName) {
  document.getElementById("teamsSection").style.display = "none";
  document.getElementById("zonesSection").style.display = "";
  document.getElementById("zonesTitle").innerText = teamName + " - Leakage Detection Zones";
  renderZonesGrid(teamName);
}
function closeZonesPanel() {
  document.getElementById("teamsSection").style.display = "";
  document.getElementById("zonesSection").style.display = "none";
  document.getElementById("zonesGrid").innerHTML = "";
  document.getElementById("status").innerText = "";
}

function renderZonesGrid(teamName) {
  const zones = sampleZones[teamName];
  const grid = document.getElementById("zonesGrid");
  grid.innerHTML = "";
  zones.forEach((zone, i) => {
    const card = document.createElement("div");
    card.className = "zone-card";
    card.innerHTML = `
      <div class="zone-title">${zone.name}</div>
      <div class="zone-status${zone.status === "leak" ? " leak" : (zone.status === "fixed" ? " fixed" : "")}">
        ${zone.status === "leak" ? "LEAK!" : zone.status === "fixed" ? "FIXED" : "Normal"}
      </div>
      <div style="margin-bottom:9px;">
        <button class="zone-btn info" onclick="showModal('${zone.details}')">Zone Details</button>
        ${zone.status === "leak" 
          ? `<button class="zone-btn resolve" onclick="resolveLeak('${teamName}',${zone.id})">Mark as Fixed</button>`
          : zone.status === "fixed"
            ? `<button class="zone-btn leak" onclick="reportLeak('${teamName}',${zone.id})">Report New Leak</button>`
            : `<button class="zone-btn leak" onclick="reportLeak('${teamName}',${zone.id})">Report Leak</button>`
        }
      </div>
    `;
    grid.appendChild(card);
  });
}

function showModal(msg) {
  document.getElementById("modalContent").innerText = msg;
  document.getElementById("modalBg").style.display = "";
}
function closeModal() {
  document.getElementById("modalBg").style.display = "none";
}

// Simulate updating zones for "Resolved"/"Leak" actions
function resolveLeak(teamName, zoneId) {
  let zones = sampleZones[teamName];
  const zone = zones.find(z => z.id === zoneId);
  if(zone) {
    zone.status = "fixed";
    zone.details = `Leak resolved on ${new Date().toLocaleDateString()}.`;
    renderZonesGrid(teamName);
    document.getElementById("status").innerText = "Zone marked as FIXED!";
    setTimeout(()=>{document.getElementById("status").innerText = "";}, 1550);
  }
}
function reportLeak(teamName, zoneId) {
  let zones = sampleZones[teamName];
  const zone = zones.find(z => z.id === zoneId);
  if(zone) {
    zone.status = "leak";
    zone.details = `Leak manually reported on ${new Date().toLocaleDateString()}. Please investigate.`;
    renderZonesGrid(teamName);
    document.getElementById("status").innerText = "Leak reported!";
    setTimeout(()=>{document.getElementById("status").innerText = "";}, 1550);
  }
}

// Nav bar buttons interactions (simulate routing)
document.getElementById("navTeams").onclick = e => {
  e.preventDefault();
  document.getElementById("teamsSection").style.display = "";
  document.getElementById("zonesSection").style.display = "none";
};
document.getElementById("navCreate").onclick = e => {
  e.preventDefault();
  showModal("Feature to create a new team coming soon! (Demo only)");
}
document.getElementById("navJoin").onclick = e => {
  e.preventDefault();
  showModal("Feature to join a team coming soon! (Demo only)");
}
document.querySelector(".logout-btn").onclick = () => {
  showModal("You have been logged out! (Demo only)");
};
