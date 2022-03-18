class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }
  //takes in a mesaage and logs it in the screen
  parse(message) {
    const lowercase = message.toLowerCase();
    if (lowercase.includes("python")) {
      this.actionProvider.handlePythonQuiz();
    } 
    
    // else if (lowercase.includes("docker")) {
    //   this.actionProvider.handleDockerQuiz();
    // } else if (lowercase.includes("sql")) {
    //   this.actionProvider.handleSqlQuiz();
    // } 
    
    else if (lowercase.includes("continue")) {
      this.actionProvider.handleContinue();
    } else if (lowercase.includes("thank")) {
      this.actionProvider.handleGreeting();
    } else if (lowercase.includes("score")) {
      this.actionProvider.handleScoreBoard();
    } else {
      this.actionProvider.handleUnknown();
    }
  }
}
export default MessageParser;

  