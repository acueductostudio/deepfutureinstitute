 

 const downloadWorkshop = () => {
    var tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = "assets/pdf/TallerAutogestivo.zip";
    tempLink.setAttribute("download", "TallerAutogestivo.zip");

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }

    document.body.appendChild(tempLink);
    tempLink.click();
    // Fixes "webkit blob resource error 1"
    setTimeout(function () {
      document.body.removeChild(tempLink);
    }, 200);
  }

  export default downloadWorkshop;