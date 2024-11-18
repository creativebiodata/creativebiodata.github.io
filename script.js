document.getElementById('generate').addEventListener('click', function () {
  const formData = {
    name: document.getElementById('name').value,
    dob: document.getElementById('dob').value,
    birthTime: document.getElementById('birth-time').value,
    birthPlace: document.getElementById('birth-place').value,
    height: document.getElementById('height').value,
    skinTone: document.getElementById('skin-tone').value,
    bloodGroup: document.getElementById('blood-group').value,
    fatherName: document.getElementById('father-name').value,
    fatherOccupation: document.getElementById('father-occupation').value,
    motherName: document.getElementById('mother-name').value,
    motherOccupation: document.getElementById('mother-occupation').value,
    siblings: document.getElementById('siblings').value,
    relatives: document.getElementById('relatives').value,
    address: document.getElementById('address').value,
    contactNumber: document.getElementById('contact-number').value,
    profilePic: document.getElementById('profile-pic').files[0]
  };

  const preview = document.getElementById('biodata-preview');
  const outputSection = document.getElementById('output-section');

  // Build Biodata HTML
  let biodataHTML = `
    <h2>${formData.name || ''}</h2>
    ${formData.profilePic ? `<img src="${URL.createObjectURL(formData.profilePic)}" alt="Profile Picture">` : ''}
    ${formData.dob ? `<p><strong>Date of Birth:</strong> ${formData.dob}</p>` : ''}
    ${formData.birthTime ? `<p><strong>Time of Birth:</strong> ${formData.birthTime}</p>` : ''}
    ${formData.birthPlace ? `<p><strong>Place of Birth:</strong> ${formData.birthPlace}</p>` : ''}
    ${formData.height ? `<p><strong>Height:</strong> ${formData.height}</p>` : ''}
    ${formData.skinTone ? `<p><strong>Skin Tone:</strong> ${formData.skinTone}</p>` : ''}
    ${formData.bloodGroup ? `<p><strong>Blood Group:</strong> ${formData.bloodGroup}</p>` : ''}
    <h3>Family Details</h3>
    ${formData.fatherName ? `<p><strong>Father's Name:</strong> ${formData.fatherName} (${formData.fatherOccupation || ''})</p>` : ''}
    ${formData.motherName ? `<p><strong>Mother's Name:</strong> ${formData.motherName} (${formData.motherOccupation || ''})</p>` : ''}
    ${formData.siblings ? `<p><strong>Siblings:</strong> ${formData.siblings}</p>` : ''}
    ${formData.relatives ? `<p><strong>Relatives:</strong> ${formData.relatives}</p>` : ''}
    ${formData.address ? `<p><strong>Permanent Address:</strong> ${formData.address}</p>` : ''}
    ${formData.contactNumber ? `<p><strong>Contact Number:</strong> ${formData.contactNumber}</p>` : ''}
  `;

  preview.innerHTML = biodataHTML;
  outputSection.style.display = 'block';
});

// Download PDF as A4-sized document
document.getElementById('download-pdf').addEventListener('click', async function () {
  const preview = document.getElementById('biodata-preview');
  const jsPDF = window.jspdf.jsPDF;

  // Use html2canvas to capture the preview as an image
  const canvas = await html2canvas(preview, { scale: 2 }); // Higher scale for better quality
  const imgData = canvas.toDataURL('image/png');

  // Create a new jsPDF instance
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // Calculate dimensions to fit the content to A4 size
  const pdfWidth = 210; // A4 width in mm
  const pdfHeight = 297; // A4 height in mm
  const imgWidth = pdf.internal.pageSize.getWidth();
  const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

  // Add the image to the PDF
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);

  // Save the PDF
  pdf.save('biodata.pdf');
});

// Download as Image
document.getElementById('download-image').addEventListener('click', function () {
  const preview = document.getElementById('biodata-preview');

  // Use html2canvas to capture the preview as an image
  html2canvas(preview, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');

    // Create a temporary download link and simulate click
    const a = document.createElement('a');
    a.href = imgData;
    a.download = 'biodata.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
});
