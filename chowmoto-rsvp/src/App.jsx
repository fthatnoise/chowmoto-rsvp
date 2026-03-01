import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// ─────────────────────────────────────────────
// PASTE YOUR FIREBASE CONFIG HERE
// (Step 3 of the setup guide)
// ─────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyDE6cnSP-WxTGh7OS7QIZFYe_vNNUzOFLk",
  authDomain: "chowmoto-rsvp.firebaseapp.com",
  projectId: "chowmoto-rsvp",
  storageBucket: "chowmoto-rsvp.firebasestorage.app",
  messagingSenderId: "246753994914",
  appId: "1:246753994914:web:4733bfeb2bed1e8a564ffb"
};
// ─────────────────────────────────────────────

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=Montserrat:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --lime:      #cdd84a;
    --lime-dark: #b8c235;
    --lime-light:#d8e460;
    --burg:      #5a0e1e;
    --burg-mid:  #7a1828;
    --burg-light:#9a2838;
    --white:     #ffffff;
    --border:    rgba(90,14,30,0.18);
    --border-strong: rgba(90,14,30,0.35);
  }

  body {
    background: var(--lime);
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    color: var(--burg);
    min-height: 100vh;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.94); }
    to   { opacity: 1; transform: scale(1); }
  }

  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--lime);
  }

  /* ── HERO ── */
  .hero {
    text-align: center;
    padding: 72px 24px 56px;
    position: relative;
    background: var(--lime);
    animation: fadeIn 0.7s ease both;
    border-bottom: 1px solid var(--border);
  }
  .hero::before { display: none; }
  .hero-eyebrow {
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: var(--burg);
    margin-bottom: 20px;
    font-weight: 500;
    opacity: 0.65;
  }
  .hero-names {
    font-family: 'Playfair Display', serif;
    font-size: clamp(56px, 11vw, 108px);
    font-weight: 800;
    line-height: 0.95;
    color: var(--burg);
    letter-spacing: -1px;
    margin-bottom: 6px;
  }
  .hero-names em {
    font-style: normal;
    color: var(--burg);
  }
  .hero-ampersand {
    font-style: normal;
    color: var(--burg);
    opacity: 0.7;
  }
  .hero-date {
    font-size: 10px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: var(--burg);
    margin-top: 20px;
    font-weight: 500;
    opacity: 0.6;
  }
  .hero-divider {
    width: 40px;
    height: 1px;
    background: var(--burg);
    margin: 18px auto;
    opacity: 0.25;
  }
  .hero-tagline {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--burg);
    opacity: 0.55;
  }

  /* ── MAIN ── */
  .main {
    flex: 1;
    max-width: 560px;
    width: 100%;
    margin: 0 auto;
    padding: 52px 24px 80px;
  }

  /* ── STEPS ── */
  .step { animation: fadeUp 0.4s ease both; }
  .step-title {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 800;
    color: var(--burg);
    margin-bottom: 8px;
    text-align: center;
  }
  .step-subtitle {
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--burg);
    text-align: center;
    margin-bottom: 32px;
    opacity: 0.5;
  }

  /* ── NAME INPUT ── */
  .name-field {
    position: relative;
    margin-bottom: 16px;
  }
  .name-input {
    width: 100%;
    padding: 18px 20px;
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--burg);
    background: rgba(255,255,255,0.45);
    border: 1px solid var(--border-strong);
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    text-align: center;
  }
  .name-input:focus {
    border-color: var(--burg);
    background: rgba(255,255,255,0.7);
  }
  .name-input::placeholder {
    color: rgba(90,14,30,0.3);
    font-style: italic;
    font-weight: 700;
  }

  /* ── SEARCH RESULTS ── */
  .results-list {
    border: 1px solid var(--border-strong);
    background: rgba(255,255,255,0.55);
    overflow: hidden;
    margin-bottom: 20px;
  }
  .result-item {
    padding: 15px 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
    transition: background 0.15s;
    font-size: 14px;
    color: var(--burg);
    font-weight: 400;
    letter-spacing: 0.3px;
  }
  .result-item:last-child { border-bottom: none; }
  .result-item:hover { background: rgba(255,255,255,0.75); }
  .result-arrow { color: var(--burg); font-size: 16px; opacity: 0.4; }
  .no-result {
    text-align: center;
    padding: 22px;
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 700;
    color: var(--burg);
    font-size: 15px;
    background: rgba(255,255,255,0.45);
    border: 1px solid var(--border-strong);
    margin-bottom: 20px;
    opacity: 0.7;
  }

  /* ── VENUES ── */
  .guest-greeting {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 800;
    text-align: center;
    color: var(--burg);
    margin-bottom: 4px;
  }
  .guest-greeting em { font-style: italic; }
  .guest-sub {
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--burg);
    text-align: center;
    margin-bottom: 32px;
    opacity: 0.5;
  }

  .venues-stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
  }
  .venue-card {
    background: rgba(255,255,255,0.4);
    border: 1px solid var(--border-strong);
    padding: 22px 22px 18px;
    transition: background 0.2s, border-color 0.2s;
  }
  .venue-card:hover { background: rgba(255,255,255,0.6); border-color: var(--burg); }
  .venue-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }
  .venue-icon { font-size: 15px; opacity: 0.7; }
  .venue-label {
    font-size: 9px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--burg);
    font-weight: 600;
  }
  .venue-detail {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    color: var(--burg);
    margin-left: auto;
    opacity: 0.5;
    letter-spacing: 1px;
  }

  .choice-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .choice-btn {
    padding: 13px 10px;
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    cursor: pointer;
    border: 1px solid var(--border-strong);
    background: transparent;
    color: var(--burg);
    transition: all 0.2s;
    opacity: 0.65;
  }
  .choice-btn:hover { background: rgba(90,14,30,0.08); opacity: 1; border-color: var(--burg); }
  .choice-btn.yes {
    background: var(--burg);
    border-color: var(--burg);
    color: var(--lime);
    opacity: 1;
  }
  .choice-btn.no {
    background: rgba(90,14,30,0.12);
    border-color: var(--burg);
    color: var(--burg);
    opacity: 1;
    text-decoration: line-through;
    text-decoration-color: rgba(90,14,30,0.4);
  }

  /* Plus one */
  .plusone-card {
    background: rgba(255,255,255,0.4);
    border: 1px solid var(--border-strong);
    padding: 18px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  .plusone-text {}
  .plusone-title {
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--burg);
    margin-bottom: 5px;
    font-weight: 600;
    opacity: 0.6;
  }
  .plusone-sub {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 700;
    font-size: 14px;
    color: var(--burg);
  }
  .toggle-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .toggle-label {
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--burg);
    font-weight: 500;
    min-width: 24px;
    opacity: 0.65;
  }
  .toggle {
    width: 48px;
    height: 26px;
    border-radius: 13px;
    background: rgba(90,14,30,0.15);
    border: 1px solid var(--border-strong);
    cursor: pointer;
    position: relative;
    transition: background 0.25s;
    flex-shrink: 0;
  }
  .toggle.on { background: var(--burg); border-color: var(--burg); }
  .toggle::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    background: var(--lime);
    border-radius: 50%;
    top: 3px;
    left: 3px;
    transition: transform 0.25s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  }
  .toggle.on::after { transform: translateX(22px); }

  /* Contact info cards */
  .contact-card {
    background: rgba(255,255,255,0.4);
    border: 1px solid var(--border-strong);
    padding: 18px 22px;
    margin-bottom: 12px;
  }
  .contact-label {
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--burg);
    margin-bottom: 8px;
    font-weight: 600;
    opacity: 0.6;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .contact-optional {
    font-size: 8px;
    letter-spacing: 1.5px;
    opacity: 0.4;
    font-weight: 400;
  }
  .contact-input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border-strong);
    padding: 8px 0;
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--burg);
    outline: none;
    transition: border-color 0.2s;
  }
  .contact-input:focus { border-bottom-color: var(--burg); }
  .contact-input::placeholder { opacity: 0.25; font-style: italic; font-weight: 700; }

  /* Submit spacing */
  .submit-btn {
    width: 100%;
    padding: 18px;
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    font-weight: 500;
    cursor: pointer;
    border: none;
    background: var(--burg);
    color: var(--lime);
    transition: background 0.2s;
  }
  .submit-btn:hover { background: var(--burg-mid); }
  .submit-btn:disabled { background: rgba(90,14,30,0.2); color: rgba(90,14,30,0.35); cursor: not-allowed; }

  /* Confirmation */
  .confirm-wrap {
    text-align: center;
    padding: 40px 0;
    animation: scaleIn 0.5s ease both;
  }
  .confirm-icon {
    font-size: 52px;
    margin-bottom: 24px;
  }
  .confirm-title {
    font-family: 'Playfair Display', serif;
    font-size: 34px;
    font-weight: 800;
    color: var(--burg);
    margin-bottom: 8px;
    line-height: 1.15;
  }
  .confirm-title em { font-style: italic; }
  .confirm-sub {
    font-size: 12px;
    color: var(--burg);
    line-height: 1.8;
    margin-bottom: 28px;
    opacity: 0.6;
    letter-spacing: 0.3px;
  }
  .confirm-venues {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 28px;
    text-align: left;
  }
  .confirm-venue-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    background: rgba(255,255,255,0.45);
    border: 1px solid var(--border-strong);
  }
  .confirm-venue-name { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--burg); font-weight: 600; opacity: 0.65; }
  .confirm-status-yes { color: var(--burg); font-size: 9px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; }
  .confirm-status-no  { color: var(--burg); font-size: 9px; letter-spacing: 2px; text-transform: uppercase; opacity: 0.3; }
  .back-btn {
    background: transparent;
    border: 1px solid var(--border-strong);
    padding: 14px 32px;
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--burg);
    cursor: pointer;
    transition: background 0.2s;
    opacity: 0.6;
    font-weight: 500;
  }
  .back-btn:hover { background: rgba(90,14,30,0.08); opacity: 1; }

  /* Footer */
  .footer {
    text-align: center;
    padding: 24px;
    border-top: 1px solid var(--border);
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--burg);
    opacity: 0.4;
  }

  /* Not found */
  .notfound-wrap {
    text-align: center;
    padding: 20px 0 28px;
  }
  .notfound-note {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 700;
    font-size: 15px;
    color: var(--burg);
    margin-bottom: 10px;
    opacity: 0.65;
  }
  .notfound-hint {
    font-size: 10px;
    letter-spacing: 1.5px;
    color: var(--burg);
    opacity: 0.4;
  }

  @media (max-width: 480px) {
    .hero { padding: 52px 20px 40px; }
    .main { padding: 36px 16px 64px; }
  }
