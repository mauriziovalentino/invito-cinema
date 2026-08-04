// =========================
// ELEMENTI PAGINA
// =========================


const initialScreen = document.getElementById("initialScreen");

const yesButton = document.getElementById("yesButton");

const noButton = document.getElementById("noButton");


const confirmation = document.getElementById("confirmation");


const choices = document.querySelectorAll('input[name="giorno"]');


const popup = document.getElementById("popup");

const success = document.getElementById("success");


const confirmButton = document.getElementById("confirmButton");

const phone = document.getElementById("phone");




// =========================
// GOOGLE APPS SCRIPT
// =========================


const googleScriptURL = 
"https://script.google.com/macros/s/AKfycbyB1e9hRRH5D9L1Khyq7gxZ6u6F1Gp0hKAWlxIU2QwvMCos2-kBXbPJaLj9WuPBNgxewg/exec";






// =========================
// CLICK "CI SARÒ"
// =========================


if(yesButton){


yesButton.addEventListener("click",()=>{


    // nasconde schermata iniziale

    if(initialScreen){

        initialScreen.classList.add("hidden");

    }



    // mostra scelta orario

    if(confirmation){

        confirmation.classList.remove("hidden");

    }



});



}






// =========================
// PULSANTE NO CHE SCAPPA
// =========================


function moveNoButton(){


    const maxX =
    window.innerWidth - noButton.offsetWidth - 20;



    const maxY =
    window.innerHeight - noButton.offsetHeight - 20;



    const randomX =
    Math.max(10, Math.random() * maxX);



    const randomY =
    Math.max(10, Math.random() * maxY);




    noButton.style.position = "fixed";


    noButton.style.left =
    randomX + "px";


    noButton.style.top =
    randomY + "px";



}





if(noButton){


    noButton.addEventListener(
        "mouseenter",
        moveNoButton
    );



    noButton.addEventListener(
        "touchstart",
        (e)=>{


            e.preventDefault();


            moveNoButton();


        }
    );


}






// =========================
// SCELTA ORARIO
// =========================


choices.forEach(choice=>{


choice.addEventListener(
"change",
()=>{


    setTimeout(()=>{


        popup.classList.remove("hidden");


    },500);



});


});






// =========================
// INVIO NUMERO
// =========================


if(confirmButton){



confirmButton.addEventListener(
"click",
()=>{


    const number =
    phone.value.trim();





    if(number.length < 8){


        alert(
        "Inserisci un numero valido 😊"
        );


        return;


    }






    let selectedTime = "";




    choices.forEach(choice=>{


        if(choice.checked){


            selectedTime =
            choice.value;


        }


    });






    if(selectedTime === ""){


        alert(
        "Seleziona prima l'orario 😊"
        );


        return;


    }






    const data = {


        telefono:number,


        orario:selectedTime,


        data:
        new Date().toLocaleString("it-IT")


    };







    fetch(
    googleScriptURL,
    {


        method:"POST",


        mode:"no-cors",


        headers:{


            "Content-Type":
            "application/json"


        },



        body:
        JSON.stringify(data)



    })



    .then(()=>{


        popup.classList.add("hidden");



        success.classList.remove("hidden");



    })



    .catch(()=>{


        alert(
        "Errore nel salvataggio. Riprova."
        );


    });



});



}