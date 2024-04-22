import SendIcon from '@mui/icons-material/Send';

export default function Dock() {
    return (
        <div className='dock'>
            <input type="text" placeholder='Message' name="message" id="msg-input" />
            <button className="button" id='send-msg-btn'>
                <SendIcon className='send-icon'></SendIcon>
            </button>
        </div>
    )
}
