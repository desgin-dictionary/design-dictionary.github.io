window.addEventListener('load', () => {
    const contentwrapper = document.getElementById('headerWrapper');

    firebase.database().ref('headerColors').once('value').then((snapshot) => {

        const colors = snapshot.val();

        for (let i = 0; i < colors.length; i++) {
            const newHeader = document.createElement('header');
            const headline = document.createElement('h1');
            const strong = document.createElement('strong');
            const text = document.createElement('span');

            strong.textContent = colors[i].strong;
            text.textContent = colors[i].text;
            
            newHeader.setAttribute('id', `Header${i}`);
            newHeader.style.background = colors[i].code;

            if (i !== 0) {
                newHeader.classList.add('before');
            }
            
            headline.appendChild(strong);
            headline.appendChild(text);
            newHeader.appendChild(headline);
            contentwrapper.appendChild(newHeader);
        }

        let headerCount = 0;

        setInterval(() => {
            
            if (headerCount === colors.length - 1) {
                headerCount = -1;
                showNextHeader(`Header${colors.length - 1}`, `Header${headerCount+1}`);
            } else {
                showNextHeader(`Header${headerCount}`, `Header${headerCount+1}`);
            }
            
            headerCount++;
        }, 5000);
    });

    function showNextHeader(currentHeaderId, nextHeaderId) {

        console.log(currentHeaderId);
        console.log(nextHeaderId);

        let currentHeader = document.getElementById(currentHeaderId);
        let nextHeader = document.getElementById(nextHeaderId);

        currentHeader.classList.add('after');
        nextHeader.classList.remove('before');
        
        setTimeout(() => {
            currentHeader.classList.add('hide');
            currentHeader.classList.add('before');
            currentHeader.classList.remove('after');

            setTimeout(() => {
                currentHeader.classList.remove('hide');
                currentHeader = nextHeader;
            }, 2050);
        }, 2050);   
    }
});