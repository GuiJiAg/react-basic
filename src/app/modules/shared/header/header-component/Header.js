import logo from './../../../../assets/logo.svg';

export default function Header() {
    return (
        <header className="App-header">
            <a
                href='https://beta.es.reactjs.org/learn/tutorial-tic-tac-toe'
            >
                <img src={logo} className="App-logo" alt="logo" />
            </a>
        </header>
    )
}