`;

const VENUES = [
  { key: "Picnic", icon: "🦪", detail: "11:30 AM" },
  { key: "Ortliebs", icon: "🪩", detail: "9:00 PM" },
];

const SEED_GUESTS = [{"id":1,"name":"Jeffrey Chow","plusOne":false,"plusOneName":"","email":"jeffchow825@gmail.com","address":{"line1":"","line2":"","city":"","state":"","zip":""},"venues":{"Picnic":null,"Ortliebs":null}},{"id":2,"name":"Dylan Chow","plusOne":true,"plusOneName":"Isabelle Artes","email":"dylanchow11375@gmail.com","address":{"line1":"21-32 Hoyt Ave. S","line2":"Apt.3","city":"Astoria","state":"NY","zip":"11102"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":3,"name":"Kylie Chow","plusOne":true,"plusOneName":"Eduardo Ortiz","email":"kyliechow275@gmail.com","address":{"line1":"24-28 35th St.","line2":"Apt 1","city":"Astoria","state":"NY","zip":"11103"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":4,"name":"Brandon Chow","plusOne":true,"plusOneName":"Megan Javitch","email":"brandonchow275@gmail.com","address":{"line1":"40-05 Cresent St.","line2":"Apt. 5D","city":"Long Island City","state":"NY","zip":"11101"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":5,"name":"Bethie Clarke","plusOne":false,"plusOneName":"","email":"betser70@gmail.com","address":{"line1":"2826 Barkley Ave.","line2":"","city":"Bronx","state":"NY","zip":"10465"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":6,"name":"Julie Iurato","plusOne":false,"plusOneName":"","email":"julie.i@verizon.net","address":{"line1":"824 Revere Avenue","line2":"","city":"Bronx","state":"NY","zip":"10465"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":7,"name":"Michael Iurato","plusOne":true,"plusOneName":"Jaime Iurato","email":"Michaeliurato23@gmail.com","address":{"line1":"3151 Valhalla Drive","line2":"","city":"Bronx","state":"NY","zip":"10465"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":8,"name":"Jessie OConnor","plusOne":true,"plusOneName":"Chris OConnor","email":"joconnor427@gmail.com","address":{"line1":"2918 Zulette Ave.","line2":"","city":"Bronx","state":"NY","zip":"10461"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":9,"name":"Cely Wilfinger","plusOne":false,"plusOneName":"","email":"celywilfinger@gmail.com","address":{"line1":"2826 Barkley Ave.","line2":"","city":"Bronx","state":"NY","zip":"10465"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":10,"name":"Matt Wilfinger","plusOne":true,"plusOneName":"Terri Ozoroski","email":"matt.wilfinger@gmail.com","address":{"line1":"155 Andover Pl","line2":"","city":"Robbinsville","state":"NJ","zip":"8691"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":11,"name":"Laura Wilfinger","plusOne":false,"plusOneName":"","email":"laura.e.wilfinger@gmail.com","address":{"line1":"103 Sawmill Dr","line2":"","city":"Berkeley Heights","state":"NJ","zip":"7843"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":12,"name":"Mike Mikitik","plusOne":true,"plusOneName":"Janice Mikitik","email":"mmikitik@gmail.com","address":{"line1":"1 Bass Rock Road","line2":"","city":"Hopatcong","state":"NJ","zip":"7843"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":13,"name":"Derek Mikitik","plusOne":true,"plusOneName":"Erika Grill","email":"dmikitik@yahoo.com","address":{"line1":"37 Colonial Ave.","line2":"","city":"Warwick","state":"NY","zip":"10990"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":14,"name":"Kyle Mikitik","plusOne":true,"plusOneName":"Melissa Bickar","email":"kylemikitik@gmail.com","address":{"line1":"1 Bass Rock Road","line2":"","city":"Hopatcong","state":"NJ","zip":"7843"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":15,"name":"Theresa Suarez","plusOne":true,"plusOneName":"Eddie Suarez","email":"tsuarezm@aol.com","address":{"line1":"2 Hockey Road","line2":"","city":"Mastic Beach","state":"NY","zip":"11951"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":16,"name":"James Wilfinger","plusOne":false,"plusOneName":"","email":"jimmyvid11@gmail.com","address":{"line1":"1815 Summerfield Street","line2":"Apt. B4","city":"Ridgewood","state":"NY","zip":"11385"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":17,"name":"Ken Chow","plusOne":true,"plusOneName":"Jan Chow","email":"chowmean@verizon.net","address":{"line1":"9543 SW 71st Loop","line2":"","city":"Ocala","state":"FL","zip":"34481"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":18,"name":"Michael Chow","plusOne":true,"plusOneName":"Erica Chow","email":"mchow729@gmail.com","address":{"line1":"11 Frazer Ct.","line2":"","city":"Greenlawn","state":"NY","zip":"11740"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":19,"name":"Ryan Chow","plusOne":true,"plusOneName":"Stephanie Chow","email":"Metsboy4@gmail.com","address":{"line1":"18 S Dorado Circle","line2":"Apt. 2H","city":"Hauppauge","state":"NY","zip":"11788"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":20,"name":"Deb Wong","plusOne":true,"plusOneName":"Jan Wong","email":"mamaduck5@aol.com","address":{"line1":"333 Pearl Street","line2":"Apt 10L","city":"New York","state":"NY","zip":"10038"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":21,"name":"Kim Haggart","plusOne":true,"plusOneName":"Charlie Haggart","email":"wong.haggart@gmail.com","address":{"line1":"1416 Aspen St. NW","line2":"","city":"Washington","state":"DC","zip":"20012"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":22,"name":"Kourtney Wong","plusOne":false,"plusOneName":"","email":"kourtney.b.wong@gmail.com","address":{"line1":"1868 Columbia Rd. NW","line2":"#311","city":"Washington","state":"DC","zip":"20009"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":23,"name":"Kayla Wong Kelly","plusOne":true,"plusOneName":"Alex Kelly","email":"kaylawongkelly@gmail.com","address":{"line1":"374 7th St.","line2":"Apt. 201","city":"Jersey City","state":"NJ","zip":"7302"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":24,"name":"Dave Rinefierd","plusOne":true,"plusOneName":"Stephanie Rinefierd","email":"dave298@verizon.net","address":{"line1":"298 Bow Dr.","line2":"","city":"Hauppauge","state":"NY","zip":"11788"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":25,"name":"Lindsay Guiles","plusOne":true,"plusOneName":"Brian Guiles","email":"lindsay.rinefierd@gmail.com","address":{"line1":"189 McMane Ave.","line2":"","city":"Berkeley Heights","state":"NJ","zip":"7922"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":26,"name":"Taylor Rinefierd","plusOne":false,"plusOneName":"","email":"trinefierd01@gmail.com","address":{"line1":"151 W 87th St.","line2":"Apt. 1A","city":"NY","state":"NY","zip":"10024"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":27,"name":"Mackenzie Reller","plusOne":true,"plusOneName":"Bryan Reller","email":"kenzie298@gmail.com","address":{"line1":"3209 Orchestra Court","line2":"","city":"Apex","state":"NC","zip":"27539"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":28,"name":"Clay Chin","plusOne":true,"plusOneName":"Kathy Chin","email":"chin2win@optonline.net","address":{"line1":"32 Executive Dr.","line2":"","city":"Hauppauge","state":"NY","zip":"11788"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":29,"name":"Tyler Chin","plusOne":true,"plusOneName":"Eva Chin","email":"tyler.chin77@gmail.com","address":{"line1":"700 Rankin St. NE","line2":"Apt. 1917","city":"Atlanta","state":"GA","zip":"30308"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":30,"name":"Dakota Chin","plusOne":true,"plusOneName":"Grace Brasky","email":"dakota.chin21@gmail.com","address":{"line1":"108-20 71st Ave.","line2":"Apt. 14D","city":"Forest Hills","state":"NY","zip":"11375"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":31,"name":"Max Chin","plusOne":true,"plusOneName":"Zoe Thoennes","email":"maxchin42@gmail.com","address":{"line1":"115 2nd Street NE","line2":"Apt. 14","city":"Washington","state":"DC","zip":"20002"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":32,"name":"Triple Edwards","plusOne":true,"plusOneName":"Todd Kennedy","email":"g21triple@gmail.com","address":{"line1":"215 Park Row","line2":"Apt. 10A","city":"New York","state":"NY","zip":"10038"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":33,"name":"Frank Kenna","plusOne":true,"plusOneName":"Stacey Kenna","email":"fkkenna@yahoo.com","address":{"line1":"95-18 68th Ave.","line2":"","city":"Forest Hills","state":"NY","zip":"11375"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":34,"name":"Connor Kenna","plusOne":false,"plusOneName":"","email":"","address":{"line1":"95-18 68th Ave.","line2":"","city":"Forest Hills","state":"NY","zip":"11375"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":35,"name":"Uncle Brad Chin","plusOne":false,"plusOneName":"","email":"bchin1231@gmail.com","address":{"line1":"215 Park Row","line2":"Apt. 14D","city":"New York","state":"NY","zip":"10038"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":36,"name":"Trisha Novy","plusOne":false,"plusOneName":"","email":"thecray1016@gmail.com","address":{"line1":"135 Montgomery St.","line2":"Apt. 9A","city":"Jersey City","state":"NJ","zip":"7302"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":37,"name":"Randall Quan","plusOne":false,"plusOneName":"","email":"ranquan@gmail.com","address":{"line1":"","line2":"","city":"","state":"","zip":""},"venues":{"Picnic":null,"Ortliebs":null}},{"id":38,"name":"Marlon Quan","plusOne":true,"plusOneName":"Florene Quan","email":"mquan22@gmail.com","address":{"line1":"28 Jays Corner","line2":"","city":"Somerset","state":"NJ","zip":"7424"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":39,"name":"Gail Quan Popovic","plusOne":true,"plusOneName":"Dusan Popovic","email":"gail.quan.nyc@gmail.com","address":{"line1":"215 Park Row","line2":"Apt. 9A","city":"New York","state":"NY","zip":"10038"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":40,"name":"Glen Tsurumoto","plusOne":false,"plusOneName":"","email":"","address":{"line1":"2821 Lou Ann Dr.","line2":"#E123","city":"Modesto","state":"CA","zip":"95350"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":41,"name":"Lynn Tsurumoto","plusOne":false,"plusOneName":"","email":"lynnmarie.molloy@gmail.com","address":{"line1":"515 Dry Branch Way","line2":"","city":"Saint John's","state":"FL","zip":"32259"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":42,"name":"Ian Tsurumoto","plusOne":true,"plusOneName":"Ryan Anderson","email":"","address":{"line1":"13885 Crestview Circle NW","line2":"","city":"Silverdale","state":"WA","zip":"98383"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":43,"name":"Maxwell Tsurumoto","plusOne":true,"plusOneName":"Gabriella Castillo","email":"Mgtsurumoto@gmail.com","address":{"line1":"1302 Hopyard Rd.","line2":"Apt. 40","city":"Pleasanton","state":"CA","zip":"94566"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":44,"name":"Dan Tsurumoto","plusOne":true,"plusOneName":"Stephanie Tsurumoto","email":"","address":{"line1":"5974 Skyfarm Drive","line2":"","city":"Castro Valley","state":"CA","zip":"94552"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":45,"name":"Tim Tsurumoto","plusOne":false,"plusOneName":"","email":"","address":{"line1":"16300 Orange Blossom Rd #27","line2":"","city":"Oakdale","state":"CA","zip":"95361"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":46,"name":"Laurie Alvich","plusOne":false,"plusOneName":"","email":"","address":{"line1":"196 Tinley Park Circle","line2":"","city":"Delaware","state":"OH","zip":"43015"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":47,"name":"Alicia Alvich","plusOne":true,"plusOneName":"Michael Waite","email":"","address":{"line1":"196 Tinley Park Circle","line2":"","city":"Delaware","state":"OH","zip":"43015"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":48,"name":"Christa Semans","plusOne":true,"plusOneName":"Ben Semans","email":"","address":{"line1":"1030 Putney Drive","line2":"","city":"Columbus","state":"OH","zip":"43085"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":49,"name":"Jenna Alvich","plusOne":true,"plusOneName":"Kenny","email":"","address":{"line1":"3001 Angelo Joseph lane","line2":"unit 206","city":"Columbus","state":"OH","zip":"43204"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":50,"name":"Edward Molloy","plusOne":true,"plusOneName":"Maxine Shapiro Molloy","email":"","address":{"line1":"5311 Poster Lane","line2":"","city":"Fayetteville","state":"NY","zip":"13066"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":51,"name":"Megan Kuqbisa","plusOne":true,"plusOneName":"Don Kuqbisa","email":"","address":{"line1":"84 Latchmere Drive","line2":"","city":"Victor","state":"NY","zip":"14564"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":52,"name":"Andy Hemmert","plusOne":true,"plusOneName":"Anne Hemmert","email":"","address":{"line1":"8124 Subbase PMB 558","line2":"","city":"St Thomas","state":"VI","zip":"802"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":53,"name":"Rob Hemmert","plusOne":false,"plusOneName":"","email":"","address":{"line1":"40 40 Messina Dr","line2":"","city":"Lake Mary","state":"FL","zip":"32746"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":54,"name":"Tim Molloy","plusOne":true,"plusOneName":"Judy Molloy","email":"","address":{"line1":"85813 Territorial Highway","line2":"","city":"Eugene","state":"OR","zip":"97402"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":55,"name":"Amanda Viens","plusOne":true,"plusOneName":"Isaac Ellman","email":"","address":{"line1":"23 Burwood Ave.","line2":"","city":"Stamford","state":"CT","zip":"6902"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":56,"name":"Jakob Saidman","plusOne":true,"plusOneName":"Zoe King","email":"","address":{"line1":"29 Elm Street","line2":"","city":"Sleepy Hollow","state":"NY","zip":"10591"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":57,"name":"Shane Meehan","plusOne":true,"plusOneName":"Dixie Hodge","email":"","address":{"line1":"2225 Latona St","line2":"","city":"Philadelphia","state":"PA","zip":"19146"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":58,"name":"Jeff Wilburn","plusOne":false,"plusOneName":"","email":"","address":{"line1":"","line2":"","city":"","state":"","zip":""},"venues":{"Picnic":null,"Ortliebs":null}},{"id":59,"name":"Rachel Randolph","plusOne":true,"plusOneName":"Mark Masih","email":"","address":{"line1":"","line2":"","city":"","state":"","zip":""},"venues":{"Picnic":null,"Ortliebs":null}},{"id":60,"name":"Lydia Schrader","plusOne":true,"plusOneName":"Brent Schrader","email":"","address":{"line1":"78 E Broadway","line2":"","city":"Gettysburg","state":"PA","zip":"17325"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":61,"name":"Caroline O'Brien","plusOne":true,"plusOneName":"Angel Ocana","email":"hellocollo@gmail.com","address":{"line1":"708 S Perth St.","line2":"","city":"A","state":"Philadelphia","zip":""},"venues":{"Picnic":null,"Ortliebs":null}},{"id":62,"name":"Cassie Beyer","plusOne":true,"plusOneName":"Jon Becker","email":"cbeyer10489@gmail.com","address":{"line1":"212 Jefferson Ave.","line2":"","city":"Downingtown","state":"PA","zip":"19335"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":63,"name":"John Kessler","plusOne":true,"plusOneName":"Corinne Harris","email":"","address":{"line1":"1430 Princeton St.","line2":"Apt. 4","city":"Santa Monica","state":"CA","zip":"90404"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":64,"name":"Sarah Champey","plusOne":true,"plusOneName":"Pat Champey","email":"","address":{"line1":"206 Creek Trail","line2":"","city":"Madison","state":"AL","zip":"35758"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":65,"name":"Barbara Anastacio","plusOne":true,"plusOneName":"Adrian Anastacio","email":"barbaramangino@gmail.com","address":{"line1":"48 Kerema Ave.","line2":"","city":"Milford","state":"CT","zip":"6460"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":66,"name":"Stephanie Morrissey","plusOne":true,"plusOneName":"Brian Morrissey","email":"stephm1290@gmail.com","address":{"line1":"863 Catalpa Drive","line2":"","city":"Franklin Square","state":"NY","zip":"11010"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":67,"name":"Laura Mangino","plusOne":true,"plusOneName":"Laura's +1?","email":"lauramangino@gmail.com","address":{"line1":"134 Rivercliff Drive","line2":"","city":"Milford","state":"CT","zip":"6460"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":68,"name":"Ken Cairns","plusOne":true,"plusOneName":"Allison Nible","email":"","address":{"line1":"639 Belgrade St.","line2":"","city":"Philadelphia","state":"PA","zip":"19125"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":69,"name":"Ben Kaye","plusOne":true,"plusOneName":"Kat Lee","email":"","address":{"line1":"382 Lefferts Ave.","line2":"Apt. 6F","city":"Brooklyn","state":"NY","zip":"11225"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":70,"name":"Ken Grand Pierre","plusOne":false,"plusOneName":"","email":"","address":{"line1":"538 Graham Ave.","line2":"Apt. 3R","city":"Brooklyn","state":"NY","zip":"11222"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":71,"name":"Nina Westervelt","plusOne":true,"plusOneName":"Todd Stambaugh","email":"","address":{"line1":"4135 47th St.","line2":"","city":"Sunnyside","state":"NY","zip":"11104"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":72,"name":"Shannon Sheridan","plusOne":true,"plusOneName":"Rory Sheridan","email":"","address":{"line1":"5504 13th Street NW","line2":"","city":"Washington","state":"DC","zip":"20011"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":73,"name":"Laurie Larson","plusOne":false,"plusOneName":"","email":"lburnslarson@yahoo.com","address":{"line1":"80 Oakland Ave.","line2":"","city":"Colonial Heights","state":"NY","zip":"10710"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":74,"name":"Tracy Nagler","plusOne":true,"plusOneName":"Larry Nagler","email":"tnagler@centenergy.com","address":{"line1":"5258 Stratford Court","line2":"","city":"Cape Coral","state":"FL","zip":"33904"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":75,"name":"Diana Haley","plusOne":true,"plusOneName":"Larry Haley","email":"dhjax@aol.com","address":{"line1":"534 Wellington Drive","line2":"","city":"Wyckoff","state":"NJ","zip":"7481"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":76,"name":"Karlatta Ryan","plusOne":true,"plusOneName":"Ron Ryan","email":"","address":{"line1":"306 Brown Bear Run","line2":"","city":"St. John\u2019s","state":"Fl.","zip":"32259"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":77,"name":"Ryanne Lewis","plusOne":true,"plusOneName":"Eddie Lewis","email":"","address":{"line1":"","line2":"","city":"","state":"","zip":""},"venues":{"Picnic":null,"Ortliebs":null}},{"id":78,"name":"Jeanmarie Gueont","plusOne":false,"plusOneName":"","email":"","address":{"line1":"","line2":"","city":"","state":"","zip":""},"venues":{"Picnic":null,"Ortliebs":null}},{"id":79,"name":"Tom Hart","plusOne":true,"plusOneName":"Anita Hart","email":"","address":{"line1":"10579 Chillingham Dr","line2":"","city":"Las Vegas","state":"89183","zip":""},"venues":{"Picnic":null,"Ortliebs":null}},{"id":80,"name":"John Verfurth","plusOne":true,"plusOneName":"Theresa Verfurth","email":"","address":{"line1":"5775 Torrey Pines Ave.","line2":"","city":"Westerville","state":"OH","zip":"43082"},"venues":{"Picnic":null,"Ortliebs":null}}]
;

export default function GuestRSVP() {
  const [guests, setGuests] = useState([]);
  const [query, setQuery] = useState("");
  const [step, setStep] = useState("search"); // search | rsvp | confirm
  const [selected, setSelected] = useState(null);
  const [venues, setVenues] = useState({ Picnic: null, Ortliebs: null });
  const [plusOne, setPlusOne] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const ref = doc(db, "wedding", "guests");
        const snap = await getDoc(ref);
        if (snap.exists() && snap.data().list?.length > 0) {
          setGuests(snap.data().list);
        } else {
          setGuests(SEED_GUESTS);
          await setDoc(ref, { list: SEED_GUESTS });
        }
      } catch (e) {
        console.error("Firebase load error:", e);
        setGuests(SEED_GUESTS);
      }
    }
    load();
  }, []);

  const results = query.trim().length >= 2
    ? guests.filter(g => g.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  function selectGuest(g) {
    setSelected(g);
    setVenues({ Picnic: g.venues?.Picnic ?? null, Ortliebs: g.venues?.Ortliebs ?? null });
    setPlusOne(g.plusOneConfirmed ?? false);
    setContactEmail(g.contactEmail ?? g.email ?? "");
    setContactPhone(g.contactPhone ?? "");
    setStep("rsvp");
  }

  function setVenue(key, val) {
    setVenues(prev => ({ ...prev, [key]: val }));
  }

  async function submit() {
    const updated = guests.map(g =>
      g.id === selected.id
        ? { ...g, venues: { ...g.venues, ...venues }, plusOneConfirmed: plusOne, contactEmail, contactPhone }
        : g
    );
    setGuests(updated);
    try {
      await setDoc(doc(db, "wedding", "guests"), { list: updated });
    } catch (e) {
      console.error("Firebase save error:", e);
    }
    setStep("confirm");
  }

  const canSubmit = venues.Picnic !== null && venues.Ortliebs !== null;

  return (
    <div className="page">
      <style>{CSS}</style>

      {/* Hero */}
      <div className="hero">
        <div className="hero-eyebrow">W e ' r e &nbsp; G e t t i n g &nbsp; M a r r i e d</div>
        <div className="hero-names">
          <em>Kaitlin</em>
          <span className="hero-ampersand"> &amp; </span>
          <em>Eric</em>
        </div>
        <div className="hero-divider" />
        <div className="hero-date">May 23, 2026 &nbsp;·&nbsp; Philadelphia, PA</div>
        <div style={{ marginTop: 16 }}>
          <span className="hero-tagline">Please RSVP by April 10th</span>
        </div>
      </div>

      <div className="main">

        {/* ── STEP: SEARCH ── */}
        {step === "search" && (
          <div className="step">
            <div className="step-title">Find Your Invitation</div>
            <div className="step-subtitle">Enter your name as it appears on your invitation</div>

            <div className="name-field">
              <input
                className="name-input"
                placeholder="Your name..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoFocus
              />
            </div>

            {query.trim().length >= 2 && results.length > 0 && (
              <div className="results-list">
                {results.map(g => (
                  <div key={g.id} className="result-item" onClick={() => selectGuest(g)}>
                    <span>{g.name}</span>
                    <span className="result-arrow">→</span>
                  </div>
                ))}
              </div>
            )}

            {query.trim().length >= 2 && results.length === 0 && (
              <>
                <div className="no-result">
                  No invitation found for "{query}"
                </div>
                <div className="notfound-wrap">
                  <div className="notfound-note">Can't find your name?</div>
                  <div className="notfound-hint">Try a different spelling, or contact Kaitlin & Eric directly.</div>
                </div>
              </>
            )}

            {guests.length === 0 && (
              <div className="no-result" style={{ marginTop: 16 }}>
                The guest list hasn't been set up yet — check back soon!
              </div>
            )}
          </div>
        )}

        {/* ── STEP: RSVP ── */}
        {step === "rsvp" && selected && (
          <div className="step">
            <div className="guest-greeting">Hello, <em>{selected.name}</em></div>
            <div className="guest-sub">Will you be joining us?</div>

            <div className="venues-stack">
              {VENUES.map(v => (
                <div className="venue-card" key={v.key}>
                  <div className="venue-header">
                    <span className="venue-icon">{v.icon}</span>
                    <span className="venue-label">{v.key}</span>
                    <span className="venue-detail">{v.detail}</span>
                  </div>
                  <div className="choice-row">
                    <button
                      className={`choice-btn${venues[v.key] === true ? " yes" : ""}`}
                      onClick={() => setVenue(v.key, true)}
                    >Joyfully Accepts</button>
                    <button
                      className={`choice-btn${venues[v.key] === false ? " no" : ""}`}
                      onClick={() => setVenue(v.key, false)}
                    >Regretfully Declines</button>
                  </div>
                </div>
              ))}
            </div>

            {selected.plusOne && selected.plusOneName && (
              <div className="plusone-card">
                <div className="plusone-text">
                  <div className="plusone-title">Plus One</div>
                  <div className="plusone-sub">Will <em style={{fontStyle:"italic", color:"var(--dusty-rose)"}}>{selected.plusOneName}</em> be joining you?</div>
                </div>
                <div className="toggle-wrap">
                  <span className="toggle-label">{plusOne ? "Yes" : "No"}</span>
                  <button
                    className={`toggle${plusOne ? " on" : ""}`}
                    onClick={() => setPlusOne(p => !p)}
                  />
                </div>
              </div>
            )}

            <div className="contact-card">
              <div className="contact-label">
                ✉ Email <span className="contact-optional">— optional</span>
              </div>
              <input
                className="contact-input"
                type="email"
                placeholder="your@email.com"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
              />
            </div>

            <div className="contact-card" style={{ marginBottom: 28 }}>
              <div className="contact-label">
                📱 Phone <span className="contact-optional">— optional</span>
              </div>
              <input
                className="contact-input"
                type="tel"
                placeholder="(000) 000-0000"
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)}
              />
            </div>

            <button className="submit-btn" disabled={!canSubmit} onClick={submit}>
              Submit RSVP
            </button>

            {!canSubmit && (
              <p style={{ textAlign: "center", fontSize: 11, color: "var(--blush)", marginTop: 12, letterSpacing: "1px" }}>
                Please respond to both events above
              </p>
            )}
          </div>
        )}

        {/* ── STEP: CONFIRM ── */}
        {step === "confirm" && selected && (
          <div className="confirm-wrap step">
            <div className="confirm-icon">
              {venues.Picnic === true || venues.Ortliebs === true ? "🪩" : "💌"}
            </div>
            <div className="confirm-title">
              {venues.Picnic === true || venues.Ortliebs === true
                ? <>We can't wait to <em>celebrate</em> with you!</>
                : <>We'll <em>miss</em> you!</>}
            </div>
            <p className="confirm-sub">
              {selected.name}, your RSVP has been received.<br />
              {venues.Picnic === true || venues.Ortliebs === true
                ? "We're so excited to celebrate with you on May 23rd in Philadelphia."
                : "Thank you for letting us know — we hope to see you soon."}
            </p>
            <div className="confirm-venues">
              {VENUES.map(v => (
                <div className="confirm-venue-row" key={v.key}>
                  <span className="confirm-venue-name">{v.key}</span>
                  {venues[v.key] === true
                    ? <span className="confirm-status-yes">✓ Attending</span>
                    : <span className="confirm-status-no">✗ Declined</span>}
                </div>
              ))}
              {plusOne && selected.plusOneName && (
                <div className="confirm-venue-row">
                  <span className="confirm-venue-name">Plus One</span>
                  <span className="confirm-status-yes">✓ {selected.plusOneName}</span>
                </div>
              )}
            </div>
            <button className="back-btn" onClick={() => { setStep("search"); setQuery(""); setSelected(null); }}>
              RSVP for Another Guest
            </button>
          </div>
        )}

      </div>

      <div className="footer">Kaitlin &amp; Eric · May 23, 2026 · Philadelphia</div>
    </div>
  );
}
