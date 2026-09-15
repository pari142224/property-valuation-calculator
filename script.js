const areaInput = document.getElementById("area");
const ageInput = document.getElementById("age");
const distanceInput = document.getElementById("distance");
const locationInput = document.getElementById("locationScore");

const marketValueOutput = document.getElementById("marketValue");
const perSqftOutput = document.getElementById("perSqft");
const calculationOutput = document.getElementById("calculation");
const errorOutput = document.getElementById("error");

const calculateButton = document.getElementById("calculate");
const resetButton = document.getElementById("reset");

function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(value);
}

function calculateMarketValue() {
  const area = Number(areaInput.value);
  const age = Number(ageInput.value);
  const distance = Number(distanceInput.value);
  const locationScore = Number(locationInput.value);

  if (
    !Number.isFinite(area) || area <= 0 ||
    !Number.isFinite(age) || age < 0 ||
    !Number.isFinite(distance) || distance < 0 ||
    !Number.isFinite(locationScore) ||
    locationScore < 0 || locationScore > 10
  ) {
    errorOutput.textContent =
      "Please enter valid values. Location Score must be between 0 and 10.";
    return;
  }

  errorOutput.textContent = "";

  // Multiple regression equation
  const marketValue =
    -48.61 +
    (0.1256 * area) -
    (5.3268 * age) +
    (14.5651 * distance) -
    (2.6107 * locationScore);

  marketValueOutput.textContent = formatINR(marketValue);

  const perSqft = marketValue / area;
  perSqftOutput.textContent =
    "Predicted value per sq.ft.: " + formatINR(perSqft);

  calculationOutput.textContent =
    "MV = −48.61 + (0.1256 × " + area +
    ") − (5.3268 × " + age +
    ") + (14.5651 × " + distance +
    ") − (2.6107 × " + locationScore +
    ") = " + formatINR(marketValue);

  if (marketValue < 0) {
    errorOutput.textContent =
      "Warning: the model gives a negative prediction for these inputs. " +
      "Check the model units and valid input range.";
  }
}

function resetCalculator() {
  areaInput.value = 1500;
  ageInput.value = 10;
  distanceInput.value = 5;
  locationInput.value = 8;
  calculateMarketValue();
}

calculateButton.addEventListener("click", calculateMarketValue);
resetButton.addEventListener("click", resetCalculator);

// Automatic calculation when values are changed
[areaInput, ageInput, distanceInput, locationInput].forEach(input => {
  input.addEventListener("input", calculateMarketValue);
});

calculateMarketValue();
