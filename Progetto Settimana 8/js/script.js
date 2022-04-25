"use strict";
class Persona {
    constructor(nome, cognome, eta) {
        this.nome = nome;
        this.cognome = cognome;
        this.eta = eta;
    }
}
class Users extends Persona {
    constructor(nome, cognome, eta, nro_telefono) {
        super(nome, cognome, eta);
        // this._nro_telefono = nro_telefono;
        this.credito = 0;
        this.numeroChiamate = 0;
        this._nro_telefono = this.validateNumber(nro_telefono) ? nro_telefono : '';
        this.id = arr.length + 1;
    }
    validateNumber(number) {
        return number.length == 10;
    }
    get nro_telefono() {
        return this._nro_telefono;
    }
    set nro_telefono(telefono) {
        try {
            if (this.validateNumber(telefono)) {
                this._nro_telefono = telefono;
            }
            else {
                throw new Error("I numeri da digitare sono 10!");
            }
        }
        catch (error) {
            this._nro_telefono = '';
            console.log(error);
            // throw new Error(error);
        }
    }
    // metodo ricarica il telefonino. 
    ricarica(unaRicarica) {
        return this.credito += unaRicarica;
    }
    // metodo che effettua una chiamata di durata in minuti specificata dal parametro esplicito.
    // Tale metodo dovra' aggiornare la carica disponibile, ed incrementare la memoria contenente il numero di chiamate effettuate dal telefonino. 
    // Si assuma un costo di 0.20 euro per ogni minuto di chiamata,
    chiamata(minutiDurata) {
        try {
            if (this.credito < 0.2) {
                throw new Error("Il tuo credito è insufficiente!");
            }
            else {
                let i;
                for (i = 0; i < minutiDurata; i++) {
                    this.credito -= 0.2;
                }
                this.numeroChiamate++;
            }
        }
        catch (error) {
            console.log(error);
        }
        return `Credito attuale: ${this.credito}. Numero chiamate: ${this.numeroChiamate}`;
    }
    // metodo che restituisce il valore della carica/credito disponibile.
    numero404() {
        return `Credito disponibile ${this.credito}€`;
    }
    // metodo che restituisce il valore della variabile d'istanza numeroChiamate.
    getNumeroChiamate() {
        return `Le chiamate effettuate fin'ora sono: ${this.numeroChiamate}`;
    }
    // metodo che azzera la variabile contenente il numero di chiamate effettuate dal telefonino.
    azzeraChiamate() {
        this.numeroChiamate = 0;
        return `Numero chiamate azzerato`;
    }
}
// Le istanze FirstUser-SecondUser-ThirdUser della classe User.
// Provare i metodi e verificare il saldo residuo di ogni utente e quante chiamate sono state effettuate.
//let FirstUser = new Users('Mario', 'Rossi', 20, '15447682');
// let SecondUser = new Users('Ginevra', 'Bianchi', 34, '4894725849');
// let ThirdUser = new Users('Miriam', 'Lasti', 20, '7258458449');
let arr = [];
// console.log(FirstUser);
// console.log(FirstUser.ricarica(5));
// console.log(FirstUser.chiamata(2));
// console.log(FirstUser);
let identifica = arr.length;
document.addEventListener('DOMContentLoaded', function () {
    //home
    if (document.location.pathname === '/index.html' || '/') {
        aggiungi();
    }
    //area riservata
    if (document.location.pathname === '/areaRiservata.html') {
        let utenteAttivo = localStorage.getItem('utente');
        if (arr !== null) {
            let varogg = JSON.parse(utenteAttivo);
            let identifica = arr.filter(ele => ele.id == varogg.id);
            console.log(identifica);
            console.log(arr);
            let btn5 = document.querySelector('#cinque');
            btn5 === null || btn5 === void 0 ? void 0 : btn5.addEventListener('click', () => {
            });
        }
    }
});
function aggiungi() {
    let n = document.querySelector('#nome');
    let c = document.querySelector('#cognome');
    let e = document.querySelector('#eta');
    let t = document.querySelector('#telefono');
    let alert1 = document.querySelector('#alert1');
    alert1.style.display = 'none';
    let btn = document.querySelector('#bottone');
    btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', () => {
        if (n.value.trim() !== '' && c.value.trim() !== '' && e.value.trim() !== '' && t.value.trim() !== '') {
            if (e.value < '18') {
                alert1.innerText = 'Per accedere alla tariffa devi essere maggiorenne';
                alert1.style.display = 'block';
                setTimeout(() => {
                    alert1.style.display = 'none';
                }, 2500);
            }
            else if (t.value.length !== 10) {
                alert1.innerHTML = 'Il numero inserito deve contenere 10 cifre!';
                alert1.style.display = 'block';
                setTimeout(() => {
                    alert1.style.display = 'none';
                }, 2500);
            }
            else {
                identifica++;
                let tbody = document.querySelector('tbody');
                let tr = document.createElement('tr');
                tr.innerHTML = `<td scope="row">${identifica}</td>
                             <td>${n.value}</td>
                             <td>${c.value}</td>
                             <td>${e.value}</td>
                             <td>${t.value}</td>
                             <td><a href="areaRiservata.html"><button id="riservata" type="button" class="btn btn-success form-control">Area riservata</button></a></td>
                             <td><button type="button" id="bottoneElimina" class="btn btn-danger w-auto" onClick="rimuovi(identifica)">X</button></td>`;
                tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(tr);
                arr.push(new Users(n.value, c.value, +e.value, t.value));
                localStorage.setItem('utente', JSON.stringify(arr));
                n.value = '';
                c.value = '';
                e.value = '';
                t.value = '';
            }
        }
        else {
            alert1.innerHTML = 'Ricorda di inserire tutti i campi';
            alert1.style.display = 'block';
            setTimeout(() => {
                alert1.style.display = 'none';
            }, 2500);
        }
    });
}
;
function rimuovi(id) {
    arr.forEach(ele => {
        let p = arr.find(() => id == ele.id);
        console.log(p);
    });
}
console.log(arr);
// //FirstUser.nro_telefono = '2514545051'
