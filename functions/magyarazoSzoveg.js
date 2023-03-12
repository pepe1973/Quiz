export function magyarazoszoveg(kitolt, szamlalo, lapozo, adatok, ujKerdesek) {
    kitolt.style.display = 'none';
    if (szamlalo < adatok.length) {
        lapozo.style.display = 'block';
        lapozo.innerText = `${szamlalo + 1}. kérdés`;
    } else {
        lapozo.style.display = 'block';
        lapozo.innerText = 'Összegzés';
    }
    let magyarazoKeret = document.createElement('div');
    magyarazoKeret.setAttribute('class', 'magyarazo');
    let magyarazat = document.createElement('h3');
    let magyarazatTextnode = document.createTextNode('Magyarázat');
    magyarazat.appendChild(magyarazatTextnode);
    magyarazoKeret.append(magyarazat);
    let magyarazoKep = document.createElement('img');
    magyarazoKep.src = adatok[szamlalo - 1].magyarazat;
    magyarazoKeret.appendChild(magyarazoKep);
    ujKerdesek.appendChild(magyarazoKeret);
}
