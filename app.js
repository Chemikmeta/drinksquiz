const PASS_PERCENT = 100;

const questions = [
  { name: "Cuba Libre", ingredients: ["40ml bacardi carta blanca","sok z limonki","cola"] },
  { name: "Tequila Sunrise", ingredients: ["40ml patron silver","sok pomarańczowy","grenadyna"] },
  { name: "Aperol Spritz", ingredients: ["90ml prosecco","60ml aperol","30ml woda gazowana"] },
  { name: "Fierro Tonic", ingredients: ["80ml martini fierro","80ml thomas henry tonic water"] },
  { name: "B-52", ingredients: ["bols coffee","baileys","cointreau"] },
  { name: "Sex on the Beach", ingredients: ["40ml żubrówka czarna","20ml bols peach","20ml bols coconut","sok pomarańczowy","sok żurawinowy"] },
  { name: "Whisky Sour", ingredients: ["40ml dewars 12","30ml sok z cytryny","20ml syrop cukrowy","angostura bitters","białko jajka"] },
  { name: "Tom Collins", ingredients: ["40ml bombay sapphire","30ml sok z cytryny","20ml syrop cukrowy","woda gazowana"] },
  { name: "Margarita", ingredients: ["40ml patron silver","20ml cointreau","20ml sok z limonki"] },
  { name: "Daiquiri", ingredients: ["40ml bacardi carta blanca","20ml sok z limonki","10ml syrop cukrowy"] },
  { name: "Orgasm", ingredients: ["30ml baileys","30ml bols coffee","30ml mleczko zagęszczone"] },
  { name: "Cosmopolitan", ingredients: ["40ml wódka cytrynowa","20ml cointreau","15ml sok z limonki","30ml sok żurawinowy"] },
  { name: "White Russian", ingredients: ["40ml żubrówka czarna","40ml bols coffee","śmietanka"] },
  { name: "Long Island Iced Tea", ingredients: ["20ml żubrówka czarna","20ml patron silver","20ml bacardi carta blanca","20ml bombay sapphire","20ml cointreau","20ml sok z cytryny","20ml syrop cukrowy","cola"] }
];

const quizDiv = document.getElementById("quiz");

// generowanie pytań
questions.forEach((q, i) => {
  quizDiv.innerHTML += `
    <div class="question">
      <strong>${i+1}. ${q.name}</strong>
      <input id="q${i}" placeholder="Składniki po przecinku">
    </div>
  `;
});

// zakończenie egzaminu
document.getElementById("finish").onclick = () => {
  let score = 0;
  let details = "";

  questions.forEach((q, i) => {
    const input = document.getElementById("q"+i).value
      .toLowerCase()
      .split(",")
      .map(x => x.trim());

    const ok = q.ingredients.every(ing => input.includes(ing));
    if (ok) score++;
    else {
      details += `<p><b>${q.name}</b><br>Poprawnie: ${q.ingredients.join(", ")}</p>`;
    }
  });

  const percent = Math.round(score / questions.length * 100);
  const resultDiv = document.getElementById("result");

  if (percent === PASS_PERCENT) {
    resultDiv.innerHTML = `<h2 class="pass">ZALICZONE ✅ (${percent}%)</h2>`;
  } else {
    resultDiv.innerHTML = `
      <h2 class="fail">NIEZALICZONE ❌ (${percent}%)</h2>
      <h3>Poprawne odpowiedzi:</h3>
      ${details}
    `;
  }
};

// rejestracja service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

// 🔒 BLOKADA COFANIA
history.pushState(null, null, location.href);
window.onpopstate = function () {
  history.go(1);
};

