import { useContext } from 'react';
import styles from './App.module.scss';
import { LoginBox } from './component/LoginBox';
import { MessageList } from './component/MessageList';
import { SendMessageForm } from './component/SendMessageForm';
import { AuthContext } from './contexts/auth';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
      <MessageList />
      { !!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
}

export { App };
