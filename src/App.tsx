import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import Router from './Router';
import { darkTheme, lightTheme } from './themes/theme';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  ${reset}
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor}
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const ThemeToggleButton = styled.div`
  position: fixed;
  top: 20px;
  right: 40px;

  width: 50px;
  height: 50px;

  cursor: pointer;
`;

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <ThemeToggleButton onClick={toggleTheme}>
          {theme === 'dark' ? (
            <FontAwesomeIcon icon={faToggleOff} size="2x" />
          ) : (
            <FontAwesomeIcon icon={faToggleOn} size="2x" />
          )}
        </ThemeToggleButton>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
