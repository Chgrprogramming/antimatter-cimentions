// Antimatter Dimensions - Simple JavaScript Implementation

document.body.innerHTML = `
  <div style="font-family:Arial;max-width:500px;margin:40px auto;text-align:center;">
    <h2>Antimatter Dimensions</h2>
    <p>Antimatter: <span id="antimatter">0</span></p>
    <div id="dimensions"></div>
    <hr>
    <button id="resetBtn" style="color:red;">Reset Game</button>
  </div>
`;

const DIMENSIONS = [
  { name: "First Dimension", baseCost: 10, multiplier: 1 },
  { name: "Second Dimension", baseCost: 100, multiplier: 1 },
  { name: "Third Dimension", baseCost: 1000, multiplier: 1 },
  { name: "Fourth Dimension", baseCost: 10000, multiplier: 1 }
];

let antimatter = 0;
let dims = [
  { amount: 0, cost: DIMENSIONS[0].baseCost },
  { amount: 0, cost: DIMENSIONS[1].baseCost },
  { amount: 0, cost: DIMENSIONS[2].baseCost },
  { amount: 0, cost: DIMENSIONS[3].baseCost }
];

function updateDisplay() {
  document.getElementById('antimatter').textContent = Math.floor(antimatter);
  let html = "";
  for (let i = 0; i < DIMENSIONS.length; i++) {
    html += `
      <div style="margin-bottom:12px;">
        <b>${DIMENSIONS[i].name}</b><br>
        Amount: <span id="dim_amt_${i}">${dims[i].amount}</span><br>
        <button id="buy_dim_${i}">Buy (${dims[i].cost} antimatter)</button>
      </div>
    `;
  }
  document.getElementById('dimensions').innerHTML = html;

  for (let i = 0; i < DIMENSIONS.length; i++) {
    document.getElementById(`buy_dim_${i}`).onclick = () => buyDimension(i);
    document.getElementById(`buy_dim_${i}`).disabled = antimatter < dims[i].cost;
  }
}

function buyDimension(dim) {
  if (antimatter >= dims[dim].cost) {
    antimatter -= dims[dim].cost;
    dims[dim].amount += 1;
    dims[dim].cost = Math.floor(dims[dim].cost * 1.15); // Exponential cost increase
    updateDisplay();
  }
}

function resetGame() {
  if (confirm('Reset the game?')) {
    antimatter = 0;
    for (let i = 0; i < dims.length; i++) {
      dims[i].amount = 0;
      dims[i].cost = DIMENSIONS[i].baseCost;
    }
    updateDisplay();
  }
}

document.getElementById('resetBtn').onclick = resetGame;

// Game loop: Dimensions produce antimatter and each higher dimension boosts the lower
setInterval(() => {
  // Fourth dimension boosts third
  dims[2].amount += dims[3].amount * DIMENSIONS[3].multiplier / 10;
  // Third dimension boosts second
  dims[1].amount += dims[2].amount * DIMENSIONS[2].multiplier / 10;
  // Second dimension boosts first
  dims[0].amount += dims[1].amount * DIMENSIONS[1].multiplier / 10;
  // First dimension produces antimatter
  antimatter += dims[0].amount * DIMENSIONS[0].multiplier / 10;

  updateDisplay();
}, 100); // 10 times per second for smoothness

updateDisplay();
