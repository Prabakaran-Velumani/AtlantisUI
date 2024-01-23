import './assets/css/App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'contexts/auth.context';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
let user = localStorage.getItem("user");
user = JSON.parse(user);

root.render(
  <AuthProvider userData={user}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
);
