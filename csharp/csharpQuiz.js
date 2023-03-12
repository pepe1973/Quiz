'use strict';
import { adatok } from './csharp.js';
import { utolsoElem } from '../functions/utolsoElem.js';
import { magyarazoszoveg } from '../functions/magyarazoSzoveg.js';

let slider = document.getElementById('slider');
const lapozo = document.getElementById('lapozo');
lapozo.addEventListener('click', lapozas);

const megoldas = [];
let szamlalo = 0;

function lapozas() {
    if (szamlalo < adatok.length + 1) {
        let kerdesek = document.getElementById('kerdesek');
        let ujKerdesek = document.createElement('div');
        ujKerdesek.setAttribute('id', 'kerdesek');

        if (szamlalo < adatok.length) {
            lapozo.style.display = 'none';

            let kerdes = document.createElement('h1');
            let kerdesTextNode = document.createTextNode(
                `${szamlalo + 1}. ${adatok[szamlalo].kerdes}`
            );
            kerdes.appendChild(kerdesTextNode);
            ujKerdesek.appendChild(kerdes);

            if (adatok[szamlalo].kep) {
                let kep = document.createElement('img');
                kep.src = adatok[szamlalo].kep;
                ujKerdesek.appendChild(kep);
            }

            if (adatok[szamlalo].tipus == 'radio') {
                let form = document.createElement('form');
                for (let i = 0; i < adatok[szamlalo].valaszok.length; i++) {
                    let tarto = document.createElement('div');
                    tarto.setAttribute('id', 'tarto');
                    let input = document.createElement('input');
                    input.setAttribute('type', 'radio');
                    input.setAttribute('id', `radio_${szamlalo}_${i}`);
                    input.setAttribute('name', `radio_${szamlalo}`);
                    input.setAttribute(
                        'value',
                        `${adatok[szamlalo].valaszok[i]}`
                    );
                    tarto.appendChild(input);
                    // Label elemek a radio button elemekhez
                    let label = document.createElement('label');
                    label.setAttribute('for', `radio_${szamlalo}_${i}`);
                    let labelText = document.createTextNode(
                        `${adatok[szamlalo].valaszok[i]}`
                    );
                    label.appendChild(labelText);
                    tarto.appendChild(label);
                    form.appendChild(tarto);
                }

                ujKerdesek.appendChild(form);

                let kitolt = document.createElement('button');
                kitolt.setAttribute('type', 'button');
                let kitoltSzoveg = 'Kiértékel';
                let kitoltTextNode = document.createTextNode(kitoltSzoveg);
                kitolt.appendChild(kitoltTextNode);
                kitolt.addEventListener('click', () => {
                    const tomb = document.getElementsByName(
                        `radio_${szamlalo - 1}`
                    );
                    console.log(tomb);
                    for (let i = 0; i < tomb.length; i++) {
                        let elem = document.getElementById(
                            `radio_${szamlalo - 1}_${i}`
                        );

                        if (elem.checked) {
                            console.log(elem.value);
                            console.log(adatok[szamlalo - 1].helyes);
                            if (adatok[szamlalo - 1].helyes === elem.value) {
                                let helyes = document.createElement('p');
                                helyes.setAttribute('id', 'helyes');
                                let helyesTextNode =
                                    document.createTextNode('Helyes megoldás!');
                                helyes.appendChild(helyesTextNode);
                                ujKerdesek.appendChild(helyes);
                            } else {
                                let helytelen = document.createElement('p');
                                helytelen.setAttribute('id', 'helytelen');
                                let helytelenTextNode = document.createTextNode(
                                    `Helytelen megoldás! A helyes megoldás: ${
                                        adatok[szamlalo - 1].helyes
                                    }`
                                );
                                helytelen.appendChild(helytelenTextNode);
                                ujKerdesek.appendChild(helytelen);
                            }
                            magyarazoszoveg(
                                kitolt,
                                szamlalo,
                                lapozo,
                                adatok,
                                ujKerdesek
                            );
                        }
                    }
                });

                ujKerdesek.appendChild(kitolt);

                if (szamlalo < adatok.length + 1 && szamlalo > 0) {
                    utolsoElem(szamlalo, megoldas, adatok);
                }

                slider.replaceChild(ujKerdesek, kerdesek);
            } else if (adatok[szamlalo].tipus == 'check') {
                let form = document.createElement('form');
                for (let i = 0; i < adatok[szamlalo].valaszok.length; i++) {
                    // Tartóelem az input elemekhez
                    let tarto = document.createElement('div');
                    tarto.setAttribute('id', 'tarto');
                    // Radio button elemek
                    let input = document.createElement('input');
                    input.setAttribute('type', 'checkbox');
                    input.setAttribute('id', `check_${szamlalo}_${i}`);
                    input.setAttribute('name', `radio_${szamlalo}`);
                    input.setAttribute(
                        'value',
                        `${adatok[szamlalo].valaszok[i]}`
                    );
                    tarto.appendChild(input);
                    // Label elemek a radio button elemekhez
                    let label = document.createElement('label');
                    label.setAttribute('for', `check_${szamlalo}_${i}`);
                    let labelText = document.createTextNode(
                        `${adatok[szamlalo].valaszok[i]}`
                    );
                    label.appendChild(labelText);
                    tarto.appendChild(label);
                    form.appendChild(tarto);
                }
                ujKerdesek.appendChild(form);

                let kitolt = document.createElement('button');
                kitolt.setAttribute('type', 'button');
                let kitoltSzoveg = 'Kiértékel';
                let kitoltTextNode = document.createTextNode(kitoltSzoveg);
                kitolt.appendChild(kitoltTextNode);
                kitolt.addEventListener('click', () => {
                    const tomb = document.getElementsByName(
                        `radio_${szamlalo - 1}`
                    );
                    let helyesMegoldas = 0;
                    console.log(tomb);
                    for (let i = 0; i < tomb.length; i++) {
                        let elem = document.getElementById(
                            `check_${szamlalo - 1}_${i}`
                        );

                        if (elem.checked) {
                            console.log(elem.value);
                            console.log(adatok[szamlalo - 1].helyes);
                            for (
                                let k = 0;
                                k < adatok[szamlalo - 1].helyes.length;
                                k++
                            ) {
                                if (
                                    adatok[szamlalo - 1].helyes[k] ===
                                    elem.value
                                ) {
                                    helyesMegoldas++;
                                }
                            }
                        }
                    }
                    console.log(helyesMegoldas);
                    if (helyesMegoldas == adatok[szamlalo - 1].helyes.length) {
                        let helyes = document.createElement('p');
                        helyes.setAttribute('id', 'helyes');
                        let helyesTextNode =
                            document.createTextNode('Helyes megoldás!');
                        helyes.appendChild(helyesTextNode);
                        ujKerdesek.appendChild(helyes);
                    } else {
                        let helytelen = document.createElement('p');
                        helytelen.setAttribute('id', 'helytelen');
                        let helytelenTextNode = document.createTextNode(
                            `Helytelen megoldás! A helyes megoldás: ${
                                adatok[szamlalo - 1].helyes
                            }`
                        );
                        helytelen.appendChild(helytelenTextNode);
                        ujKerdesek.appendChild(helytelen);
                    }
                    magyarazoszoveg(
                        kitolt,
                        szamlalo,
                        lapozo,
                        adatok,
                        ujKerdesek
                    );
                });

                ujKerdesek.appendChild(kitolt);

                if (szamlalo < adatok.length + 1 && szamlalo > 0) {
                    utolsoElem(szamlalo, megoldas, adatok);
                }

                slider.replaceChild(ujKerdesek, kerdesek);
            }
        } else {
            const tomb = document.getElementsByName(`radio_${szamlalo - 1}`);
            console.log(szamlalo - 1);

            if (adatok[szamlalo - 1].tipus == 'radio') {
                for (let i = 0; i < tomb.length; i++) {
                    let elem = document.getElementById(
                        `radio_${szamlalo - 1}_${i}`
                    );

                    if (elem.checked) {
                        megoldas.push(`${adatok[szamlalo - 1].valaszok[i]}`);
                    }
                }
            } else if (adatok[szamlalo - 1].tipus == 'check') {
                let checkMegoldas = [];
                for (let i = 0; i < tomb.length; i++) {
                    let elem = document.getElementById(
                        `check_${szamlalo - 1}_${i}`
                    );

                    if (elem.checked) {
                        checkMegoldas.push(
                            `${adatok[szamlalo - 1].valaszok[i]}`
                        );
                    }
                }
                megoldas.push(checkMegoldas);
            }

            let JoValasz = 0;
            let fejlec = document.createElement('h1');
            let fejlecTextNode = document.createTextNode('Összegzés');
            fejlec.appendChild(fejlecTextNode);
            ujKerdesek.appendChild(fejlec);
            let osszegzes = document.createElement('ol');
            for (let i = 0; i < adatok.length; i++) {
                let li = document.createElement('li');
                if (adatok[i].tipus == 'radio') {
                    if (megoldas[i] === adatok[i].helyes) {
                        JoValasz++;
                        let liSzoveg = megoldas[i] + ' - helyes válasz';
                        let liTextNode = document.createTextNode(liSzoveg);
                        li.style.color = 'green';
                        li.appendChild(liTextNode);
                    } else {
                        let liSzoveg =
                            megoldas[i] +
                            ' - helytelen válasz. Helyes válasz: ' +
                            adatok[i].helyes;
                        let liTextNode = document.createTextNode(liSzoveg);
                        li.style.color = 'red';
                        li.appendChild(liTextNode);
                    }
                } else if (adatok[i].tipus == 'check') {
                    let joCheck = 0;
                    for (let j = 0; j < megoldas[i].length; j++) {
                        if (megoldas[i][j] == adatok[i].helyes[j]) {
                            joCheck++;
                        }
                    }

                    if (joCheck == adatok[i].helyes.length) {
                        JoValasz++;
                        let liSzoveg = megoldas[i] + ' - helyes válasz';
                        let liTextNode = document.createTextNode(liSzoveg);
                        li.style.color = 'green';
                        li.appendChild(liTextNode);
                    } else {
                        let liSzoveg =
                            megoldas[i] +
                            ' - helytelen válasz. Helyes válasz: ' +
                            adatok[i].helyes;
                        let liTextNode = document.createTextNode(liSzoveg);
                        li.style.color = 'red';
                        li.appendChild(liTextNode);
                    }
                }

                osszegzes.appendChild(li);
            }
            ujKerdesek.appendChild(osszegzes);
            let joMegoldas = document.createElement('p');
            let joMegoldasSzoveg = `Helyes megoldások száma: ${adatok.length}/${JoValasz}`;
            let joMegoldasTextNode = document.createTextNode(joMegoldasSzoveg);
            joMegoldas.appendChild(joMegoldasTextNode);
            ujKerdesek.appendChild(joMegoldas);
            slider.replaceChild(ujKerdesek, kerdesek);
            lapozo.style.display = 'none';
        }
    }

    szamlalo++;
}
