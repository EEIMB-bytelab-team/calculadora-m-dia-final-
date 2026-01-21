
const mediaInput = document.getElementById("media");
const erroDiv = document.getElementById("erro-media");
const resultadoDiv = document.getElementById("resultado");
const toggleBtn = document.getElementById("toggle-theme");

function setTheme(dark) {
    if (dark) {
        document.body.classList.add("dark");
        toggleBtn.textContent = "☀️ Modo claro";
        localStorage.setItem("tema","escuro");
    } else {
        document.body.classList.remove("dark");
        toggleBtn.textContent = "🌙 Modo escuro";
        localStorage.setItem("tema","claro");
    }
}
toggleBtn.addEventListener("click", () => setTheme(!document.body.classList.contains("dark")));
if (localStorage.getItem("tema") === "escuro") setTheme(true);

mediaInput.addEventListener("input", () => {
    validarCampo();
    calcularNotaNecessaria();
});

function validarCampo() {
    const valor = parseFloat(mediaInput.value);
    if (isNaN(valor)) {
        erroDiv.textContent = "";
        mediaInput.classList.remove("borda-erro");
        return;
    }
    if (valor < 0 || valor > 10) {
        erroDiv.textContent = "⚠️ O valor deve estar entre 0 e 10.";
    } else {
        erroDiv.textContent = "";
    }
}

function calcularNotaNecessaria() {
    const media = parseFloat(mediaInput.value);
    if (isNaN(media)) {
        resultadoDiv.textContent = "";
        resultadoDiv.className = "";
        return;
    }
    if (media < 0 || media > 10) {
        resultadoDiv.textContent = "Insira uma média válida entre 0 e 10.";
        resultadoDiv.className = "reprovado";
        return;
    }
    if (media >= 6) {
        resultadoDiv.textContent = "✅ Você já está aprovado! Não precisa de exame final.";
        resultadoDiv.className = "aprovado";
        return;
    }
    if (media < 2.5) {
        resultadoDiv.textContent = "❌ Média abaixo de 2,5: não há exame final, reprovado.";
        resultadoDiv.className = "reprovado";
        return;
    }

    const necessario = 15 - (media * 2);
    if (necessario > 10) {
        resultadoDiv.textContent = "❌ Mesmo com 10 no exame, não é possível alcançar a média final mínima.";
        resultadoDiv.className = "reprovado";
    } else {
        const notaFormatada = (necessario % 1 === 0) ? necessario : necessario.toFixed(1);
        resultadoDiv.textContent = `⚠️ Você precisa tirar pelo menos ${notaFormatada} no Exame Final.`;
        resultadoDiv.className = "atencao";
    }
}
