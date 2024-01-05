// Source: https://www.w3schools.com/howto/howto_js_filter_table.asp

const input = document.getElementById("searchBar");
function recherche() {
  const filter = input.value.toUpperCase();
  const table = document.querySelector('table');
  const tr = table.getElementsByTagName("tr");

  // Boucle à travers toutes les lignes de la table, 
  // et cache celles qui ne correspondent pas à la recherche
  let td, i, txtValue;
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// Source: https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", (event) => {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    fetch('/gti525/v1/').then(function (){
      ///location.reload();
    })
    // Trigger the button element with a click
    document.getElementById("searchBtn").click();
  }
});
