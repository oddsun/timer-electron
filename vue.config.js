module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        "artifactName": "${name}-${os}-${version}.${ext}",
      }
    }
  },
  lintOnSave: true
}
