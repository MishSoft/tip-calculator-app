// Global variables
const billInput = document.getElementById("billAmount")
const peopleInput = document.getElementById("numberOfPeople")
const tipInput = document.getElementById("tipPercentage")

const tipAmount = document.getElementById("tip-amount")
const total = document.getElementById("total")

const selectTipButton = document.querySelectorAll(".percent-btn")
const resetButton = document.getElementById("resetButton")

const error1 = document.querySelector(".error1")
const error2 = document.querySelector(".error2")

const billInputItems = {
    1: document.querySelector(".bill-input1"),
    2: document.querySelector(".bill-input2")
}

document.addEventListener("DOMContentLoaded", () => {

    tipAmount.innerHTML = "$0.0"
    total.innerHTML = "$0.0"

    // Call Functions
    updateTipButtonStyle()

    // Add input event listeners to handle errors
    billInput.addEventListener("input", () => handleInputError(billInput, peopleInput, error1, billInputItems[1]))
    peopleInput.addEventListener("input", () => handleInputError(billInput, peopleInput, error2, billInputItems[2]))


    resetButton.addEventListener("click", resetButtonFun)
})

// Select tip and check it
function updateTipButtonStyle() {
    selectTipButton.forEach(item => {
        item.addEventListener("click", () => {
            selectTipButton.forEach(index => {
                index.classList.remove("percent-active-btn")
                index.classList.add("percent-btn")
            })

            item.classList.remove("percent-btn")
            item.classList.add("percent-active-btn")
            tipInput.value = ""
            const tipValue = parseFloat(item.innerHTML.trim().replace(/[^0-9.]/g, ''))

            calculate(billInput, peopleInput, tipValue)
        })

        tipInput.addEventListener("input", (e) => {
            clearTipButtonStyles()
            const tipValue = parseFloat(e.target.value)
            calculate(billInput, peopleInput, tipValue)
        })
    })
}

function clearTipButtonStyles() {
    selectTipButton.forEach(index => {
        index.classList.remove("percent-active-btn")
        index.classList.add("percent-btn")
    })
}

function calculate(bill, people, tip) {
    const billValue = parseFloat(bill.value)
    const peopleValue = parseFloat(people.value)



    const tipPerPerson = (billValue * tip) / 100
    // console.log(totalTip)
    const totalTip = (billValue / peopleValue) + tipPerPerson

    tipAmount.innerHTML = `$${tipPerPerson}`
    total.innerHTML = `$${totalTip}`
}

function handleInputError(bill, people, errorText, errorItem) {
    if ((parseFloat(bill.value) === 0 && parseFloat(people.value) === 0) || parseFloat(people.value) === 0 || parseFloat(bill.value) === 0) {
        displayError(errorText, errorItem)
    } else {
        hideErrors()
    }
}

function displayError(errorText, errorItem) {
    errorText.style.display = "block"
    errorItem.classList.add("bill-input-error")
    errorItem.classList.remove("bill-input")
}

function hideErrors() {
    error1.style.display = "none"
    error2.style.display = "none"

    for (const key in billInputItems) {
        billInputItems[key].classList.remove("bill-input-error")
        billInputItems[key].classList.add("bill-input")
    }
}


function resetButtonFun() {
    tipAmount.innerHTML = "$0.0"
    total.innerHTML = "$0.0"

    billInput.value = ""
    peopleInput.value = ""
    tipInput.value = ""

    selectTipButton.forEach(index => {
        index.classList.remove("percent-active-btn")
        index.classList.add("percent-btn")
    })
}