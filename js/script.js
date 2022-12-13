// Populate Data
let getData = JSON.parse(localStorage.getItem("MahasiswaData") || "[]");

let dataContainer = document.getElementById("dataContainer");

console.log(getData);
let generateData = getData
  .map(
    (item, i) => `
<tr>
<td scope="col">${i + 1}</td>
<td scope="col">${item.name}</td>
<td scope="col">${item.email}</td>
<td scope="col">${item.password}</td>
<td scope="col">${item.encryptedPassword}</td>
<td scope="col">
  <a
    class="btn btn-sm btn-danger btnDelete"
    role="button"
    data-id="${item.id}"
    ><span><i class="fa fa-trash me-2"></i>Remove</span></a
  >
</td>
</tr>
`
  )
  .join("");

dataContainer.innerHTML =
  getData.length === 0 ? "<h4 class='my-2'>No Data Saved</h4>" : generateData;

// Save Mahasiswa
let mahasiswaData = {
  id: 0,
  name: "",
  email: "",
  password: "",
  encryptedPassword: "",
};

let name = document.getElementById("inputName");
let email = document.getElementById("inputEmail");
let password = document.getElementById("inputPassword");

// Submit button name
const saveMahasiswa = () => {
  mahasiswaData.id = new Date().getTime();
  mahasiswaData.name = name.value;
  mahasiswaData.email = email.value;
  mahasiswaData.password = password.value;
  mahasiswaData.encryptedPassword = encrypt(7, 10, password.value);
  try {
    getData.push(mahasiswaData);
  } catch (err) {
    console.log(err);
  }
  localStorage.setItem("MahasiswaData", JSON.stringify(getData));
  alert("Mahasiswa data successfuly saved...");
};

// Delete Mahasiswa
const deleteMahasiswa = (id) => {
  let tempMahasiswasData = getData.filter((item) => item.id != id);
  console.log(tempMahasiswasData);
  localStorage.setItem("MahasiswaData", JSON.stringify(tempMahasiswasData));
  alert("Mahasiswa data successfuly deleted..");
  return location.reload();
};

// Delete mahasiswa handler
let btnDelete = document.querySelectorAll(".btnDelete");

btnDelete &&
  btnDelete.forEach((item) =>
    item.addEventListener("click", (e) => {
      e.preventDefault();
      let id = parseInt(e.target.getAttribute("data-id"));
      return confirm("Hapus data ini..?") ? deleteMahasiswa(id) : false;
    })
  );


// Affine Cipher Generator

const plainText = document.getElementById('plainText')
const encryptedText = document.getElementById('encryptedText')

plainText.addEventListener('keyup', () => {
encryptedText.value = encrypt(7, 10, plainText.value)
})