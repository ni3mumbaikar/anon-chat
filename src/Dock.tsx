import SendIcon from '@mui/icons-material/Send';

const Dock = ({ msgInputEvent, typedMsg, onSend }) => {

    function onInputChange(e) {
        msgInputEvent(e.target.value)
    }

    function onEnterPressed(e) {
        if (e.key === 'Enter') {
            onSend()
        }
    }

    function sendMsgFromDock(e) {
        onSend()
    }

    return (
        <div className='dock'>
            <input type="text" onKeyDown={onEnterPressed} placeholder='Message' name="message" id="msg-input" value={typedMsg} onChange={onInputChange} />
            <button className="button" onClick={sendMsgFromDock} id='send-msg-btn'>
                <SendIcon className='send-icon'></SendIcon>
            </button>
        </div>
    )
}

export default Dock;
