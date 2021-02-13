var allPoints = 0,
    points = 0,
    gold = 0,
    tapper = 1,
    clicks = 0;

var unlocks = [
  {
    name: "wood",
    price: 100,
    enabled: true,
    unlocked: false
  }
];

var upgrades = [
  {
    name: "woodGear",
    price: 50
  },
  {
    name: "woodGearUpgrade",
    price: 5
  }
];

const cookies = document.cookie.split("; ");

if (document.cookie) { 2//Set everything to its cookie value
  if (cookies.some(x => x.startsWith("points=")))
    points = parseInt(
      document.cookie
        .split("; ")
        .find(r => r.startsWith("points="))
        .split("=")[1]
    );
  if (cookies.some(x => x.startsWith("gold=")))
    gold = parseInt(
      document.cookie
        .split("; ")
        .find(r => r.startsWith("gold="))
        .split("=")[1]
    );
  if (cookies.some(x => x.startsWith("tapper=")))
    tapper = parseInt(
      document.cookie
        .split("; ")
        .find(r => r.startsWith("tapper="))
        .split("=")[1]
    );
  if (cookies.some(x => x.startsWith("clicks=")))
    clicks = parseInt(
      document.cookie
        .split("; ")
        .find(r => r.startsWith("clicks="))
        .split("=")[1]
    );
  if (cookies.some(x => x.startsWith("allPoints=")))
    allPoints = parseInt(
      document.cookie
        .split("; ")
        .find(r => r.startsWith("allPoints="))
        .split("=")[1]
    );
  if (cookies.some(x => x.startsWith("unlocks=")))
    unlocks = JSON.parse(
      document.cookie
        .split("; ")
        .find(r => r.startsWith("unlocks="))
        .split("=")[1]
    );
  if (cookies.some(x => x.startsWith("upgrades=")))
    upgrades = JSON.parse(
      document.cookie
        .split("; ")
        .find(r => r.startsWith("upgrades="))
        .split("=")[1]
    );
}

function unlock(item) {
  const obj = unlocks.find(x => x.name === item);
  points -= obj.price;
  document.getElementById(item).style.display = "initial";
  document.getElementById(item + "Unlock").style.display = "none";
  obj.enabled = false;
  obj.unlocked = true;
}

function random(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function tap() {
  points += tapper;
  allPoints += tapper;
  clicks++;
  if (random(5000, 1) <= 2) gold++;
}

function reset() {
  const confirmation = confirm(
    `Are you sure you want to fully reset the game?`
  );
  if (confirmation === true) {
    const allCooks = document.cookie.split(";");
    for (let i = 0; i < allCooks.length; i++) {
      document.cookie = allCooks[i] + "=;expires=" + new Date(0).toUTCString();
    }
    window.location.reload();
  }
}

function showCooks() {
  alert(document.cookie);
}

function toggle(id, toggle) {
  document.getElementById(id).style.visibility = toggle;
}

function toggleDis(id, toggle) {
  document.getElementById(id).disabled = toggle;
}

function unlockCheck(id) {
  return document.getElementById(id).style.visibility;
}

function update() {
  if (points > 0) {
    document.getElementById("info").style.visibility = "visible";
    document.getElementById("stats").style.visibility = "visible";
  }

  if (points >= 0) {
    toggle("unlocks", "visible");
  }

  const toUnlock = unlocks.filter(x => points >= x.price);

  toUnlock.forEach(x => {
    if (x.enabled === true)
      document.getElementById(x.name + "Unlock").style.display = "initial";
    else if (x.enabled === false)
      document.getElementById(x.name + "Unlock").style.display = "none";
  });

  const toUnlock2 = unlocks.filter(x => x.unlocked);

  toUnlock2.forEach(x => {
    document.getElementById(x.name).style.display = "initial";
  });

  document.getElementById("curr").innerHTML = `${points} points`;
  document.getElementById("curr2").innerHTML = `${gold} ultra`;
  document.getElementById("totalClicks").innerHTML = `All clicks: ${clicks}`;
  document.getElementById("totalPoints").innerHTML = `All points: ${allPoints}`;
  document.getElementById("totalUltra").innerHTML = `All ultra: ${gold}`;
}

function saveGame() {
  document.cookie = `allPoints=${allPoints}`;
  document.cookie = `points=${points}`;
  document.cookie = `gold=${gold}`;
  document.cookie = `tapper=${tapper}`;
  document.cookie = `clicks=${clicks}`;
  document.cookie = `unlocks=${JSON.stringify(unlocks)}`;
  document.cookie = `upgrades=${JSON.stringify(upgrades)}`;
  document.getElementById("saving").style.visibility = "visible";
  setTimeout(() => {
    document.getElementById("saving").style.visibility = "hidden";
  }, 3000);
}

window.setInterval(() => {
  saveGame();
}, 15000);

window.setInterval(() => {
  update();
}, 100);
