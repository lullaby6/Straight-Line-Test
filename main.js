document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext('2d');

    let clicking = false;
    let startX, startY, endX, endY = 0;
    let positions = [];
    let score = 0;

    const drawScore = () => {
        context.fillStyle = 'black';
        context.fillRect(0, 0, 500, 60);

        context.font = '24px monospace';
        context.fillStyle = 'white';
        context.fillText(`error: ${score} %`, 20, 50);
    };

    const drawCanvas = () => {
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = 'white';
        context.fillRect(0, canvas.height/2, canvas.width, 0.5);

        drawScore();
    };

    const resetCanvas = () => {
        clicking = false;
        startX, startY, endX, endY = 0;
        positions = [];
        score = 0;

        drawCanvas();
    };

    resetCanvas();

    const calcScore = () => {
        const diffs = positions.map(pos => Math.abs(Math.abs(pos) - Math.abs(startY)));
        const average = diffs.reduce((acc, value) => acc + value, 0) / diffs.length;

        score = (average * 10).toFixed(2);

        drawScore();
    };

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        drawCanvas();
    });

    window.addEventListener('mousedown', event => {
        clicking = true;
        startX = event.clientX;
        startY = event.clientY;
    });

    window.addEventListener('mouseup', event => {
        clicking = false;
        endX = event.clientX;
        endY = event.clientY;
        positions = [];
    });

    window.addEventListener('mouseleave', () => {
        clicking = false;
        positions = [];
    });

    window.addEventListener('mousemove', event => {
        if (clicking) {
            context.strokeStyle = 'red';
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(event.clientX, event.clientY);
            context.stroke();

            positions.push(event.clientY);

            calcScore();
        }
    });

    window.addEventListener('keydown', event => {
        if (
            event.key === 'Escape' ||
            event.key === 'Backspace' ||
            event.key === 'Delete' ||
            event.key === 'Enter'||
            event.key === 'Space' ||
            event.key === 'r' ||
            event.key === 'R'
        ) {
            resetCanvas();
        }
    });
});
