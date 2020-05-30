import { h, render } from 'preact';

const App = <h1>Peach</h1>;

render(App, document.querySelector('#root') || document.body);
