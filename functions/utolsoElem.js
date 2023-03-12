export function utolsoElem(szamlalo, megoldas, adatok) {
    if (adatok[szamlalo - 1].tipus == 'check') {
        const tomb = document.getElementsByName(`radio_${szamlalo - 1}`);

        let checkM = [];
        for (let i = 0; i < tomb.length; i++) {
            let elem = document.getElementById(`check_${szamlalo - 1}_${i}`);

            if (elem.checked) {
                checkM.push(`${adatok[szamlalo - 1].valaszok[i]}`);
            }
        }

        megoldas.push(checkM);
    } else if (adatok[szamlalo - 1].tipus == 'radio') {
        const tomb = document.getElementsByName(`radio_${szamlalo - 1}`);
        console.log(szamlalo - 1);

        for (let i = 0; i < tomb.length; i++) {
            let elem = document.getElementById(`radio_${szamlalo - 1}_${i}`);

            if (elem.checked) {
                megoldas.push(`${adatok[szamlalo - 1].valaszok[i]}`);
            }
        }
    }
}
