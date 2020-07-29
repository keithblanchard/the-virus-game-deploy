const canvas = document.getElementById('canvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const context = canvas.getContext('2d');

const Square = (function () {
    let color = 'grey';

    function grey () {
        color = 'grey';
    }
    function yellow () {
        color = 'yellow';
    }
    function draw () {
        context.fillStyle = color;
        context.fillRect((width / 2) - 50, (height / 2) - 50,100,100);
    }

    return {
        draw, grey, yellow
    };
})();

const Timmer = (function () {
    let timmer = null;
    let toggle = true;
    let bpm = 0;
    let error = 0;
    let count = 0;
    let average = 0;
    let totalBpm = 0;
    context.font = '50px serif';
    let color = 'black';

    function startTimmer () {
        timmer = Date.now();
    }

    function updateTimmer () {
        const now = Date.now();
        const timePassed =  ( now  - timmer ) / 1000;
        bpm = 60 / timePassed;
        count++;
        totalBpm += bpm;
        average = totalBpm / count;
        timmer = now;
    }

    function toggleTimmer () {
        if (!timmer) {
            startTimmer();
        } else {
            updateTimmer();
        }
        toggle = !toggle;
    }

    function draw () {
        context.fillStyle = color;
        context.fillText(`BPM = ${Math.floor(bpm)}`, width / 3, height / 4);
        context.fillText(`Average BPM = ${Math.floor(average)}`, width / 3, height / 6);
    }

    return {
        toggleTimmer, draw
    };
})();

Square.draw();
Timmer.draw();

document.addEventListener("click", function(){
    Square.grey();
    Timmer.toggleTimmer();
    context.clearRect(0,0, width, height);
    Square.draw();
    Timmer.draw();
});

document.addEventListener("mousedown", function(){
    Square.yellow();
    context.clearRect(0,0, width, height);
    Square.draw();
    Timmer.draw();
});

