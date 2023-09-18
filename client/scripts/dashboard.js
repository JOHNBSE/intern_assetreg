let asset_no = document.getElementById("asset_no");
let location_no = document.getElementById("location_no");
let consumables_no = document.getElementById("consumables_no");
let category_no = document.getElementById("category_no");
let request_no = document.getElementById("requests_no");

async function getTotals() {
  try {
    const data = await fetch("http://localhost:5000/api/v1/getTotal")
      .then((res) => res.json())
      .then((data) => {
        asset_no.textContent = data.assets;
        location_no.textContent = data.locations;
        consumables_no.textContent = data.consumables;
        category_no.textContent = data.categories;
        request_no.textContent = data.requests;
      });
  } catch (err) {
    console.log(err);
  }
}

getTotals();

const tableBody = document.getElementById("tableBody");

async function fetchDataAndDisplay(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const data = await response.json();
    console.log(data.results[0]);

    tableBody.innerHTML = "";
    data.results.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.asset_name}</td>
                <td>${item.category_name}</td>
                <td>${item.model}</td>
                <td>${item.serial_no}</td>
                <td>${item.location_name}</td>
                <td>${item.condition}</td>
                <td><button>Click</button></td>
            `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}

fetchDataAndDisplay("http://localhost:5000/api/v1/viewAssets");

let searchInput = document.getElementById("searchValue");
let searchType = document.getElementById("searchType");
let searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  let url = `http://localhost:5000/api/v1/search/${searchInput.value}/${searchType.value}`;
  fetchDataAndDisplay(url);
});
