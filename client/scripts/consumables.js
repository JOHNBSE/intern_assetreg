const tableBody = document.getElementById("consumablesTable");

async function fetchDataAndDisplay(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const data = await response.json();

    // tableBody.innerHTML = "";
    data.results.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.category_name}</td>
                <td>${item.quantity}</td>
                <td>${item.purchase_date}</td>
            `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}

fetchDataAndDisplay("http://localhost:5000/api/v1/viewConsumables");
