import { HuffManCode } from "./HuffManCode.js";

/// accesing dom elements
var decodeBtn = document.getElementById("decode");
var encodeBtn = document.getElementById("encode");
var fileForm = document.getElementById("fileform");
var uploadFile = document.getElementById("uploadfile");
var submitBtn = document.getElementById("submitbtn");
var step1 = document.getElementById("step1");
var step2 = document.getElementById("step2");
var step3 = document.getElementById("step3");

/// onload function
window.onload = function () {
  console.log("here onload");

  var isSubmitted = false;
  var codecObj = new HuffManCode();

  /// called when submit button is clicked
  submitBtn.onclick = function () {
    var uploadedFile = uploadFile.files[0];
    if (uploadedFile === undefined) {
      alert(
        "No file uploaded.\nPlease upload a valid .txt file and try again!"
      );
      return;
    }
    let nameSplit = uploadedFile.name.split(".");
    var extension = nameSplit[nameSplit.length - 1].toLowerCase();
    if (extension != "txt") {
      alert(
        "Invalid file type (." +
          extension +
          ") \nPlease upload a valid .txt file and try again!"
      );
      return;
    }
    alert("File submitted!");
    isSubmitted = true;
    onclickChanges("Done!! File uploaded !", step1);
  };

  /// called when compress button is clicked
  encodeBtn.onclick = function () {
    console.log("encode onclick");
    var uploadedFile = uploadFile.files[0];
    if (uploadedFile === undefined) {
      alert("No file uploaded.\nPlease upload a file and try again!");
      return;
    }
    if (isSubmitted === false) {
      alert(
        "File not submitted.\nPlease click the submit button on the previous step\nto submit the file and try again!"
      );
      return;
    }
    console.log(uploadedFile.size);
    if (uploadedFile.size === 0) {
      alert(
        "WARNING: You have uploaded an empty file!\nThe compressed file might be larger in size than the uncompressed file (compression ratio might be smaller than one).\nBetter compression ratios are achieved for larger file sizes!"
      );
    } else if (uploadedFile.size <= 350) {
      alert(
        "WARNING: The uploaded file is very small in size (" +
          uploadedFile.size +
          " bytes) !\nThe compressed file might be larger in size than the uncompressed file (compression ratio might be smaller than one).\nBetter compression ratios are achieved for larger file sizes!"
      );
    } else if (uploadedFile.size < 1000) {
      alert(
        "WARNING: The uploaded file is small in size (" +
          uploadedFile.size +
          " bytes) !\nThe compressed file's size might be larger than expected (compression ratio might be small).\nBetter compression ratios are achieved for larger file sizes!"
      );
    }
    onclickChanges("Done!! Your file will be Compressed", step2);
    onclickChanges2("Compressing your file ...", "Compressed");
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      let text = fileLoadedEvent.target.result;
      let [encodedString, outputMsg] = codecObj.encode(text);
      myDownloadFile(
        uploadedFile.name.split(".")[0] + "_compressed.txt",
        encodedString
      );
      ondownloadChanges(outputMsg);
    };
    fileReader.readAsText(uploadedFile, "UTF-8");
  };

  // called when decompress button is clicked
  decodeBtn.onclick = function () {
    console.log("decode onclick");
    var uploadedFile = uploadFile.files[0];
    if (uploadedFile === undefined) {
      alert("No file uploaded.\nPlease upload a file and try again!");
      return;
    }
    if (isSubmitted === false) {
      alert(
        "File not submitted.\nPlease click the submit button on the previous step\nto submit the file and try again!"
      );
      return;
    }
    onclickChanges("Done!! Your file will be De-compressed", step2);
    onclickChanges2("De-compressing your file ...", "De-compressed");
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      let text = fileLoadedEvent.target.result;
      let [decodedString, outputMsg] = codecObj.decode(text);
      myDownloadFile(
        uploadedFile.name.split(".")[0] + "_decompressed.txt",
        decodedString
      );
      ondownloadChanges(outputMsg);
    };
    fileReader.readAsText(uploadedFile, "UTF-8");
  };
};

/// changes dom when step 1 and is complete ( step 2 is running)
function onclickChanges(firstMsg, step) {
  step.innerHTML = "";
  let img = document.createElement("img");
  img.src = "assets/images/done_icon3.png";
  img.id = "doneImg";
  step.appendChild(img);
  var br = document.createElement("br");
  step.appendChild(br);
  let msg = document.createElement("span");
  msg.className = "text2";
  msg.innerHTML = firstMsg;
  step.appendChild(msg);
}

/// changes dom when step 2 is complete (step 3 is running)
function onclickChanges2(secMsg, word) {
  decodeBtn.disabled = true;
  encodeBtn.disabled = true;
  step3.innerHTML = "";
  let msg2 = document.createElement("span");
  msg2.className = "text2";
  msg2.innerHTML = secMsg;
  step3.appendChild(msg2);
  // var br = document.createElement("br");
  // step3.appendChild(br);
  let msg3 = document.createElement("span");
  msg3.className = "text2";
  msg3.innerHTML = " , " + word + " file will be downloaded automatically!";
  step3.appendChild(msg3);
}

/// function to download file
function myDownloadFile(fileName, text) {
  let a = document.createElement("a");
  a.href = "data:application/octet-stream," + encodeURIComponent(text);
  a.download = fileName;
  a.click();
}

/// changed dom when file is downloaded (step 3 complete)
function ondownloadChanges(outputMsg) {
  step3.innerHTML = "";
  let img = document.createElement("img");
  img.src = "assets/images/done_icon3.png";
  img.id = "doneImg";
  step3.appendChild(img);
  var br = document.createElement("br");
  step3.appendChild(br);
  let msg3 = document.createElement("span");
  msg3.className = "text2";
  msg3.innerHTML = outputMsg;
  step3.appendChild(msg3);
}
