


const Chat = ({ sender, content, timestamp, self }) => {
    if (sender !== 'SYSTEM') {
        return (

            <div className={`msg-bubble ${self ? 'right-msg' : 'left-msg'}`}>
                <div className="msg-info">
                    <span className='msg-info-name'>{sender}</span>
                    <span className='msg-info-time'>{timestamp}</span>
                </div>
                <span className='msg-text'>{content}</span>
            </div>)
    } else {
        return (

            <div className="flex-container-sys">
                <hr className="line" />
                <span className="text-content">{content}</span>
                <hr className="line" />
            </div>

        )
    }
};

export default Chat;