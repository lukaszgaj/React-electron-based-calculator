const {app, BrowserWindow, Menu, shell} = require('electron');

let menu;
let template;
let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support'); // eslint-disable-line
    sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
    require('electron-debug')(); // eslint-disable-line global-require
    const path = require('path'); // eslint-disable-line
    const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
    require('module').globalPaths.push(p); // eslint-disable-line
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});


const installExtensions = () => {
    if (process.env.NODE_ENV === 'development') {
        const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

        const extensions = [
            'REACT_DEVELOPER_TOOLS',
            'REDUX_DEVTOOLS'
        ];
        const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
        return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload)));
    }

    return Promise.resolve([]);
};

app.on('ready', () =>
    installExtensions()
        .then(() => {
            mainWindow = new BrowserWindow({
                resizable: false,
                show: false,
                width: 410,
                height: 430
            });

            mainWindow.loadURL(`file://${__dirname}/app.html`);

            mainWindow.webContents.on('did-finish-load', () => {
                mainWindow.show();
                mainWindow.focus();
            });

            mainWindow.on('closed', () => {
                mainWindow = null;
            });

            if (process.env.NODE_ENV === 'development') {
                mainWindow.openDevTools();
                mainWindow.webContents.on('context-menu', (e, props) => {
                    const {x, y} = props;

                    Menu.buildFromTemplate([{
                        label: 'Inspect element',
                        click() {
                            mainWindow.inspectElement(x, y);
                        }
                    }]).popup(mainWindow);
                });
            }

            if (process.env.NODE_ENV === 'development') {
                template = [{
                    label: '&File',
                    submenu: [{
                        label: '&Close',
                        accelerator: 'Ctrl+W',
                        click() {
                            mainWindow.close();
                        }
                    }]
                }, {
                    label: '&View',
                    submenu: ([{
                        label: '&Reload',
                        accelerator: 'Ctrl+R',
                        click() {
                            mainWindow.webContents.reload();
                        }
                    }, {
                        label: 'Toggle &Full Screen',
                        accelerator: 'F11',
                        click() {
                            mainWindow.setFullScreen(!mainWindow.isFullScreen());
                        }
                    }, {
                        label: 'Toggle &Developer Tools',
                        accelerator: 'Alt+Ctrl+I',
                        click() {
                            mainWindow.toggleDevTools();
                        }
                    }])
                }];
                menu = Menu.buildFromTemplate(template);
                mainWindow.setMenu(menu);
            } else {
                template = [{
                    label: '&File',
                    submenu: [{
                        label: '&Close',
                        accelerator: 'Ctrl+W',
                        click() {
                            mainWindow.close();
                        }
                    }]
                }, {
                    label: '&View',
                    submenu: ([{
                        label: '&Reload',
                        accelerator: 'Ctrl+R',
                        click() {
                            mainWindow.webContents.reload();
                        }
                    }])
                }];
                menu = Menu.buildFromTemplate(template);
                mainWindow.setMenu(menu);
            }
        }));
