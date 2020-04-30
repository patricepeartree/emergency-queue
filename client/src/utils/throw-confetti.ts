import confetti from "canvas-confetti";

const colors = ['#fbbd08', '#00b5ad', '#21ba45'];
const count = 200;
const defaults = {
    origin: { y: 0.7 },
    colors: colors,
};

function fire(particleRatio: number, opts: any) {
    confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
    }));
}

export default function throwConfetti() {
    fire(0.25, {
        spread: 26,
        startVelocity: 50,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 40,
        decay: 0.92,
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}
