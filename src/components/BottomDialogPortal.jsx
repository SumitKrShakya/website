import { createPortal } from 'react-dom';
import AnimatedCharacter from './AnimatedCharacter';
import SpeechBubbleDialog from './SpeechBubbleDialog';
import './BottomDialogPortal.css';

function BottomDialogPortal({ showSpeech, speechMessage, onTypingComplete, children }) {
  return createPortal(
    <div className="bottom-dialog-portal">
      <div className="bottom-dialog-inner">
        <AnimatedCharacter
          state={showSpeech ? 'talking' : 'idle'}
          showSpeechBubble={false}
        />
        {children ? (
          children
        ) : (
          <SpeechBubbleDialog
            message={speechMessage}
            show={showSpeech}
            onTypingComplete={onTypingComplete}
          />
        )}
      </div>
    </div>,
    document.body
  );
}

export default BottomDialogPortal;
