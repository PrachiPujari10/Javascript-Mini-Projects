const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const result = document.getElementById("result");

const currencies = ["USD", "EUR", "INR", "GBP", "JPY", "AUD", "CAD"];

currencies.forEach(currency => {
  fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
  toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convert() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    result.textContent = "Enter a valid amount";
    return;
  }

  result.textContent = "Converting...";

  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
    );

    const data = await response.json();
    result.textContent = `${amount} ${from} = ${data.rates[to]} ${to}`;
  } catch (error) {
    result.textContent = "Error fetching exchange rates";
    console.error(error);
  }
}
