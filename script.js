const totalBill = document.getElementById("bill");
const numberOfPerson = document.getElementById("number");
const tip = document.querySelector(".tip-amount");
const bill = document.querySelector(".total");
const error = document.querySelector(".error");

let tipSelected = 0;


// Activer le calcul avec les valeurs de Bill et Number à chaque modif de l'un ou de l'autre
totalBill.addEventListener("input", update);
numberOfPerson.addEventListener("input", update);

// Récupérer la valeur de tip sélectionnée et calculer Tip et Bill

const tipAmounts = document.querySelectorAll("input[name=tip]");

tipAmounts.forEach(function (tipAmount) {
    tipAmount.addEventListener("click", () => { //au clic sur un des input name="tip"
        tipSelected = parseFloat(tipAmount.value); // Stocke la valeur de tip en tant que nombre pour l'utiliser dans applyTip et calculateBill
        update();
    });

    if (tipAmount.id === "custom") {
        tipAmount.addEventListener("input", () => {
            tipSelected = parseFloat(tipAmount.value); // Stocke la valeur de tip en tant que nombre pour l'utiliser dans applyTip et calculateBill
            update();
        });
    }
});


function update() {
    const billValue = parseFloat(totalBill.value);
    const numberOfPersonValue = parseFloat(numberOfPerson.value);

    if (numberOfPersonValue === 0) {
        numberOfPerson.classList.add("input-error");
        error.style.display = "initial";

    } else {

        numberOfPerson.classList.remove("input-error");
        error.style.display = "none";

        if (!isNaN(billValue) && !isNaN(numberOfPersonValue)) {
            const tipPerPerson = (tipSelected * billValue / 100) / numberOfPersonValue;
            const billPerPerson = (billValue / numberOfPersonValue) + tipPerPerson;
            tip.textContent = tipPerPerson.toFixed(2);
            bill.textContent = billPerPerson.toFixed(2);
        } else {
            tip.textContent = "0.00"; //Valeur par défaut si billValue ou numberValue n'est pas un nombre (NaN = NotaNumber)
            bill.textContent = "0.00";
        }
    }

}

// Appel de la fonction au chargement de la page
update();

//bouton reset (par défaut, efface les champs du formulaire)

const resetButton = document.querySelector('button[type="reset"]');

resetButton.addEventListener("click", function (event) {
    tip.textContent = "0.00";
    bill.textContent = "0.00";
});