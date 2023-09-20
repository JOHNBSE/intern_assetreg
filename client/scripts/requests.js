const openRequests = document.getElementById("openRequests");
const closedRequests = document.getElementById("closedRequests");

let btnArr;
async function fetchDataAndDisplay(url, option) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const data = await response.json();

    // tableBody.innerHTML = "";
    data[`${option}`].forEach((item) => {
      const dateRequested = new Date(item.date_requested);
      const formattedDate = `${dateRequested.getFullYear()}-${(
        dateRequested.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${dateRequested
        .getDate()
        .toString()
        .padStart(2, "0")} ${dateRequested
        .getHours()
        .toString()
        .padStart(2, "0")}:${dateRequested
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${dateRequested
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.title}</td>
                <td>${formattedDate}</td>
                <td>${item.service_required}</td>
                <td>${item.name}</td>
                <td>${item.timeout}</td>
                <td>${item.status}</td>
                <td><button id=${item.requestID} class="buttons">${
        option === "openRequests" ? "Close" : "Closed"
      }</button></td>
            `;
      option === "openRequests"
        ? openRequests.appendChild(row)
        : closedRequests.appendChild(row);
    });
    btnArr = document.querySelectorAll(".buttons");
    btnArr.forEach((btn) => {
      btn.addEventListener("click", () => updateRequests(btn));
    });
  } catch (err) {
    console.error(err);
  }
}

fetchDataAndDisplay(
  "http://localhost:5000/api/v1/viewRequests",
  "openRequests"
);

fetchDataAndDisplay(
  "http://localhost:5000/api/v1/viewRequests",
  "closedRequests"
);

// console.log(buttons);
const updateRequests = async (btn) => {
  let url = "http://localhost:5000/api/v1/updateRequests";
  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        requestID: btn.id,
      }),
      headers: {
        "Content-Type": "Application/json",
      },
    }).then(() => {
      location.reload()
    });
  } catch (err) {
    console.log(err);
  }
};
