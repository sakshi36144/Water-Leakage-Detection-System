// Tab switch logic
const existingTabBtn = document.getElementById('existingTabBtn');
const createTabBtn = document.getElementById('createTabBtn');
const existingTab = document.getElementById('existingTab');
const createTab = document.getElementById('createTab');
const switchToCreate = document.getElementById('switchToCreate');
const switchToExisting = document.getElementById('switchToExisting');
const statusDiv = document.getElementById('status');

// Switch tabs
existingTabBtn.onclick = () => activateTab('existing');
createTabBtn.onclick = () => activateTab('create');
if(switchToCreate) switchToCreate.onclick = () => activateTab('create');
if(switchToExisting) switchToExisting.onclick = () => activateTab('existing');

function activateTab(tab) {
  // Remove .active from both
  existingTabBtn.classList.remove('active');
  createTabBtn.classList.remove('active');
  existingTab.style.display = 'none';
  createTab.style.display = 'none';

  if(tab === 'existing') {
    existingTabBtn.classList.add('active');
    existingTab.style.display = '';
  } else {
    createTabBtn.classList.add('active');
    createTab.style.display = '';
  }
  statusDiv.textContent = "";
}

// Simulated authentication & navigation
document.getElementById('existingForm').onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('industryEmail').value.trim();
  if(!isValidOfficialEmail(email)) {
    statusDiv.textContent = "Please enter a valid institutional/corporate email (not Gmail/Yahoo/etc).";
    return;
  }
  statusDiv.textContent = "Access granted! Redirecting to Team Tab...";
  setTimeout(()=>{
    // Simulate redirect to team complaints page
    window.location.href = "team-complaints.html";
  }, 1100);
}

document.getElementById('createForm').onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('leaderEmail').value.trim();
  if(!isValidOfficialEmail(email)) {
    statusDiv.textContent = "Please enter a valid institutional/corporate email.";
    return;
  }
  statusDiv.textContent = "Team created! Redirecting you (as leader) to Team Tab...";
  setTimeout(()=>{
    // Simulate redirect to team complaints page
    window.location.href = "team-complaints.html";
  }, 1200);
}

function isValidOfficialEmail(email) {
  // Only allow edu/org domains or well-known corp domains (not gmail/yahoo)
  return /^[a-zA-Z0-9._%+-]+@(?!(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com)$)[a-zA-Z0-9.-]+\.(com|org|edu|ac|in|info)$/i.test(email);
}