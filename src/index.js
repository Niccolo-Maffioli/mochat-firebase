
import './styles/main.scss';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDkwB48yEuVYtRQ_d_7u9Xo_NE2Ybe-CMQ",
    authDomain: "mochat-web1a.firebaseapp.com",
    projectId: "mochat-web1a",
    storageBucket: "mochat-web1a.appspot.com",
    messagingSenderId: "768409390635",
    appId: "1:768409390635:web:7be5bc39fae1c06ad7246e"
  };
  // Initialize Firebase

document.addEventListener('DOMContentLoaded', () => {
    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
    const collection = db.collection('chat');
    const ul = document.querySelector('ul');
    const form = document.querySelector('form');

    collection.orderBy('timestamp').onSnapshot((snapshot) => {
        /* console.log(snapshot.docs); */
        const json = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() } /* la sintassi spred prende un oggetto o un array e lo scompone nei suoi vari elementi */
        });

        const elements = json.map(doc => `<li><b>${doc.user}:</b> ${doc.text}</li>`)
        ul.innerHTML = elements.join('');
    });

    /* non usare il comportamento standard della form */
    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const obj = {
            timestamp: new Date().toISOString(),
            user: document.querySelector('#username').value,
            text: event.target.new.value
        }

        collection.doc().set(obj);

        event.target.reset();
    });

});