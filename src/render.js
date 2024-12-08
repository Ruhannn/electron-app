const MIN = document.getElementById("min-button");
const MAX = document.getElementById("max-button");
const RES = document.getElementById("restore-button");
const CLOSE = document.getElementById("close-button");
const HEADER = document.querySelector("header");


if (MIN) {
    MIN.addEventListener("click", () => {
        window.ipcRenderer.app.minimize();
    });
}

if (MAX) {
    MAX.addEventListener("click", () => {
        window.ipcRenderer.app.maximize();
    });
}

if (RES) {
    RES.addEventListener("click", () => {
        window.ipcRenderer.app.restore();
    });
}

if (CLOSE) {
    CLOSE.addEventListener("click", () => {
        window.ipcRenderer.app.close();
    });
}

window.ipcRenderer.on("window-state-changed", (event, isMaximized) => {
    if (isMaximized) {
        if (MAX) MAX.style.display = 'none';
        if (RES) RES.style.display = 'inline-block';
    } else {

        if (RES) RES.style.display = 'none';
        if (MAX) MAX.style.display = 'inline-block';
    }
    const HeaderBorder = isMaximized ? "0px 0px 0px 0px" : "var(--border-r) var(--border-r) 0px 0px"
    if (HEADER) HEADER.style.borderRadius = HeaderBorder
});

