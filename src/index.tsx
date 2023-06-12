import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import ScrollToTop from './components/App/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>,
);
