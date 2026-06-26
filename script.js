/* ==========================================
   0. BIRTHDAY COUNTDOWN REALTIME LOCK
   ========================================== */
let targetDate = localStorage.getItem("timerTarget");

if (!targetDate) {
    // Unang bukas: Dito magsisimula ang 5-minute countdown
    targetDate = new Date().getTime() + (5 * 60 * 1000);
    localStorage.setItem("timerTarget", targetDate);
} else {
    targetDate = parseInt(targetDate);
}

const timerInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
        hours = 0;
        minutes = 0;
        seconds = 0;
    }

    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
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
   1. STAR PARTICLES GENERATOR
   ========================================== */
function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    
    const starTypes = ['⭐', '✨', '🤍', '✦', '✧'];
    star.innerText = starTypes[Math.floor(Math.random() * starTypes.length)];
    star.style.left = Math.random() * 100 + 'vw';
    
    const duration = Math.random() * 4 + 4;
    star.style.animationDuration = duration + 's';
    star.style.fontSize = Math.random() * 12 + 10 + 'px';
    
    document.body.appendChild(star);
    
    setTimeout(() => {
        star.remove();
    }, duration * 1000);
}
setInterval(createStar, 150);

/* ==========================================
   2. DATE VALIDATION LOCKSCREEN
   ========================================== */
function Checkdate() {
    let userinput = document.getElementById("dateInput").value;
    let errormsg = document.getElementById("errorMessage");
  
    const newpage = document.getElementById("letterScreen");
    const container = document.getElementById("lockScreen");
    const music = document.getElementById("bgMusic");

    if (!userinput) {
        errormsg.innerHTML = "Pumili ka muna ng date, Myshishi! 🥰";
        return;
    }

    if (userinput.includes('-02-13') || userinput.endsWith('02-13')) {
        container.classList.add('hidden'); 
        newpage.classList.remove('hidden');
        
        music.play().catch(error => {
            console.log("Browser blocked autoplay, click anywhere to play:", error);
        });
        
    } else {
        errormsg.innerHTML = "Hala! Mali ka po hmp!! Try mo ulit Myshishi, it's our special moment... 🥺👉👈";
    }
}

/* ==========================================
   3. NAVIGATION CONTROLS (GALLERY, VIDEOS, OUTRO)
   ========================================== */
// Mula Letter Screen papuntang Gallery
function goToGallery() {
    document.getElementById("letterScreen").classList.add("hidden");
    document.getElementById("galleryScreen").classList.remove("hidden");
}

// Balik sa Letter mula Gallery
function backToLetter() {
    document.getElementById("galleryScreen").classList.add("hidden");
    document.getElementById("letterScreen").classList.remove("hidden");
}

// Mula Gallery papuntang Videos Screen
function goToVideos() {
    document.getElementById("galleryScreen").classList.add("hidden");
    document.getElementById("videosScreen").classList.remove("hidden");
}

// Balik sa Gallery mula Videos Screen
function backToGallery() {
    document.getElementById("videosScreen").classList.add("hidden");
    document.getElementById("galleryScreen").classList.remove("hidden");
}

// Mula Videos papuntang Outro Screen
function goToOutro() {
    document.getElementById("videosScreen").classList.add("hidden");
    document.getElementById("outroScreen").classList.remove("hidden");
}

// Balik sa Videos mula Outro Screen (Just in case gusto niya balikan)
function backToVideos() {
    document.getElementById("outroScreen").classList.add("hidden");
    document.getElementById("videosScreen").classList.remove("hidden");
}