// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const icon = document.querySelector('#theme-toggle i');
  icon.className = document.body.classList.contains('light-mode') 
    ? 'fas fa-sun' 
    : 'fas fa-moon';
});

// Sample Data
const SAMPLE_DATA = {
  name: "कु. मानिका अभिमन्यू पाटील",
  dob: "2001-05-01",
  birthTime: "07:00",
  birthPlace: "अमरावती",
  height: "5 फूट 5 इंच",
  bloodGroup: "O+",
  education: "B.E. (Computer Science)",
  fatherName: "श्री. अभिमन्यू शरदराव पाटील",
  fatherOccupation: "धंधी",
  motherName: "श्री. करुणा अभिमन्यू पाटील",
  grandfather: "श्री. शरदराव शंकरदाव पाटील",
  mama: "श्री. अनिल पांडुरंग जाधव",
  mamaContact: "98XXXXXXX"
};

document.getElementById('use-sample').addEventListener('click', () => {
  Object.keys(SAMPLE_DATA).forEach(key => {
    const el = document.getElementById(key);
    if (el) el.value = SAMPLE_DATA[key];
  });
});

// Photo Preview
const photoInput = document.getElementById('profile-pic');
const previewImg = document.getElementById('preview-img');
const noPhoto = document.getElementById('no-photo');

photoInput.addEventListener('change', (e) => {
  if (e.target.files[0]) {
    const url = URL.createObjectURL(e.target.files[0]);
    previewImg.src = url;
    previewImg.style.display = 'block';
    noPhoto.style.display = 'none';
  }
});

document.getElementById('remove-photo').addEventListener('click', () => {
  photoInput.value = '';
  previewImg.style.display = 'none';
  noPhoto.style.display = 'block';
});

// Generate Biodata
document.getElementById('generate').addEventListener('click', () => {
  const data = {
    name: document.getElementById('name').value || SAMPLE_DATA.name,
    dob: document.getElementById('dob').value || SAMPLE_DATA.dob,
    birthTime: document.getElementById('birth-time').value || SAMPLE_DATA.birthTime,
    birthPlace: document.getElementById('birth-place').value || SAMPLE_DATA.birthPlace,
    height: document.getElementById('height').value || SAMPLE_DATA.height,
    bloodGroup: document.getElementById('blood-group').value || SAMPLE_DATA.bloodGroup,
    education: document.getElementById('education').value || SAMPLE_DATA.education,
    fatherName: document.getElementById('father-name').value || SAMPLE_DATA.fatherName,
    fatherOccupation: document.getElementById('father-occupation').value || SAMPLE_DATA.fatherOccupation,
    motherName: document.getElementById('mother-name').value || SAMPLE_DATA.motherName,
    grandfather: document.getElementById('grandfather').value || SAMPLE_DATA.grandfather,
    mama: document.getElementById('mama').value || SAMPLE_DATA.mama,
    mamaContact: document.getElementById('mama-contact').value || SAMPLE_DATA.mamaContact
  };

  const photoShape = document.getElementById('photo-shape').value;
  const hasPhoto = previewImg.style.display === 'block';

  const photoHTML = hasPhoto 
    ? `<img src="${previewImg.src}" class="profile-photo ${photoShape}" alt="Profile">`
    : '';

  const biodataHTML = `
    <div class="biodata-content">
      <h2>${data.name}</h2>
      ${photoHTML}
      <div class="columns">
        <div class="column">
          <p><strong>जन्म तारीख:</strong> ${formatDate(data.dob)}</p>
          <p><strong>जन्म वेळ:</strong> ${data.birthTime || 'सकाळी 07:00'}</p>
          <p><strong>जन्म ठिकाण:</strong> ${data.birthPlace}</p>
          <p><strong>उंची:</strong> ${data.height}</p>
          <p><strong>रक्त गट:</strong> ${data.bloodGroup}</p>
          <p><strong>शिक्षण:</strong> ${data.education}</p>
          <p><strong>संपर्क:</strong> ${data.fatherName}</p>
          <p><strong>मामा:</strong> ${data.mama}</p>
        </div>
        <div class="column">
          <p><strong>वडिलांचे नाव:</strong> ${data.fatherName}</p>
          <p><strong>वहिनीचा व्यवसाय:</strong> ${data.fatherOccupation}</p>
          <p><strong>आईचे नाव:</strong> ${data.motherName}</p>
          <p><strong>आजोबा:</strong> ${data.grandfather}</p>
          <p><strong>आजी:</strong> श्री. विजय शरदराव पाटील</p>
          <p><strong>मामा:</strong> ${data.mama}</p>
          <p><strong>मामी:</strong> ${data.mama}</p>
          <p><strong>मोबाईल क्रमांक:</strong> ${data.mamaContact}</p>
        </div>
      </div>
      <div style="margin-top: 30px; text-align: center; color: var(--accent);">
        <p>श्री गणेशाय नमः | जय श्री राम</p>
      </div>
    </div>
  `;

  document.querySelector('#biodata-preview .placeholder')?.remove();
  document.getElementById('biodata-preview').innerHTML = biodataHTML;
});

function formatDate(dateStr) {
  if (!dateStr) return '01-05-2001';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB'); // DD/MM/YYYY
}

// Export Functions
document.getElementById('download-pdf').addEventListener('click', async () => {
  const content = document.querySelector('.biodata-content');
  if (!content) return alert("Generate biodata first!");
  
  const canvas = await html2canvas(content, { 
    scale: 2,
    backgroundColor: '#1e1e1e'
  });
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 210;
  const pageHeight = 297;
  const imgHeight = canvas.height * imgWidth / canvas.width;
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
  pdf.save('marathi_biodata.pdf');
});

document.getElementById('download-image').addEventListener('click', () => {
  const content = document.querySelector('.biodata-content');
  if (!content) return alert("Generate biodata first!");
  
  html2canvas(content, { 
    scale: 2,
    backgroundColor: '#1e1e1e'
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'marathi_biodata.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});