const baseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json";

const dropdown = document.querySelector(".dropdown select");

const btn = document.querySelector("form button");

const fromcurr = document.querySelector("From select");
const tocurr = document.querySelector("To select");
const msg = document.querySelector(".msg");

for(let select of dropdowns) {
    for (currCode in countryList){
    let newOption =document.createElement("option");
    newOption.innerText = currCode;
    if(select.name ==="From" && currCode === "USD"){
        newOption.selected = "selected";
    }
     else if(select.name ==="To" && currCode === "INR"){
        newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change" ,(evt) => {
    updateFlag(evt.target)
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};


const updateFlag = (element) => {
    let currCode= element.value;
    let countryCode = countryList[currCode];
    let newsrclink = "https://flagsapi.com/${countryCode}/flat/64.png"
    let img = element.parentElement.querySelector("img");
    img.src = newsrclink;
}



btn.addEventListener("click" , async (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", ()=> {
    updateExchangeRate();
})
