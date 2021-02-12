document.addEventListener(
  "DOMContentLoaded",
  function () {
    var checkPageButton = document.getElementById("clickIt");

    checkPageButton.addEventListener(
      "click",
      function () {
        chrome.tabs.getSelected(null, function (tab) {
          alert("Hello!... this is my first chrome extension.");
        });
      },
      false
    );
  },
  false
);
