import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from './pages/LoginPages/LoginPage.js';
import { RecoveryPassPage } from './pages/LoginPages/RecoveryPassPage.js';
import { ConfirmRecoveryPage } from './pages/LoginPages/ConfirmRecoveryPage.js';
import { RegisterPage } from "./pages/RegisterPage/RegisterPage.js";
import { MessageProvider } from "./utils/contexto/GeneralContext/MessageContext.js";
import { DataProvider } from './utils/contexto/RegisterContext/DataContext.js'
import { LopdProvider } from "./utils/contexto/RegisterContext/LopdContext.js";
import { HomePage } from "./pages/HomePages/HomePage.js";
import { SongProvider } from "./utils/contexto/HomeContext/SongContext.js";
import { LoginProvider } from './utils/contexto/GeneralContext/LoginContext.js'
import { ComponentProvider } from './utils/contexto/GeneralContext/ComponentContext.js'
import { SearchProvider } from "./utils/contexto/HomeContext/SearchContext.js";
import Lopd from "./pages/RegisterPage/LopdPage.js";
import './styles/general/General.css';

function App() {
  return (
    <Router>
      <DataProvider>
        <ComponentProvider>
          <MessageProvider>
            <LoginProvider>
              <LopdProvider>
                <SongProvider>
                  <SearchProvider>
                    <Routes>
                      <Route path='/login' element={<LoginPage />} />
                      <Route path='/user/forgot-password' element={<RecoveryPassPage />} />
                      <Route path='/user/confirm-recovery/:token' element={<ConfirmRecoveryPage />} />
                      <Route path='/user/register' element={<RegisterPage />} />
                      <Route path='/user/lopd' element={<Lopd />} />
                      <Route path='/' element={<HomePage />} />
                    </Routes>
                  </SearchProvider>
                </SongProvider>
              </LopdProvider>
            </LoginProvider>
          </MessageProvider>
        </ComponentProvider>
      </DataProvider>
    </Router>
  );
}

export default App;
