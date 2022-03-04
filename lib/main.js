const { AutoLanguageClient } = require("atom-languageclient");

class FortranLanguageClient extends AutoLanguageClient {
  getGrammarScopes() {
    return ["source.fortran"];
  }
  getLanguageName() {
    return "Fortran";
  }
  getServerName() {
    return "fortls";
  }

  startServerProcess(projectPath) {
    const config = { win32: "win", darwin: "mac", linux: "linux" }[
      process.platform
    ];
    if (config == null) {
      throw Error(
        `${this.getServerName()} not supported on ${process.platform}`
      );
    }
    let args = ["--variable_hover", "--notify_init"];
    // const extraArgs = this.parse.atom("fortran-lsp.extra");
    return super.spawn("fortls", args, { cwd: projectPath });
  }
}

export default new FortranLanguageClient();
