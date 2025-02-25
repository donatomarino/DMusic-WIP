export const Header = ({ onClick, description }) => {
    return (
        <div className='Login__HeaderContainer'>
            <h1 className='Login__HeaderContainer--Title' onClick={onClick}>DM<span>usic</span></h1>
            <h2 className='Login__HeaderContainer--Description'>{description}</h2>
        </div>
    );
}