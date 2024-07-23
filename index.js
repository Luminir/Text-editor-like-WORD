let optionButtons = document.querySelectorAll(".option-button");
let advOptionButtons = document.querySelectorAll(".adv-option-button");
let scriptButtons = document.querySelectorAll(".script");

// Modify words
let formatButtons = document.querySelectorAll(".format");
// hyper ref
let linkButton = document.getElementById("createLink");
let unlinkButton = document.getElementById("unlink");
// alignment
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
// Font
let fontName = document.getElementById("fontName");
let fontSize = document.getElementById("fontSize");
// Text area
let writtingArea = document.getElementById("text-input");

// List ofn font list
let fontList=["Arial", "Times New Roman", "Monospace", "Calibri", "Georgia", "Courier New", "Cursive"];

const initialSetting = () =>{
    // Highlight funtion that we are using: like bold, align Center
    // Alerting us that we r using those function
    // link, re-undo, list do not need like real MSword
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    // options for font name
    fontList.map((val) => {
        // create <option>
        let option = document.createElement("option");
        option.value = val; // <option value="val">
        option.innerHTML = val;
        fontName.appendChild(option);
    })
    // options for font name
    for(let i = 1; i <=10; i++){
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML= i;
        fontSize.appendChild(option);
    }
    // default fontSize and fontName
    fontName.value = "Times New Roman"; // <option value="Arial>
    fontSize.value = 7 //<option value="7">
};

// Main
const modifyText = (command, defaulty, value) => {
    // execute command on selected text
    document.execCommand(command, defaulty, value);
};

// basic button
optionButtons.forEach((button) => {
    button.addEventListener('click', () =>{
        modifyText(button.id, false, null);
        // console.log(button.id);
    });
});

// adv buttons
advOptionButtons.forEach((button) => {
    button.addEventListener('change', () =>{
        modifyText(button.id, false, button.value);
        // console.log(button.id + " " + button.value);
    });
});

// link
linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL:");
    if(/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    }
    else{
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

// removeLink
const removeLink = () => {
    document.execCommand("unlink", false, null);
};
unlinkButton.addEventListener('click', () => {
    removeLink();
})

const highlighter = (buttonsWithClassName, condition) => {
    buttonsWithClassName.forEach((button) => {
        button.addEventListener('click', () => {
            if (condition){ // condition true
                // set default not active
                // alreadyActive is like a flag
                let alreadyActive = false;

                // if already highlight the function button
                if(button.classList.contains("active")){
                    alreadyActive = true; // flag true
                }

                highlighterRemover(buttonsWithClassName);
                // if NOT already highlight the function button
                if(!alreadyActive){
                    button.classList.add("active");
                }
            }
            else{ // condition: false
                button.classList.toggle('active');
            }
        });
    });
};

const highlighterRemover = (buttonsWithClassName) => {
    buttonsWithClassName.forEach((button) => {
        button.classList.remove("active");
    })
}


// when window fully loaded, run initalSetting()
window.onload = initialSetting();