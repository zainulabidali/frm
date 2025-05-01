
document.getElementById("themeSelect")?.addEventListener("change", function () {
  const theme = this.value;
  document.body.className = "theme-" + theme;
});

document.getElementById("resultForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const regno = document.getElementById("regno").value.trim();
  const selectedClass = document.getElementById("class").value;

  const resultElement = document.getElementById("result");

  // Show loading message
  resultElement.innerHTML = "<p>ഫലം ലോഡ് ചെയ്യുന്നു. ദയവായി കാത്തിരിക്കുക.</p>";

  const apiURL = `https://script.google.com/macros/s/AKfycbxooQRpoD5AG5U20EDGk1My693X9N-Ev2R2yWc5MxZA7IpXqO9Wd7I0nAWvfgqWcFVd/exec?class=${selectedClass}&regno=${regno}`;

  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        resultElement.innerHTML = "<p>ഫലം ലഭ്യമല്ല. രജിസ്റ്റർ നമ്പർ പരിശോധിക്കുക.</p>";
        return;
      }
      localStorage.setItem("studentResult", JSON.stringify(data[0]));
      window.location.href = "result.html";
    })
    .catch(err => {
      console.error(err);
      resultElement.innerHTML = "<p>Error fetching result. Please try again later.</p>";
    });
});


if (window.location.pathname.includes("result.html")) {
  const result = JSON.parse(localStorage.getItem("studentResult"));
  if (result) {
    let table = "<tr><th>FRM</th><th>CHEROOR KOTTA</th></tr>";
    for (let key in result) {
      if (key !== "TOTAL" && key !== "RESULT" && key !== "RANK") {
        table += `<tr><td>${key}</td><td>${result[key]}</td></tr>`;
      }
    }
    table += `<tr><td><strong>TOTAL</strong></td><td>${result["TOTAL"]}</td></tr>`;
    table += `<tr><td><strong>RESULT</strong></td><td>${result["RESULT"]}</td></tr>`;
    table += `<tr><td><strong>RANK</strong></td><td>${result["RANK"]}</td></tr>`;
    document.getElementById("resultTable").innerHTML = table;
  }
}

function downloadPDF() {
  window.print();
}
