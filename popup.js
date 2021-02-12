chrome.tabs.executeScript(
  {
    code: "window.getSelection().toString();",
  },
  function (selection) {
    var output = document.getElementById("output");
    output.innerHTML = selection[0];
    // alert(selection[0]);
  }
);
