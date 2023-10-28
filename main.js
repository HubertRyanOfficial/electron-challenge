require("dotenv").config();

const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  const iconPath = path.join(__dirname, "/assets/icon.png");

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: iconPath,
    title: "Electron Challenge",
  });

  if (process.platform === "darwin") {
    app.dock.setIcon(iconPath);
  }

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform != "darwin") app.quit();
});

if (process.env.DEBUG == "true") {
  require("electron-reload")(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`),
  });
}
