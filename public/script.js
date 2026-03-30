const toggleBtn = document.getElementById("theme-toggle");
const root = document.documentElement;

// Load saved theme (default to dark)
if (localStorage.getItem("theme") === "light") {
    root.removeAttribute("data-theme");
    toggleBtn.textContent = "🌙 Dark";
} else {
    root.setAttribute("data-theme", "dark");
    toggleBtn.textContent = "☀️ Light";
}

toggleBtn.addEventListener("click", () => {
    if (root.getAttribute("data-theme") === "dark") {
        root.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙 Dark";
    } else {
        root.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️ Light";
    }
});

const codeBlocks = document.querySelectorAll("pre code");

codeBlocks.forEach((code) => {
    const text = code.innerText.trim();
    const pre = code.parentElement;
    if (!pre) return;
    if (pre.querySelector(".copy-btn")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-btn";
    button.textContent = "Copy";

    button.addEventListener("click", async () => {
        const isCommandBlock = /^\$ /m.test(text);
        const cleaned = isCommandBlock ? text.replace(/^\$ ?/gm, "").trim() : text;
        try {
            await navigator.clipboard.writeText(cleaned);
            button.textContent = "Copied";
            setTimeout(() => {
                button.textContent = "Copy";
            }, 1500);
        } catch (error) {
            button.textContent = "Error";
            setTimeout(() => {
                button.textContent = "Copy";
            }, 1500);
        }
    });

    pre.appendChild(button);
});
