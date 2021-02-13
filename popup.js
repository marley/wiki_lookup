chrome.tabs.executeScript(
  {
    code: "window.getSelection().toString();",
  },
  function (selection) {
    var textSelection = document.getElementById("textSelection");
    let searchPhrase = selection[0];
    textSelection.innerHTML = searchPhrase;

    // checkPageButton.addEventListener(
    //   "click",
    //   (searchPhrase) => searchWikipedia(searchPhrase),
    //   false
    // );
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
            var result = document.getElementById("searchResult");
            // result.innerHTML = `<a href=${data[3]}></a>`;
            result.innerHTML = `<a href="${data[3]}" target="_blank" rel="noopener noreferrer">${data[1]}</a>`;
          } else {
            var result = document.getElementById("searchError");
            result.innerHTML = "No wikipedia article found!";
          }
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }
);

async function searchWikipedia(searchPhrase) {
  console.log(`searching for ${searchPhrase}`);
  fetch(
    `https://en.wikipedia.org/w/api.php?action=query&titles=${searchPhrase}&prop=images&format=json&origin=*`
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
        console.log(data);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}
