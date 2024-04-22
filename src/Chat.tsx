import React from 'react'


const Chat = ({ sender, content, timestamp, self }) => {
    return (
        <div className={`msg-bubble ${self ? 'right-msg' : 'left-msg'}`}>

            <div className="msg-info">
                <span className='msg-info-name'>{sender}</span>
                <span className='msg-info-time'>{timestamp}</span>
            </div>
            <span className='msg-text'>{content}</span>
        </div>
    );
};

export default Chat;