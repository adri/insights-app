import codePush from "react-native-code-push";

export default function updateCheck() {
  codePush.sync({
    deploymentKey: '43ENH2WbHU9EgYYtD7ofoMR7qRwNE1M-WAV0l',
    updateDialog: false,
    installMode: codePush.InstallMode.ON_NEXT_RESTART
  });
}

