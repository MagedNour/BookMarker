var bookmarkName = document.getElementById("bookmarkName");
var siteUrl = document.getElementById("site-url");
var viewBox = document.getElementById("viewBox");
var failed = document.getElementById("failed");


var webArray = JSON.parse(localStorage.getItem("websites")) ?? [];
display()



function addUrl() {

    if (validateName() && validateSite()) {
        var newWeb = {
            name: bookmarkName.value,
            site: siteUrl.value
        }

        webArray.push(newWeb);
        onDataChange();

        console.log(true);
    } else {
        failed.innerHTML = `
        <div class="box-info position-absolute start-0 top-0 bottom-0 end-0 w-100 h-100 d-flex justify-content-center align-items-center" onclick = "closebox()">
            <div class="box-conent bg-white p-4 rounded-2 shadow-lg">
              <header class="box-header w-100 d-flex justify-content-between align-items-center mb-4">
                <div class="circles d-flex">
                  <span class="rounded-circle me-2 bg-danger"></span>
                  <span class="rounded-circle me-2 bg-warning"></span>
                  <span class="rounded-circle me-2 bg-success"></span>
                </div>
                <button class="btn border-0" onclick = "closebox()" id="closeBtn">
                  <i class="fa-solid fa-xmark close fs-3"></i>
                </button>
              </header>
              <p class="m-0 pb-2 fw-bolder">
                Site Name or Url is not valid, Please follow the rules below :
              </p>
              <ol class="rules list-unstyled m-0">
                <li>
                  <i class="fa-regular fa-circle-right p-2"></i>Site name must
                  contain at least 3 characters
                </li>
                <li>
                  <i class="fa-regular fa-circle-right p-2"></i>Site URL must be a
                  valid one
                </li>
              </ol>
            </div>
          </div>
        `
    }


}


function display() {

    var allRows = "";
    for (var i = 0; i < webArray.length; i++) {
        allRows += `
        <tr>
          <td>${i}</td>
          <td>${webArray[i].name}</td>
          <td>
              <a href="${webArray[i].site}" target="_blank">
                <button class="btn btn-visit px-4">
                    <i class="fa-solid fa-eye"></i>
                    Visit
                </button>
               </a>
          </td>
          <td>
            <button class="btn btn-delete px-4" onclick = "deleteSite(${i})">
                <i class="fa-solid fa-trash-can"></i>
                Delete
            </button>
           </td>
         </tr>
        `
    }

    viewBox.innerHTML = allRows;
}

function clearForm() {
    bookmarkName.value = ""
    siteUrl.value = ""
}

function deleteSite(index) {
    webArray.splice(index, 1)
    onDataChange()
}


function onDataChange() {
    localStorage.setItem("websites", JSON.stringify(webArray))
    display()
    clearForm()
}

function validateName() {
    if (/^[a-zA-Z0-9]{3,}$/.test(bookmarkName.value)) {
        bookmarkName.classList.add("is-valid")
        bookmarkName.classList.remove("is-invalid")
        return true

    } else {
        bookmarkName.classList.add("is-invalid")
        bookmarkName.classList.remove("is-valid")
        return false
    }
}

function validateSite() {
    if (/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9#-_.]*)*\/?$/.test(siteUrl.value)) {
        siteUrl.classList.add("is-valid")
        siteUrl.classList.remove("is-invalid")
        return true
    } else {
        siteUrl.classList.add("is-invalid")
        siteUrl.classList.remove("is-valid")
        return false
    }
}


function closebox(){
    failed.innerHTML = ""
    console.log("Hello");
}