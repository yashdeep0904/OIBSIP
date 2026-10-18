document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const tempInput = document.getElementById("tempInput");
    const unitSelect = document.getElementById("unitSelect");
    const convertBtn = document.getElementById("convertBtn");
    const errorMessage = document.getElementById("errorMessage");
    const resultsArea = document.getElementById("resultsArea");
    
    // Result DOMs
    const res1Value = document.getElementById("result1-value");
    const res1Unit = document.getElementById("result1-unit");
    const res2Value = document.getElementById("result2-value");
    const res2Unit = document.getElementById("result2-unit");

    // Absolute Zero Constants for validation
    const ABSOLUTE_ZERO = {
        C: -273.15,
        F: -459.67,
        K: 0
    };

    // Conversion Logic Functions
    const formulas = {
        C: {
            toF: (c) => (c * 9/5) + 32,
            toK: (c) => c + 273.15
        },
        F: {
            toC: (f) => (f - 32) * 5/9,
            toK: (f) => (f - 32) * 5/9 + 273.15
        },
        K: {
            toC: (k) => k - 273.15,
            toF: (k) => (k - 273.15) * 9/5 + 32
        }
    };

    convertBtn.addEventListener("click", () => {
        // Reset previous errors and UI state
        errorMessage.classList.add("hidden");
        tempInput.classList.remove("input-error");
        resultsArea.classList.add("hidden");

        const rawValue = tempInput.value.trim();
        const unit = unitSelect.value;

        // Requirement: Numeric validation
        if (rawValue === "" || isNaN(rawValue)) {
            showError("Please enter a valid numeric temperature.");
            return;
        }

        const temp = parseFloat(rawValue);

        // Requirement: Edge case handling (Absolute Zero)
        if (temp < ABSOLUTE_ZERO[unit]) {
            showError(`Invalid input: Temperature cannot fall below absolute zero (${ABSOLUTE_ZERO[unit]} °${unit === 'K' ? 'K' : unit}).`);
            return;
        }

        // Calculation & simultaneous display routing
        let output1, output2, label1, label2;

        if (unit === "C") {
            output1 = formulas.C.toF(temp);
            label1 = "Fahrenheit (°F)";
            output2 = formulas.C.toK(temp);
            label2 = "Kelvin (K)";
        } else if (unit === "F") {
            output1 = formulas.F.toC(temp);
            label1 = "Celsius (°C)";
            output2 = formulas.F.toK(temp);
            label2 = "Kelvin (K)";
        } else if (unit === "K") {
            output1 = formulas.K.toC(temp);
            label1 = "Celsius (°C)";
            output2 = formulas.K.toF(temp);
            label2 = "Fahrenheit (°F)";
        }

        // Inject calculated data into the DOM (rounded to 2 decimals)
        res1Value.textContent = output1.toFixed(2);
        res1Unit.textContent = label1;
        
        res2Value.textContent = output2.toFixed(2);
        res2Unit.textContent = label2;

        // Reveal results
        resultsArea.classList.remove("hidden");
    });

    // Helper to display errors visually
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove("hidden");
        tempInput.classList.add("input-error");
    }
});