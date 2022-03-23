import { createChatBotMessage } from "react-chatbot-kit";
import Options from './Options';
import Quiz from './Quiz';

const config = {
  initialMessages: [
    createChatBotMessage(`Dear User, Are You Ready For The Quiz?`),
    createChatBotMessage("Please Choose Your Language", {
      withAvatar: false,
      delay: 500,
      widget: "options"
    })
  ],
  state: {
    python: [],
    sql: [],
    node: []
  },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />
    },
    {
      widgetName: "python",
      widgetFunc: (props) => <Quiz {...props} />,
      props: {
        course: "Python"
      }
    },
    {
      widgetName: "NodeJS",
      widgetFunc: (props) => <Quiz {...props} />,
      props: {
        course: "NodeJS"
      }
    },
    {
      widgetName: "sql",
      widgetFunc: (props) => <Quiz {...props} />,
      props: {
        course: "Sql"
      }
    }
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#8080ff',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  }
}

export default config