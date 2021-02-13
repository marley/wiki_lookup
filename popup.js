chrome.tabs.executeScript(
  {
    code: "window.getSelection().toString()",
  },
  function (selection) {
    var textSelection = document.getElementById("textSelection");
    let searchPhrase = selection[0].replace(/[^a-zA-Z\. ]/g, "");
    if (selection[0].split(" ").length > 10) {
      document.getElementById("searchError").innerHTML =
        "Search phrase too long >_<";
      return;
    } else {
      textSelection.innerHTML = `Result for "${searchPhrase}"`;
    }

    fetch(
      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchPhrase}&limit=1&namespace=0&format=json&origin=*`
    )
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          console.log(data[3].length);
          if (data[3].length > 0) {
            document.getElementById(
              "searchResult"
            ).innerHTML = `<a href="${data[3]}" target="_blank" rel="noopener noreferrer">${data[1]}</a>`;
          } else {
            document.getElementById("searchError").innerHTML =
              "No wikipedia article found!";
          }
        });
      })
      .catch(function (err) {
        document.getElementById("searchError").innerHTML = `Uh oh... ${err}`;
        console.log("Fetch Error", err);
      });
  }
);
