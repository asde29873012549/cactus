import React from 'react';
import ReactDOM from 'react-dom/client'
import {createGlobalStyle} from 'styled-components'
import App from './App'
import {Provider} from 'react-redux'
import {store} from './app/store'

const GlobalStyle = createGlobalStyle `
body {
	margin:0;
	padding:0;
	background-color:white;
	font-family:YuGothic, sans-serif;
	color:#1C1C1C;
	font-size:20px;
}
`

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<>
		<Provider store={store}>
			<GlobalStyle />
			<App />
		</Provider>
	</>
);



