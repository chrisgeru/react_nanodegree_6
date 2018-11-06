import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import * as PropTypes from "prop-types";

/*
This exercise will help you practice many of your newly aquired React skills.

The instructions are included in the `instructions.md` file.

<Header>
<SuperChat>
    <Chat>
        <ChatTitle>
        <ChatMessages>
        <ChatInput>
    <Chat>
        <ChatTitle>
        <ChatMessages>
        <ChatInput>
*/

function Header() {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">ReactND - Coding Practice</h1>
        </header>
    );
}

class SuperChat extends Component {
    state = {
        users: [{username: "Amy"}, {username: "John"}],
        messages: [
            {username: "Amy", text: "Hi, Jon!"},
            {username: "Amy", text: "How are you?"},
            {username: "John", text: "Hi, Amy! Good, you?"}
        ]
    };

    addMessage = inputData => {
        this.setState(oldState => ({
            messages: [
                ...oldState.messages,
                {username: inputData.user, text: inputData.message}
            ]
        }));
    };

    render() {
        return (
            <div className="container">
                {this.state.users.map(user => (
                    <Chat
                        key={user.username}
                        user={user}
                        messages={this.state.messages}
                        handleOnClick={this.addMessage}
                    />
                ))}
            </div>
        );
    }
}

class ChatTitle extends Component {
    render() {
        return (
            <div>
                <h2>Super Awesome Chat</h2>
                <div className="name sender">{this.props.username}</div>
            </div>
        );
    }
}

ChatTitle.propTypes = {user: PropTypes.string};

class ChatMessage extends Component {
    render() {
        return (
            <ul className="message-list">
                {this.props.messages.map((message, index) => (
                    <li
                        key={index}
                        className={
                            message.username === this.props.username
                                ? "message sender"
                                : "message recipient"
                        }
                    >
                        <p>{`${message.username}: ${message.text}`}</p>
                    </li>
                ))}
            </ul>
        );
    }
}

class ChatInput extends Component {
    state = {
        value: ""
    };

    handleChange = event => {
        this.setState({value: event.target.value});
    };

    handleClick = event => {
        event.preventDefault();
        const value = this.state.value;
        this.props.handleOnClick({user: this.props.username, message: value});
        this.setState({value: ""});
    };

    isDisabled = () => {
        return this.state.value === "";
    };

    render() {
        return (
            <div>
                <form className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your message..."
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn submit-button"
                            disabled={this.isDisabled()}
                            onClick={this.handleClick}
                        >
                            SEND
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

class Chat extends Component {
    render() {
        return (
            <div className="chat-window">
                <ChatTitle username={this.props.user.username}/>
                <ChatMessage
                    username={this.props.user.username}
                    messages={this.props.messages}
                />
                <ChatInput
                    username={this.props.user.username}
                    handleOnClick={this.props.handleOnClick}
                />
            </div>
        );
    }
}

class App extends Component {
    /*
    If the user did not type anything, he/she should not be
    allowed to submit.
    */

    render() {
        return (
            <div className="App">
                <Header/>
                <SuperChat/>
      </div>
    );
  }
}

export default App;
