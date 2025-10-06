// Photo Preview Logic
const photoInput = document.getElementById('photoInput'),
      previewImg = document.getElementById('previewImg'),
      photoForm = document.getElementById('photoForm');
const statusDiv = document.getElementById('status');
const textForm = document.getElementById('textForm');
const complaintText = document.getElementById('complaintText');
const charCount = document.getElementById('charCount');

// Live photo preview
if(photoInput){
  photoInput.addEventListener('change', function() {
    if(this.files && this.files[0]){
      const reader = new FileReader();
      reader.onload = function(e){
        previewImg.src = e.target.result;
        previewImg.style.display = 'block';
      }
      reader.readAsDataURL(this.files[0]);
    } else {
      previewImg.style.display = 'none';
    }
  });
}

// Handle photo form submit (simulated)
if(photoForm){
  photoForm.addEventListener('submit', function(event){
    event.preventDefault();
    statusDiv.textContent = "Photo complaint submitted! (Simulation for demo)";
    setTimeout(() => statusDiv.textContent = "", 2600);
    photoForm.reset();
    previewImg.style.display = 'none';
  });
}

// Live character count for textarea
complaintText.addEventListener('input', function(){
  charCount.textContent = this.value.length + "/1000";
});

// Handle text complaint submit (simulated)
textForm.addEventListener('submit', function(event){
  event.preventDefault();
  if(complaintText.value.trim().length === 0){
    statusDiv.textContent = "Please enter your complaint.";
    return;
  }
  statusDiv.textContent = "Text complaint submitted! (Simulation for demo)";
  setTimeout(() => statusDiv.textContent = "", 2600);
  textForm.reset();
  charCount.textContent = "0/1000";
});
