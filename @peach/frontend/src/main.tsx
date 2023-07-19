import { render } from 'preact';
import { App } from './app';
import './app.css';

render(App, document.querySelector('#root') || document.body);
