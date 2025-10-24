let currentPhotoURL = null;

document.getElementById('remove-photo').addEventListener('click', () => {
  document.getElementById('profile-pic').value = '';
  currentPhotoURL = null;
});

document.getElementById('generate').addEventListener('click', function () {
  const data = {
    name: document.getElementById('name').value || 'कु. मानिका अभिमन्यू पाटील',
    dob: document.getElementById('dob').value,
    birthTime: document.getElementById('birth-time').value,
    birthPlace: document.getElementById('birth-place').value || 'अमरावती',
    height: document.getElementById('height').value || '5 फूट 5 इंच',
    bloodGroup: document.getElementById('blood-group').value || 'O+',
    education: document.getElementById('education').value || 'B.E. (Computer Science)',
    fatherName: document.getElementById('father-name').value || 'श्री. अभिमन्यू शरदराव पाटील',
    fatherOccupation: document.getElementById('father-occupation').value || 'धंधी',
    motherName: document.getElementById('mother-name').value || 'श्री. करुणा अभिमन्यू पाटील',
    grandfather: document.getElementById('grandfather').value || 'श्री. शरदराव शंकरदाव पाटील',
    grandmother: document.getElementById('grandmother').value || 'श्री. विजय शरदराव पाटील',
    mama: document.getElementById('mama').value || 'श्री. अनिल पांडुरंग जाधव',
    mamaContact: document.getElementById('mama-contact').value || '98XXXXXXX'
  };

  const photoFile = document.getElementById('profile-pic').files[0];
  const photoShape = document.getElementById('photo-shape').value;

  // Handle photo
  if (photoFile) {
    currentPhotoURL = URL.createObjectURL(photoFile);
  }

  // Build HTML
  const photoHTML = currentPhotoURL 
    ? `<img src="${currentPhotoURL}" class="profile-photo ${photoShape}" alt="Profile">`
    : '';

  const html = `
    <div style="text-align: center; margin-bottom: 20px;">
      <h2>${data.name}</h2>
      ${photoHTML}
    </div>
    <div class="columns">
      <div class="column">
        <p><strong>जन्म तारीख:</strong> ${data.dob || '01-05-2001'}</p>
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
        <p><strong>आजी:</strong> ${data.grandmother}</p>
        <p><strong>मामा:</strong> ${data.mama}</p>
        <p><strong>मामी:</strong> ${data.mama}</p>
        <p><strong>मोबाईल क्रमांक:</strong> ${data.mamaContact}</p>
      </div>
    </div>
    <div style="margin-top: 30px; text-align: center; color: #FFD700;">
      <p>श्री गणेशाय नमः | जय श्री राम</p>
    </div>
  `;

  document.getElementById('biodata-preview').innerHTML = html;
  document.getElementById('form-section').style.display = 'none';
  document.getElementById('output-section').style.display = 'block';
});

// Download PDF
document.getElementById('download-pdf').addEventListener('click', async () => {
  const element = document.getElementById('biodata-preview');
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: '#1e1e1e'
  });
  const imgData = canvas.toDataURL('image/png');
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');
  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;
  pdf.addImage(imgData, 'PNG', 0, 0, width, height);
  pdf.save('marathi_biodata.pdf');
});

// Download Image
document.getElementById('download-image').addEventListener('click', () => {
  const element = document.getElementById('biodata-preview');
  html2canvas(element, {
    scale: 2,
    backgroundColor: '#1e1e1e'
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'marathi_biodata.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
});

// Back to Form
document.getElementById('back-to-form').addEventListener('click', () => {
  document.getElementById('output-section').style.display = 'none';
  document.getElementById('form-section').style.display = 'block';
});