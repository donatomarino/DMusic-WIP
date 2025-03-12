# DMusic-WIP

```
my-react-app/
│
├── public/
│   └── images/
│         └── favicon.png
│
└── src/
    ├── components/
    │    ├── GeneralComponents/
    │    │    ├── Button.js
    │    │    ├── Footer.js   
    │    │    ├── Input.js
    │    │    └── Label.js
    │    │                
    │    ├── HomeComponents/
    │    │    ├── LayoutComponents/
    │    │    │      ├── HeaderHome.js                 # Header main page
    │    │    │      ├── PlayerComponent.js            # Reproductor musical
    │    │    │      ├── Search.js                     # Barra de busqueda
    │    │    │      └── SideMenu.js                   # Menu lateral
    │    │    │ 
    │    │    └── MainContent/
    │    │            ├── ContentHome.js               # Main content
    │    │            ├── Explore.js
    │    │            ├── Library.js
    │    │            ├── Trends.js
    │    │            └── UserData.js
    │    │
    │    ├── LoginComponents/           
    │    │    ├── Checkbox.js
    │    │    ├── FormField.js
    │    │    ├── Header.js
    │    │    └── Radio.js        
    │    │
    │    └── RegistrationComponents/
    │         ├── FirstRegister.js
    │         ├── Lopd.js
    │         └── SecondRegister.js 
    │            
    ├── pages/
    │    ├── HomePages/
    │    │    └── HomePage.js
    │    │  
    │    ├── LoginPages/
    │    │    ├── ConfirmRecoveryPage.js
    │    │    ├── LoginPage.js
    │    │    └── RecoveryPassPage.js
    │    │
    │    └── RegisterPage        
    │         └── RegisterPage.js
    │
    ├── styles/
    │    ├── general/
    │    │   └── General.css
    │    │
    │    ├── home/
    │    │   ├── Content.css
    │    │   ├── Layout.css
    │    │   └── UserData.css
    │    │
    │    └── login/
    │        ├── login.css
    │        └── lopd.css
    │ 
    ├── utils/
    │    ├── context/
    │    │     ├── GeneralContext
    │    │     │    ├── ComponentContext.js
    │    │     │    ├── LoginContext.js
    │    │     │    └── MessageContext.js 
    │    │     │
    │    │     ├── HomeContext
    │    │     │    ├── SearchContext.js
    │    │     │    └── SongContext.js
    │    │     │
    │    │     └── RegisterContext
    │    │          ├── DataContext.js
    │    │          └── LopdContext.js
    │    │
    │    ├── general
    │    │     └── validatePsw.js
    │    │    
    │    └── hooks
    │          ├── GeneralHooks
    │          │    ├── useFetch.js
    │          │    ├── useNavigation.js
    │          │    ├── usePlayPlaylist.js
    │          │    └── usePlaySong.js 
    │          │
    │          ├── HomeHooks
    │          │    ├── LayoutHooks/
    │          │    │    ├── useHeaderHome.js                          
    │          │    │    ├── useSearch.js                     
    │          │    │    └── useSideMenu.js                   
    │          │    │ 
    │          │    └── MainContent/
    │          │         ├── useContentHome.js
    │          │         ├── useExplore.js
    │          │         ├── useLibrary.js
    │          │         ├── useTrends.js
    │          │         └── useUserData.js
    │          │   
    │          ├── LoginHooks
    │          │    ├── SearchContext.js
    │          │    └── SongContext.js
    │          │
    │          └── RegisterHooks
    │               ├── useFirstRegister.js
    │               ├── useLopd.js
    │               └── useSecondRegister.js
    │           
    ├── App.js
    │
    └── index.js
```