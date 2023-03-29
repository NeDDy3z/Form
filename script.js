const form = document.getElementById("submitForm");
const fname = document.getElementById("f_name");
const lname = document.getElementById("l_name");
const bday = document.getElementById("bday");
const pass1 = document.getElementById("pass1");
const pass2 = document.getElementById("pass2");
const submit = document.getElementsByTagName("button")[0];

const error = document.getElementById("error");

const dialog = document.getElementById("dialog");
const dialogText = document.getElementById("dialogtext");
const dialogBtn = document.getElementById("dialogbtn");

let calc;
let sum;
let ring = new Audio("media/goodmorning.mp3");


//No page relaod on submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
})



function validateForm() {
    error.innerHTML = '';
    sum = 0;

    checkFName();
    checkLName();
    bdayCalculation();
    checkPassword();

    send();
}

function checkFName() {
    if (fname.value.length > 2 && fname.value.length < 32) sum++;
    else errorMessage("fname");
}

function checkLName() {
    if (lname.value.length > 2 && lname.value.length < 64) sum++;
    else errorMessage("lname");
}

function bdayCalculation() {
    calc = new Date().getFullYear() - new Date(bday.value).getFullYear();

    if (calc <= 15) errorMessage("bday");
    sum++;
}

function checkPassword() {
    var t1 = false;
    var t2 = false;

    if (pass1.value.length > 2) t1 = true;
    else errorMessage("passLength");

    if (pass1.value == pass2.value) t2 = true;
    else errorMessage("passMatch");
    
    if (t1 && t2) sum++;
}



function errorMessage(string) {
    switch (string) {
        case "fname":
            error.append(document.createElement("p").appendChild(document.createTextNode("*Thats your name? OK... Better than \"Mandík\" ig")));
            break;

        case "lname":
            error.append(document.createElement("p").appendChild(document.createTextNode("*What kind of freak has this weird surname?")));
            break;

        case "bday":
            error.append(document.createElement("p").appendChild(document.createTextNode("*HAHA! You baby!")));
            break;
        
        case "passLength":
            error.append(document.createElement("p").appendChild(document.createTextNode("*Your password is the defintion of skillissue")));
            break;

        case "passMatch":
            error.append(document.createElement("p").appendChild(document.createTextNode("*It's not that hard to type in same word twice")));
            break;
    }
    error.append(document.createElement("br"));
}



function send() {
    if (sum == 4) {
        console.log("--------------------------");
        console.log("Firstname: "+ fname.value);
        console.log("Lastname: "+ lname.value);
        console.log("Bday: "+ bday.value);
        console.log("Age: "+ calc);
        console.log("Password: "+ pass1.value);
        console.log("--------------------------");

        correctSubmit();
    }
    else {
        console.log("Not all criterias were met.");
    }
}



function correctSubmit() {
    fname.value = null;
    lname.value = null;
    bday.value = null;
    pass1.value = null;
    pass2.value = null;

    submit.focus();
    submit.disabled = true;
    submit.innerText = "✓";
    submit.style.backgroundColor = "green";

    disableFormInput(true);

    /*
    if (calc >= 18) {
        ring.play();

        setTimeout(function () {
            dialogText.innerText = "Congrats! You are being enroled!";
            dialogBtn.innerText = "WAR!!!";
            dialog.style.display = "inline";

            document.getElementById("a-thing").style.display = "inline";
        }, 6600);
    } 
    else {
        dialogText.innerText = "Success!";
        dialogBtn.innerText = "Continue";
        dialog.style.display = "inline";
    }
    */
    dialogText.innerText = "Success!";
    dialogBtn.innerText = "Continue";
    dialog.style.display = "inline";
}



//over 18 moment
function enroll() {
    disableFormInput(false);
    document.getElementById("dialog").style.display = "none";
    document.getElementById("a-thing").style.display = "none";
    
    ring.pause();
    ring.currentTime = 0;

    submit.innerText = "Submit";
    submit.style.backgroundColor = "rgb(0, 75, 160)";

    error.innerHTML = '';
}

function disableFormInput(bool) {
    fname.disabled = bool;
    lname.disabled = bool;
    bday.disabled = bool;
    pass1.disabled = bool; 
    pass2.disabled = bool;
    submit.disabled = bool;
}
