const tableBody = document.getElementById("assetCatbody");

async function fetchDataAndDisplay(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const data = await response.json();

    console.log(data.results);

    // tableBody.innerHTML = "";
    data.results.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.category_name}</td>
                <td>${item.description}</td>
            `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}

fetchDataAndDisplay("http://localhost:5000/api/v1/viewConsumables");
