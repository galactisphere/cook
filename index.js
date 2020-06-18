// Index -- initial to run when app launches

const {
  app,
  BrowserWindow
} = require("electron");
const path = require("path");

// Enable live reload for all the files in the project directory
require("electron-reload")(__dirname);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 600,
    titleBarStyle: "hiddenInset",
    // frame: false,
    autoHideMenuBar: true,
    minWidth: 500,
    minHeight: 600
  });

  // Run node js server
  const server = require("./server/server")

  // Add handlebars
  const handlebars = require("./src/js/handlebars")

  // Define browser window as session
  // const mainSession = mainWindow.webContents.session

  // Load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "src/html/index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process code. You can also put them in separate files and import them here.

/*
expressApp.post('saveFile', function(req, res) {
  fs.writeFile("data.txt", req.body.data, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
      res.end("This message will be sent back to the client!");
  }); 
});
*/

// Print user path to console
console.log(app.getPath('userData'));