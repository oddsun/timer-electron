module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      // https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/1647
      // My temp workaround is to change Electron Builder config to customFileProtocol: './'.
      // and win.loadURL(file://${__dirname}/index.html).
      customFileProtocol: "./",
      nodeIntegration: true,
      builderOptions: {
        artifactName: "${name}-${os}-v${version}.${ext}",
        linux: {
          target: "deb",
        },
      },
    },
  },
  lintOnSave: true,
};
// https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/1787
// remove main field from v3-alpha vue-cli-plugin-electron-builder
