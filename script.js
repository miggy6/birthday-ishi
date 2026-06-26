/* ==========================================
   0. BIRTHDAY COUNTDOWN REALTIME LOCK
   ========================================== */
let targetDate = localStorage.getItem("timerTarget");

if (!targetDate) {
    // Changed from 5 minutes to 1 minute (1 * 60 seconds * 1000 milliseconds)
    targetDate = new Date().getTime() + (1 * 60 * 1000);
    localStorage.setItem("timerTarget", targetDate);
} else {
    targetDate = parseInt(targetDate);
}

const timerInterval = setInterval(function () {
    const now = new Date().getTime();
    const distance = targetDate - now;

    let hours   = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    let minutes = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    let seconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));

    document.getElementById("hours").innerText   = hours   < 10 ? "0" + hours   : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    if (distance <= 0) {
        clearInterval(timerInterval);
        localStorage.removeItem("timerTarget");
        document.getElementById("countdownTimer").classList.add("hidden");
        document.getElementById("lockContent").classList.remove("hidden");
    }
}, 1000);
/* ==========================================
   1. STAR PARTICLES
   ========================================== */
const starTypes = ['⭐', '✨', '🤍', '✦', '✧', '·', '°'];

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.innerText = starTypes[Math.floor(Math.random() * starTypes.length)];
    star.style.left = Math.random() * 100 + 'vw';
    const duration = Math.random() * 5 + 5;
    star.style.animationDuration = duration + 's';
    star.style.fontSize = (Math.random() * 10 + 8) + 'px';
    star.style.opacity = (Math.random() * 0.4 + 0.3).toString();
    document.body.appendChild(star);
    setTimeout(() => star.remove(), duration * 1000);
}

setInterval(createStar, 200);

/* ==========================================
   2. DATE VALIDATION LOCKSCREEN
   ========================================== */
function Checkdate() {
    const userinput = document.getElementById("dateInput").value;
    const errormsg  = document.getElementById("errorMessage");
    const newpage   = document.getElementById("letterScreen");
    const container = document.getElementById("lockScreen");
    const music     = document.getElementById("bgMusic");

    if (!userinput) {
        errormsg.innerHTML = "Pumili ka muna ng date, Myshishi! 🥰";
        return;
    }

    if (userinput.includes('-02-14') || userinput.endsWith('02-14')) {
        container.classList.add('hidden');
        newpage.classList.remove('hidden');
        music.play().catch(() => {});
    } else {
        errormsg.innerHTML = "Hala! Mali ka po hmp!! Try mo ulit Myshishi, it's our special moment... 🥺👉👈";
        /* subtle shake */
        const card = container.querySelector('.glass-card');
        card.style.animation = 'none';
        card.style.transform = 'translateX(-6px)';
        setTimeout(() => { card.style.transform = 'translateX(6px)'; }, 80);
        setTimeout(() => { card.style.transform = 'translateX(-4px)'; }, 160);
        setTimeout(() => { card.style.transform = 'translateX(0)'; }, 240);
    }
}

/* Allow Enter key to submit */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') Checkdate();
});

/* ==========================================
   3. NAVIGATION HELPERS
   ========================================== */
function goToGallery() {
    document.getElementById("letterScreen").classList.add("hidden");
    document.getElementById("galleryScreen").classList.remove("hidden");
}

function backToLetter() {
    document.getElementById("galleryScreen").classList.add("hidden");
    document.getElementById("letterScreen").classList.remove("hidden");
}

function goToVideos() {
    document.getElementById("galleryScreen").classList.add("hidden");
    document.getElementById("videosScreen").classList.remove("hidden");
}

function backToGallery() {
    document.getElementById("videosScreen").classList.add("hidden");
    document.getElementById("galleryScreen").classList.remove("hidden");
}

function goToOutro() {
    document.getElementById("videosScreen").classList.add("hidden");
    document.getElementById("outroScreen").classList.remove("hidden");
    launchFloatingHearts();
}

function backToVideos() {
    document.getElementById("outroScreen").classList.add("hidden");
    document.getElementById("videosScreen").classList.remove("hidden");
}

/* ==========================================
   4. OUTRO FLOATING HEARTS
   ========================================== */
function launchFloatingHearts() {
    const container = document.getElementById("outroContent");
    const hearts = ['🤍','💙','🌸','✨','💫','🎀'];
    let count = 0;

    const interval = setInterval(() => {
        if (count >= 18) { clearInterval(interval); return; }
        const h = document.createElement('div');
        h.classList.add('floating-heart');
        h.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        h.style.left  = (Math.random() * 80 + 10) + '%';
        h.style.bottom = '20px';
        h.style.animationDelay = (Math.random() * 0.4) + 's';
        h.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
        container.appendChild(h);
        setTimeout(() => h.remove(), 4000);
        count++;
    }, 220);
}
