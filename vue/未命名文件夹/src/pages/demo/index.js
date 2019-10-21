import Vue from 'vue';
import App from './index.vue';
const Main = Vue.component('app', App);
new Main({
    el: '#app'
});