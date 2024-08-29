let presavedColors = [];

function makeColoredSquares(){

    if(presavedColors.length === 0){
    for(let el of document.querySelectorAll(".main-wrapper > div[data-barba=\"container\"] > div.text_block")){
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);

        el.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        el.innerHTML = `${r}, ${g}, ${b}`;

        presavedColors.push({'r': r, 'g': g, 'b': b});
    }
        console.log(presavedColors);
    }

    else{
        let iterator = 0;
        for(let el of document.querySelectorAll(".main-wrapper > div[data-barba=\"container\"] > div.text_block")) {
            let c = {};
            c = presavedColors[iterator++];

            el.style.backgroundColor = `rgb(${c['r']}, ${c['g']}, ${c['b']})`;
            el.innerHTML = `${c['r']}, ${c['b']}, ${c['b']}`;
        }
    }

    console.log('squares');
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = () => makeColoredSquares();


let initInfo = {
    transitions:[
        {
            name: 'tr01',
            async enter(data){
                data.current.container.style.animation = `0.5s forwards enter-left`;
                document.body.style.overflowX = `hidden`;
                setTimeout(() => {data.next.container.style.animation = `0.5s forwards exit-left`}, 500);
                data.next.container.style.transform = `translateX(100%)`;
                data.current.container.style.transform = ``;
                await sleep(250);
                setTimeout(() => {document.body.style.overflowX = 'initial'}, 750);
            },
            from: {
                namespace:'first'
            }
        },
        {
            name: 'tr02',
            async enter(data){
                data.current.container.style.animation = `0.5s forwards exit-right`;
                data.next.container.style.transform = `translateX(-100%)`;
                data.current.container.style.transform = ``;
                document.body.style.overflowX = `hidden`;
                setTimeout(() => {data.next.container.style.animation = `0.5s forwards enter-right`}, 500);
                await sleep(250);
                setTimeout(() => document.body.style.overflowX = `initial`, 750);
                makeColoredSquares();
            },

            from:{
                namespace: 'second'
            }
        }
    ]
}

let initInfo2 = {
    transitions:[
        {
            name: 'tr01',
            leave(data){
                return gsap.to(data.current.container, {x: '-100%', duration: 1});
            },
            enter(data){
                data.current.container.remove();
                return gsap.from(data.next.container, { x: '100%', duration: 1});
            },
            from: {
                namespace:'first'
            },
            to:{
                namespace:'second'
            }
        },

        {
            name: 'tr02',
            leave(data){
                return gsap.to(data.current.container, {x: '100%', duration: 1});
            },
            enter(data){
                data.current.container.remove();
                makeColoredSquares();
                return gsap.from(data.next.container, {x: '-100%', duration: 1});
            },
            from: { namespace: 'second' },
            to: {namespace: 'first'}
        }
    ]
}
