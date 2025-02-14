// import { Header } from './components/GeneralComponents/Header.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from './pages/LoginPages/LoginPage.js';
import { RecoveryPassPage } from './pages/LoginPages/RecoveryPassPage.js';
import { ConfirmRecoveryPage } from './pages/LoginPages/ConfirmRecoveryPage.js';
import { RegisterPage } from "./pages/LoginPages/RegisterPage.js";
import { RegisterProvider } from './utils/contexto/RegisterContext.js';
import { MessageProvider } from "./utils/contexto/MessageContext.js";
import { DataProvider } from './utils/contexto/DataContext.js'
import { LopdProvider } from "./utils/contexto/LopdContext.js";
import { HomePage } from "./pages/HomePages/HomePage.js";
import { SongProvider } from "./utils/contexto/SongContext.js";
// import { Header } from "./components/GeneralComponents/Header.js"
import { LoginProvider } from './utils/contexto/LoginContext.js'
import { ComponentProvider } from './utils/contexto/ComponentContext.js'
import Lopd from "./pages/LoginPages/LopdPage.js";
import './styles/general/General.css';

function App() {
  return (
    <Router>
      <MessageProvider>
        <LoginProvider>
          <RegisterProvider>
            <DataProvider>
              <LopdProvider>
                {/* <Header> */}
                <Routes>
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/user/forgot-password' element={<RecoveryPassPage />} />
                  <Route path='/user/confirm-recovery/:token' element={<ConfirmRecoveryPage />} />
                  <Route path='/user/register' element={<RegisterPage />} />
                  <Route path='/user/lopd' element={<Lopd />} />
                </Routes>
                {/* </Header> */}
              </LopdProvider>
            </DataProvider>
          </RegisterProvider>
          <ComponentProvider>
            <SongProvider>
              <Routes>
                <Route path='/' element={<HomePage />} />
              </Routes>
            </SongProvider>
          </ComponentProvider>
        </LoginProvider>
      </MessageProvider>
    </Router>
  );
}

export default App;
