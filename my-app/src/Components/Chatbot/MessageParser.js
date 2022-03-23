class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }
  parse(message) {
    const lowercase = message.toLowerCase();
    if (lowercase.includes("python")) {
      this.actionProvider.handlePythonQuiz();
    } else if (lowercase.includes("nodejs")) {
      this.actionProvider.handleNodeQuiz();
    } else if (lowercase.includes("sql")) {
      this.actionProvider.handleSqlQuiz();
    } else if (lowercase.includes("hi") || (lowercase.includes("hello"))) {
      this.actionProvider.handleHello();
    } else if (lowercase.includes("continue")) {
      this.actionProvider.handleContinue();
    } else if (lowercase.includes("thank")) {
      this.actionProvider.handleGreeting();
    } else {
      this.actionProvider.handleUnknown();
    }
  }
}
export default MessageParser;

