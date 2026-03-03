import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDE6cnSP-WxTGh7OS7QIZFYe_vNNUzOFLk",
  authDomain: "chowmoto-rsvp.firebaseapp.com",
  projectId: "chowmoto-rsvp",
  storageBucket: "chowmoto-rsvp.firebasestorage.app",
  messagingSenderId: "246753994914",
  appId: "1:246753994914:web:4733bfeb2bed1e8a564ffb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const VENUES = ["Picnic", "Ortliebs"];

const SEED_GUESTS = [{"id":1,"name":"Jeffrey Chow","plusOne":false,"plusOneName":"","email":"jeffchow825@gmail.com","address":{"line1":"","line2":"","city":"","state":"","zip":""},"venues":{"Picnic":null,"Ortliebs":null}},{"id":2,"name":"Dylan Chow","plusOne":true,"plusOneName":"Isabelle Artes","email":"dylanchow11375@gmail.com","address":{"line1":"21-32 Hoyt Ave. S","line2":"Apt.3","city":"Astoria","state":"NY","zip":"11102"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":3,"name":"Kylie Chow","plusOne":true,"plusOneName":"Eduardo Ortiz","email":"kyliechow275@gmail.com","address":{"line1":"24-28 35th St.","line2":"Apt 1","city":"Astoria","state":"NY","zip":"11103"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":4,"name":"Brandon Chow","plusOne":true,"plusOneName":"Megan Javitch","email":"brandonchow275@gmail.com","address":{"line1":"40-05 Cresent St.","line2":"Apt. 5D","city":"Long Island City","state":"NY","zip":"11101"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":5,"name":"Bethie Clarke","plusOne":false,"plusOneName":"","email":"betser70@gmail.com","address":{"line1":"2826 Barkley Ave.","line2":"","city":"Bronx","state":"NY","zip":"10465"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":6,"name":"Julie Iurato","plusOne":false,"plusOneName":"","email":"julie.i@verizon.net","address":{"line1":"824 Revere Avenue","line2":"","city":"Bronx","state":"NY","zip":"10465"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":7,"name":"Michael Iurato","plusOne":true,"plusOneName":"Jaime Iurato","email":"Michaeliurato23@gmail.com","address":{"line1":"3151 Valhalla Drive","line2":"","city":"Bronx","state":"NY","zip":"10465"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":8,"name":"Jessie OConnor","plusOne":true,"plusOneName":"Chris OConnor","email":"joconnor427@gmail.com","address":{"line1":"2918 Zulette Ave.","line2":"","city":"Bronx","state":"NY","zip":"10461"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":9,"name":"Cely Wilfinger","plusOne":false,"plusOneName":"","email":"celywilfinger@gmail.com","address":{"line1":"2826 Barkley Ave.","line2":"","city":"Bronx","state":"NY","zip":"10465"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":10,"name":"Matt Wilfinger","plusOne":true,"plusOneName":"Terri Ozoroski","email":"matt.wilfinger@gmail.com","address":{"line1":"155 Andover Pl","line2":"","city":"Robbinsville","state":"NJ","zip":"8691"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":11,"name":"Laura Wilfinger","plusOne":false,"plusOneName":"","email":"laura.e.wilfinger@gmail.com","address":{"line1":"103 Sawmill Dr","line2":"","city":"Berkeley Heights","state":"NJ","zip":"7843"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":12,"name":"Mike Mikitik","plusOne":true,"plusOneName":"Janice Mikitik","email":"mmikitik@gmail.com","address":{"line1":"1 Bass Rock Road","line2":"","city":"Hopatcong","state":"NJ","zip":"7843"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":13,"name":"Derek Mikitik","plusOne":true,"plusOneName":"Erika Grill","email":"dmikitik@yahoo.com","address":{"line1":"37 Colonial Ave.","line2":"","city":"Warwick","state":"NY","zip":"10990"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":14,"name":"Kyle Mikitik","plusOne":true,"plusOneName":"Melissa Bickar","email":"kylemikitik@gmail.com","address":{"line1":"1 Bass Rock Road","line2":"","city":"Hopatcong","state":"NJ","zip":"7843"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":15,"name":"Theresa Suarez","plusOne":true,"plusOneName":"Eddie Suarez","email":"tsuarezm@aol.com","address":{"line1":"2 Hockey Road","line2":"","city":"Mastic Beach","state":"NY","zip":"11951"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":16,"name":"James Wilfinger","plusOne":false,"plusOneName":"","email":"jimmyvid11@gmail.com","address":{"line1":"1815 Summerfield Street","line2":"Apt. B4","city":"Ridgewood","state":"NY","zip":"11385"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":17,"name":"Ken Chow","plusOne":true,"plusOneName":"Jan Chow","email":"chowmean@verizon.net","address":{"line1":"9543 SW 71st Loop","line2":"","city":"Ocala","state":"FL","zip":"34481"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":18,"name":"Michael Chow","plusOne":true,"plusOneName":"Erica Chow","email":"mchow729@gmail.com","address":{"line1":"11 Frazer Ct.","line2":"","city":"Greenlawn","state":"NY","zip":"11740"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":19,"name":"Ryan Chow","plusOne":true,"plusOneName":"Stephanie Chow","email":"Metsboy4@gmail.com","address":{"line1":"18 S Dorado Circle","line2":"Apt. 2H","city":"Hauppauge","state":"NY","zip":"11788"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":20,"name":"Deb Wong","plusOne":true,"plusOneName":"Jan Wong","email":"mamaduck5@aol.com","address":{"line1":"333 Pearl Street","line2":"Apt 10L","city":"New York","state":"NY","zip":"10038"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":21,"name":"Kim Haggart","plusOne":true,"plusOneName":"Charlie Haggart","email":"wong.haggart@gmail.com","address":{"line1":"1416 Aspen St. NW","line2":"","city":"Washington","state":"DC","zip":"20012"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":22,"name":"Kourtney Wong","plusOne":false,"plusOneName":"","email":"kourtney.b.wong@gmail.com","address":{"line1":"1868 Columbia Rd. NW","line2":"#311","city":"Washington","state":"DC","zip":"20009"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":23,"name":"Kayla Wong Kelly","plusOne":true,"plusOneName":"Alex Kelly","email":"kaylawongkelly@gmail.com","address":{"line1":"374 7th St.","line2":"Apt. 201","city":"Jersey City","state":"NJ","zip":"7302"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":24,"name":"Dave Rinefierd","plusOne":true,"plusOneName":"Stephanie Rinefierd","email":"dave298@verizon.net","address":{"line1":"298 Bow Dr.","line2":"","city":"Hauppauge","state":"NY","zip":"11788"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":25,"name":"Lindsay Guiles","plusOne":true,"plusOneName":"Brian Guiles","email":"lindsay.rinefierd@gmail.com","address":{"line1":"189 McMane Ave.","line2":"","city":"Berkeley Heights","state":"NJ","zip":"7922"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":26,"name":"Taylor Rinefierd","plusOne":false,"plusOneName":"","email":"trinefierd01@gmail.com","address":{"line1":"151 W 87th St.","line2":"Apt. 1A","city":"NY","state":"NY","zip":"10024"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":27,"name":"Mackenzie Reller","plusOne":true,"plusOneName":"Bryan Reller","email":"kenzie298@gmail.com","address":{"line1":"3209 Orchestra Court","line2":"","city":"Apex","state":"NC","zip":"27539"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":28,"name":"Clay Chin","plusOne":true,"plusOneName":"Kathy Chin","email":"chin2win@optonline.net","address":{"line1":"32 Executive Dr.","line2":"","city":"Hauppauge","state":"NY","zip":"11788"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":29,"name":"Tyler Chin","plusOne":true,"plusOneName":"Eva Chin","email":"tyler.chin77@gmail.com","address":{"line1":"700 Rankin St. NE","line2":"Apt. 1917","city":"Atlanta","state":"GA","zip":"30308"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":30,"name":"Dakota Chin","plusOne":true,"plusOneName":"Grace Brasky","email":"dakota.chin21@gmail.com","address":{"line1":"108-20 71st Ave.","line2":"Apt. 14D","city":"Forest Hills","state":"NY","zip":"11375"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":31,"name":"Max Chin","plusOne":true,"plusOneName":"Zoe Thoennes","email":"maxchin42@gmail.com","address":{"line1":"115 2nd Street NE","line2":"Apt. 14","city":"Washington","state":"DC","zip":"20002"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":32,"name":"Triple Edwards","plusOne":true,"plusOneName":"Todd Kennedy","email":"g21triple@gmail.com","address":{"line1":"215 Park Row","line2":"Apt. 10A","city":"New York","state":"NY","zip":"10038"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":33,"name":"Frank Kenna","plusOne":true,"plusOneName":"Stacey Kenna","email":"fkkenna@yahoo.com","address":{"line1":"95-18 68th Ave.","line2":"","city":"Forest Hills","state":"NY","zip":"11375"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":34,"name":"Connor Kenna","plusOne":false,"plusOneName":"","email":"","address":{"line1":"95-18 68th Ave.","line2":"","city":"Forest Hills","state":"NY","zip":"11375"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":35,"name":"Uncle Brad Chin","plusOne":false,"plusOneName":"","email":"bchin1231@gmail.com","address":{"line1":"215 Park Row","line2":"Apt. 14D","city":"New York","state":"NY","zip":"10038"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":36,"name":"Trisha Novy","plusOne":false,"plusOneName":"","email":"thecray1016@gmail.com","address":{"line1":"135 Montgomery St.","line2":"Apt. 9A","city":"Jersey City","state":"NJ","zip":"7302"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":37,"name":"Randall Quan","plusOne":false,"plusOneName":"","email":"ranquan@gmail.com","address":{"line1":"","line2":"","city":"","state":"","zip":""},"venues":{"Picnic":null,"Ortliebs":null}},{"id":38,"name":"Marlon Quan","plusOne":true,"plusOneName":"Florene Quan","email":"mquan22@gmail.com","address":{"line1":"28 Jays Corner","line2":"","city":"Somerset","state":"NJ","zip":"7424"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":39,"name":"Gail Quan Popovic","plusOne":true,"plusOneName":"Dusan Popovic","email":"gail.quan.nyc@gmail.com","address":{"line1":"215 Park Row","line2":"Apt. 9A","city":"New York","state":"NY","zip":"10038"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":40,"name":"Glen Tsurumoto","plusOne":false,"plusOneName":"","email":"","address":{"line1":"2821 Lou Ann Dr.","line2":"#E123","city":"Modesto","state":"CA","zip":"95350"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":41,"name":"Lynn Tsurumoto","plusOne":false,"plusOneName":"","email":"lynnmarie.molloy@gmail.com","address":{"line1":"515 Dry Branch Way","line2":"","city":"Saint John's","state":"FL","zip":"32259"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":42,"name":"Ian Tsurumoto","plusOne":true,"plusOneName":"Ryan Anderson","email":"","address":{"line1":"13885 Crestview Circle NW","line2":"","city":"Silverdale","state":"WA","zip":"98383"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":43,"name":"Maxwell Tsurumoto","plusOne":true,"plusOneName":"Gabriella Castillo","email":"Mgtsurumoto@gmail.com","address":{"line1":"1302 Hopyard Rd.","line2":"Apt. 40","city":"Pleasanton","state":"CA","zip":"94566"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":44,"name":"Dan Tsurumoto","plusOne":true,"plusOneName":"Stephanie Tsurumoto","email":"","address":{"line1":"5974 Skyfarm Drive","line2":"","city":"Castro Valley","state":"CA","zip":"94552"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":45,"name":"Tim Tsurumoto","plusOne":false,"plusOneName":"","email":"","address":{"line1":"16300 Orange Blossom Rd #27","line2":"","city":"Oakdale","state":"CA","zip":"95361"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":46,"name":"Laurie Alvich","plusOne":false,"plusOneName":"","email":"","address":{"line1":"196 Tinley Park Circle","line2":"","city":"Delaware","state":"OH","zip":"43015"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":47,"name":"Alicia Alvich","plusOne":true,"plusOneName":"Michael Waite","email":"","address":{"line1":"196 Tinley Park Circle","line2":"","city":"Delaware","state":"OH","zip":"43015"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":48,"name":"Christa Semans","plusOne":true,"plusOneName":"Ben Semans","email":"","address":{"line1":"1030 Putney Drive","line2":"","city":"Columbus","state":"OH","zip":"43085"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":49,"name":"Jenna Alvich","plusOne":true,"plusOneName":"Kenny","email":"","address":{"line1":"3001 Angelo Joseph lane","line2":"unit 206","city":"Columbus","state":"OH","zip":"43204"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":50,"name":"Edward Molloy","plusOne":true,"plusOneName":"Maxine Shapiro Molloy","email":"","address":{"line1":"5311 Poster Lane","line2":"","city":"Fayetteville","state":"NY","zip":"13066"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":51,"name":"Megan Kuqbisa","plusOne":true,"plusOneName":"Don Kuqbisa","email":"","address":{"line1":"84 Latchmere Drive","line2":"","city":"Victor","state":"NY","zip":"14564"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":52,"name":"Andy Hemmert","plusOne":true,"plusOneName":"Anne Hemmert","email":"","address":{"line1":"8124 Subbase PMB 558","line2":"","city":"St Thomas","state":"VI","zip":"802"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":53,"name":"Rob Hemmert","plusOne":false,"plusOneName":"","email":"","address":{"line1":"40 40 Messina Dr","line2":"","city":"Lake Mary","state":"FL","zip":"32746"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":54,"name":"Tim Molloy","plusOne":true,"plusOneName":"Judy Molloy","email":"","address":{"line1":"85813 Territorial Highway","line2":"","city":"Eugene","state":"OR","zip":"97402"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":55,"name":"Amanda Viens","plusOne":true,"plusOneName":"Isaac Ellman","email":"","address":{"line1":"23 Burwood Ave.","line2":"","city":"Stamford","state":"CT","zip":"6902"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":56,"name":"Jakob Saidman","plusOne":true,"plusOneName":"Zoe King","email":"","address":{"line1":"29 Elm Street","line2":"","city":"Sleepy Hollow","state":"NY","zip":"10591"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":57,"name":"Shane Meehan","plusOne":true,"plusOneName":"Dixie Hodge","email":"","address":{"line1":"2225 Latona St","line2":"","city":"Philadelphia","state":"PA","zip":"19146"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":58,"name":"Jeff Wilburn","plusOne":false,"plusOneName":"","email":"","address":{"line1":"","line2":"","city":"","state":"","zip":""},"venues":{"Picnic":null,"Ortliebs":null}},{"id":59,"name":"Rachel Randolph","plusOne":true,"plusOneName":"Mark Masih","email":"","address":{"line1":"","line2":"","city":"","state":"","zip":""},"venues":{"Picnic":null,"Ortliebs":null}},{"id":60,"name":"Lydia Schrader","plusOne":true,"plusOneName":"Brent Schrader","email":"","address":{"line1":"78 E Broadway","line2":"","city":"Gettysburg","state":"PA","zip":"17325"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":61,"name":"Caroline O'Brien","plusOne":true,"plusOneName":"Angel Ocana","email":"hellocollo@gmail.com","address":{"line1":"708 S Perth St.","line2":"","city":"A","state":"Philadelphia","zip":""},"venues":{"Picnic":null,"Ortliebs":null}},{"id":62,"name":"Cassie Beyer","plusOne":true,"plusOneName":"Jon Becker","email":"cbeyer10489@gmail.com","address":{"line1":"212 Jefferson Ave.","line2":"","city":"Downingtown","state":"PA","zip":"19335"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":63,"name":"John Kessler","plusOne":true,"plusOneName":"Corinne Harris","email":"","address":{"line1":"1430 Princeton St.","line2":"Apt. 4","city":"Santa Monica","state":"CA","zip":"90404"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":64,"name":"Sarah Champey","plusOne":true,"plusOneName":"Pat Champey","email":"","address":{"line1":"206 Creek Trail","line2":"","city":"Madison","state":"AL","zip":"35758"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":65,"name":"Barbara Anastacio","plusOne":true,"plusOneName":"Adrian Anastacio","email":"barbaramangino@gmail.com","address":{"line1":"48 Kerema Ave.","line2":"","city":"Milford","state":"CT","zip":"6460"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":66,"name":"Stephanie Morrissey","plusOne":true,"plusOneName":"Brian Morrissey","email":"stephm1290@gmail.com","address":{"line1":"863 Catalpa Drive","line2":"","city":"Franklin Square","state":"NY","zip":"11010"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":67,"name":"Laura Mangino","plusOne":true,"plusOneName":"Laura's +1?","email":"lauramangino@gmail.com","address":{"line1":"134 Rivercliff Drive","line2":"","city":"Milford","state":"CT","zip":"6460"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":68,"name":"Ken Cairns","plusOne":true,"plusOneName":"Allison Nible","email":"","address":{"line1":"639 Belgrade St.","line2":"","city":"Philadelphia","state":"PA","zip":"19125"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":69,"name":"Ben Kaye","plusOne":true,"plusOneName":"Kat Lee","email":"","address":{"line1":"382 Lefferts Ave.","line2":"Apt. 6F","city":"Brooklyn","state":"NY","zip":"11225"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":70,"name":"Ken Grand Pierre","plusOne":false,"plusOneName":"","email":"","address":{"line1":"538 Graham Ave.","line2":"Apt. 3R","city":"Brooklyn","state":"NY","zip":"11222"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":71,"name":"Nina Westervelt","plusOne":true,"plusOneName":"Todd Stambaugh","email":"","address":{"line1":"4135 47th St.","line2":"","city":"Sunnyside","state":"NY","zip":"11104"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":72,"name":"Shannon Sheridan","plusOne":true,"plusOneName":"Rory Sheridan","email":"","address":{"line1":"5504 13th Street NW","line2":"","city":"Washington","state":"DC","zip":"20011"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":73,"name":"Laurie Larson","plusOne":false,"plusOneName":"","email":"lburnslarson@yahoo.com","address":{"line1":"80 Oakland Ave.","line2":"","city":"Colonial Heights","state":"NY","zip":"10710"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":74,"name":"Tracy Nagler","plusOne":true,"plusOneName":"Larry Nagler","email":"tnagler@centenergy.com","address":{"line1":"5258 Stratford Court","line2":"","city":"Cape Coral","state":"FL","zip":"33904"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":75,"name":"Diana Haley","plusOne":true,"plusOneName":"Larry Haley","email":"dhjax@aol.com","address":{"line1":"534 Wellington Drive","line2":"","city":"Wyckoff","state":"NJ","zip":"7481"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":76,"name":"Karlatta Ryan","plusOne":true,"plusOneName":"Ron Ryan","email":"","address":{"line1":"306 Brown Bear Run","line2":"","city":"St. John\u2019s","state":"Fl.","zip":"32259"},"venues":{"Picnic":null,"Ortliebs":null}},{"id":77,"name":"Ryanne Lewis","plusOne":true,"plusOneName":"Eddie Lewis","email":"","address":{"line1":"","line2":"","city":"","state":"","zip":""},"venues":{"Picnic":null,"Ortliebs":null}},{"id":78,"name":"Jeanmarie Gueont","plusOne":false,"plusOneName":"","email":"","address":{"line1":"","line2":"","city":"","state":"","zip":""},"venues":{"Picnic":null,"Ortliebs":null}},{"id":79,"name":"Tom Hart","plusOne":true,"plusOneName":"Anita Hart","email":"","address":{"line1":"10579 Chillingham Dr","line2":"","city":"Las Vegas","state":"89183","zip":""},"venues":{"Picnic":null,"Ortliebs":null}},{"id":80,"name":"John Verfurth","plusOne":true,"plusOneName":"Theresa Verfurth","email":"","address":{"line1":"5775 Torrey Pines Ave.","line2":"","city":"Westerville","state":"OH","zip":"43082"},"venues":{"Picnic":null,"Ortliebs":null}}]
;

const STYLES = `
  @import url('https://db.onlinewebfonts.com/c/014289f5382a33edc09284a90947e6fd?family=Moret+Extrabold');
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --lime:      #cdd84a;
    --lime-dark: #b8c235;
    --lime-light:#d8e460;
    --burg:      #5a0e1e;
    --burg-mid:  #7a1828;
    --white:     #ffffff;
    --border:    rgba(90,14,30,0.18);
    --border-strong: rgba(90,14,30,0.35);
    --glass:     rgba(255,255,255,0.45);
    --glass-hover: rgba(255,255,255,0.65);
  }

  body {
    background: var(--lime);
    min-height: 100vh;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    color: var(--burg);
  }

  .app {
    min-height: 100vh;
    background: var(--lime);
  }

  /* Header */
  .header {
    background: var(--burg);
    color: var(--lime);
    text-align: center;
    padding: 44px 24px 36px;
    position: relative;
    overflow: hidden;
  }
  .header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 120%, rgba(205,216,74,0.15) 0%, transparent 65%);
    pointer-events: none;
  }
  .header-eyebrow {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 9px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: var(--lime);
    margin-bottom: 12px;
    position: relative;
    opacity: 0.7;
  }
  .header h1 {
    font-family: 'Moret Extrabold', serif;
    font-weight: 400;
    font-size: clamp(32px, 5vw, 54px);
    line-height: 1.05;
    position: relative;
    margin-bottom: 8px;
    color: var(--lime);
    letter-spacing: 0px;
  }
  .header h1 em {
    font-style: italic;
    color: var(--lime);
  }
  .header-sub {
    font-size: 9px;
    font-weight: 400;
    color: var(--lime);
    letter-spacing: 4px;
    text-transform: uppercase;
    position: relative;
    margin-top: 10px;
    opacity: 0.55;
  }

  /* Tabs */
  .tabs {
    display: flex;
    border-bottom: 1px solid var(--border-strong);
    background: var(--glass);
    padding: 0 24px;
    gap: 0;
    overflow-x: auto;
    backdrop-filter: blur(4px);
  }
  .tab {
    padding: 16px 28px;
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--burg);
    cursor: pointer;
    border: none;
    background: none;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
    white-space: nowrap;
    opacity: 0.5;
  }
  .tab:hover { opacity: 0.8; }
  .tab.active {
    opacity: 1;
    border-bottom-color: var(--burg);
  }

  /* Content area */
  .content {
    max-width: 960px;
    margin: 0 auto;
    padding: 32px 20px;
  }

  /* Stats row */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
    margin-bottom: 28px;
  }
  .stat-card {
    background: var(--glass);
    border: 1px solid var(--border-strong);
    padding: 20px 16px;
    text-align: center;
  }
  .stat-number {
    font-family: 'Moret Extrabold', serif;
    font-size: 44px;
    font-weight: 400;
    color: var(--burg);
    line-height: 1;
  }
  .stat-label {
    font-size: 8px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--burg);
    margin-top: 6px;
    font-weight: 500;
    opacity: 0.5;
  }
  .stat-card.gold .stat-number { color: var(--burg-mid); }
  .stat-card.green .stat-number { color: var(--burg); }
  .stat-card.muted .stat-number { color: var(--burg); opacity: 0.35; }

  /* Guest RSVP form */
  .rsvp-section {
    background: var(--glass);
    border: 1px solid var(--border-strong);
    padding: 28px;
    margin-bottom: 24px;
  }
  .section-title {
    font-family: 'Moret Extrabold', serif;
    font-size: 22px;
    font-weight: 400;
    color: var(--burg);
    margin-bottom: 20px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--border);
  }
  .search-row {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }
  .input {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid var(--border-strong);
    background: rgba(255,255,255,0.5);
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: var(--burg);
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .input:focus { border-color: var(--burg); background: rgba(255,255,255,0.8); }
  .input::placeholder { color: rgba(90,14,30,0.35); }
  .btn {
    padding: 12px 22px;
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    font-weight: 500;
  }
  .btn-primary {
    background: var(--burg);
    color: var(--lime);
    border: none;
  }
  .btn-primary:hover { background: var(--burg-mid); }
  .btn-gold {
    background: var(--burg);
    color: var(--lime);
    border: none;
  }
  .btn-gold:hover { background: var(--burg-mid); }
  .btn-outline {
    background: transparent;
    border: 1px solid var(--border-strong);
    color: var(--burg);
    opacity: 0.65;
  }
  .btn-outline:hover { opacity: 1; border-color: var(--burg); }
  .btn-sm {
    padding: 7px 12px;
    font-size: 8px;
    letter-spacing: 1.5px;
  }
  .btn-danger {
    background: transparent;
    border: 1px solid rgba(90,14,30,0.25);
    color: rgba(90,14,30,0.5);
    padding: 7px 12px;
    font-size: 8px;
    letter-spacing: 1.5px;
  }
  .btn-danger:hover { background: rgba(90,14,30,0.08); border-color: rgba(90,14,30,0.5); color: var(--burg); }

  /* Guest search results */
  .search-results {
    border: 1px solid var(--border-strong);
    background: rgba(255,255,255,0.55);
    max-height: 220px;
    overflow-y: auto;
  }
  .search-result-item {
    padding: 13px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    transition: background 0.15s;
  }
  .search-result-item:hover { background: rgba(255,255,255,0.8); }
  .search-result-item:last-child { border-bottom: none; }
  .guest-name-text {
    font-size: 13px;
    color: var(--burg);
    font-weight: 400;
  }
  .guest-status-badge {
    font-size: 8px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 3px 10px;
    font-weight: 500;
  }
  .badge-attending { background: rgba(90,14,30,0.12); color: var(--burg); }
  .badge-declined  { background: rgba(90,14,30,0.06); color: rgba(90,14,30,0.45); }
  .badge-pending   { background: rgba(255,255,255,0.6); color: rgba(90,14,30,0.4); }

  /* RSVP response panel */
  .rsvp-panel {
    background: rgba(255,255,255,0.35);
    border: 1px solid var(--border-strong);
    padding: 24px;
    margin-top: 16px;
  }
  .rsvp-panel-name {
    font-family: 'Moret Extrabold', serif;
    font-size: 26px;
    font-weight: 400;
    color: var(--burg);
    margin-bottom: 20px;
  }
  .venue-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 20px;
  }
  .venue-block {
    background: rgba(255,255,255,0.5);
    border: 1px solid var(--border-strong);
    padding: 18px;
  }
  .venue-name {
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--burg);
    margin-bottom: 12px;
    font-weight: 600;
    opacity: 0.6;
  }
  .rsvp-btns {
    display: flex;
    gap: 8px;
  }
  .rsvp-btn {
    flex: 1;
    padding: 10px;
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    border: 1px solid var(--border-strong);
    background: transparent;
    color: var(--burg);
    transition: all 0.2s;
    font-weight: 500;
    opacity: 0.55;
  }
  .rsvp-btn:hover { opacity: 0.9; border-color: var(--burg); background: rgba(90,14,30,0.06); }
  .rsvp-btn.selected-yes {
    background: var(--burg);
    border-color: var(--burg);
    color: var(--lime);
    opacity: 1;
  }
  .rsvp-btn.selected-no {
    background: rgba(90,14,30,0.1);
    border-color: var(--burg);
    color: var(--burg);
    opacity: 1;
  }
  .plusone-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }
  .plusone-label {
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--burg);
    font-weight: 500;
    opacity: 0.6;
  }
  .toggle {
    width: 44px;
    height: 24px;
    background: rgba(90,14,30,0.15);
    border: 1px solid var(--border-strong);
    border-radius: 12px;
    cursor: pointer;
    position: relative;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .toggle.on { background: var(--burg); border-color: var(--burg); }
  .toggle::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background: var(--lime);
    border-radius: 50%;
    top: 3px;
    left: 3px;
    transition: transform 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
  .toggle.on::after { transform: translateX(20px); }

  /* Add guest section */
  .add-guest-form {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  /* Guest list table */
  .guest-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--glass);
    border: 1px solid var(--border-strong);
  }
  .guest-table th {
    padding: 12px 16px;
    text-align: left;
    font-size: 8px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--burg);
    font-weight: 600;
    border-bottom: 1px solid var(--border-strong);
    background: rgba(255,255,255,0.5);
    opacity: 0.6;
  }
  .guest-table td {
    padding: 13px 16px;
    font-size: 13px;
    font-weight: 300;
    color: var(--burg);
    border-bottom: 1px solid var(--border);
    vertical-align: middle;
  }
  .guest-table tr:last-child td { border-bottom: none; }
  .guest-table tr:hover td { background: rgba(255,255,255,0.45); }
  .actions-cell {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  /* Empty state */
  .empty-state {
    text-align: center;
    padding: 60px 24px;
  }
  .empty-state-icon {
    font-size: 40px;
    margin-bottom: 16px;
    opacity: 0.35;
  }
  .empty-state p {
    font-family: 'Moret Extrabold', serif;
    font-size: 20px;
    font-style: italic;
    font-weight: 400;
    color: var(--burg);
    margin-bottom: 8px;
    opacity: 0.6;
  }
  .empty-state span {
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--burg);
    opacity: 0.4;
    text-transform: uppercase;
  }

  /* Venue filter */
  .filter-row {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    align-items: center;
  }
  .filter-label {
    font-size: 9px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--burg);
    margin-right: 4px;
    font-weight: 600;
    opacity: 0.5;
  }
  .filter-btn {
    padding: 6px 14px;
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border: 1px solid var(--border-strong);
    background: transparent;
    color: var(--burg);
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    transition: all 0.2s;
    opacity: 0.55;
  }
  .filter-btn.active {
    background: var(--burg);
    color: var(--lime);
    border-color: var(--burg);
    opacity: 1;
  }
  .filter-btn:hover:not(.active) { opacity: 0.9; border-color: var(--burg); background: rgba(90,14,30,0.06); }

  /* Search in list */
  .list-search {
    max-width: 300px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    .venue-grid { grid-template-columns: 1fr; }
    .stats-row { grid-template-columns: repeat(2, 1fr); }
    .rsvp-section, .content { padding: 20px 16px; }
    .guest-table th:nth-child(4),
    .guest-table td:nth-child(4) { display: none; }
  }

`;

function getVenueStatus(guest, venue) {
  return guest.venues?.[venue] ?? null; // null = pending, true = attending, false = declined
}

function StatusBadge({ status }) {
  if (status === null || status === undefined) return <span className="guest-status-badge badge-pending">Pending</span>;
  if (status === true) return <span className="guest-status-badge badge-attending">Attending</span>;
  return <span className="guest-status-badge badge-declined">Declined</span>;
}

export default function WeddingRSVP() {
  const [guests, setGuests] = useState([]);
  const [activeTab, setActiveTab] = useState("rsvp");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [newGuestName, setNewGuestName] = useState("");
  const [listSearch, setListSearch] = useState("");
  const [listFilter, setListFilter] = useState("all");
  const [listVenueFilter, setListVenueFilter] = useState("all");
  const [loaded, setLoaded] = useState(false);

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
      setLoaded(true);
    }
    load();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    async function save() {
      try {
        await setDoc(doc(db, "wedding", "guests"), { list: guests });
      } catch (e) {
        console.error("Firebase save error:", e);
      }
    }
    save();
  }, [guests, loaded]);

  const searchResults = searchQuery.trim().length > 0
    ? guests.filter(g =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (g.plusOneName && g.plusOneName.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  function addGuest() {
    const name = newGuestName.trim();
    if (!name) return;
    if (guests.find(g => g.name.toLowerCase() === name.toLowerCase())) return;
    setGuests(prev => [...prev, { id: Date.now(), name, plusOne: false, venues: { Picnic: null, Ortliebs: null } }]);
    setNewGuestName("");
  }

  function deleteGuest(id) {
    setGuests(prev => prev.filter(g => g.id !== id));
    if (selectedGuest?.id === id) setSelectedGuest(null);
  }

  function updateVenue(guestId, venue, value) {
    setGuests(prev => prev.map(g => {
      if (g.id !== guestId) return g;
      const updated = { ...g, venues: { ...g.venues, [venue]: value } };
      if (selectedGuest?.id === guestId) setSelectedGuest(updated);
      return updated;
    }));
  }

  function togglePlusOne(guestId) {
    setGuests(prev => prev.map(g => {
      if (g.id !== guestId) return g;
      const updated = { ...g, plusOne: !g.plusOne };
      if (selectedGuest?.id === guestId) setSelectedGuest(updated);
      return updated;
    }));
  }

  function saveAndClear() {
    setSelectedGuest(null);
    setSearchQuery("");
  }

  // Stats
  const totalGuests = guests.length;
  const totalWithPlusOne = guests.filter(g => g.plusOne).length;
  const ceremonyAttending = guests.filter(g => g.venues.Picnic === true).length + guests.filter(g => g.venues.Picnic === true && g.plusOne).length;
  const receptionAttending = guests.filter(g => g.venues.Ortliebs === true).length + guests.filter(g => g.venues.Ortliebs === true && g.plusOne).length;
  const pendingCount = guests.filter(g => g.venues.Picnic === null || g.venues.Ortliebs === null).length;

  // Filtered guest list
  const filteredGuests = guests.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(listSearch.toLowerCase());
    if (!matchSearch) return false;
    if (listVenueFilter === "all") {
      if (listFilter === "all") return true;
      if (listFilter === "attending") return g.venues.Picnic === true || g.venues.Ortliebs === true;
      if (listFilter === "declined") return g.venues.Picnic === false && g.venues.Ortliebs === false;
      if (listFilter === "pending") return g.venues.Picnic === null || g.venues.Ortliebs === null;
    } else {
      const status = g.venues[listVenueFilter];
      if (listFilter === "all") return true;
      if (listFilter === "attending") return status === true;
      if (listFilter === "declined") return status === false;
      if (listFilter === "pending") return status === null;
    }
    return true;
  });

  return (
    <div className="app">
      <style>{STYLES}</style>

      <div className="header">
        <div className="header-eyebrow">Wedding RSVP Tracker</div>
        <h1>Guest <em>Tracker</em></h1>
        <div className="header-sub">Kaitlin &amp; Eric · May 23, 2026</div>
      </div>

      <div className="tabs">
        {[["rsvp","RSVP"], ["guests","Guest List"], ["add","Add Guests"]].map(([id, label]) => (
          <button key={id} className={`tab${activeTab === id ? " active" : ""}`} onClick={() => setActiveTab(id)}>
            {label}
          </button>
        ))}
      </div>

      <div className="content">
        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card"><div className="stat-number">{totalGuests}</div><div className="stat-label">Total Guests</div></div>
          <div className="stat-card green"><div className="stat-number">{ceremonyAttending}</div><div className="stat-label">Picnic Attending</div></div>
          <div className="stat-card gold"><div className="stat-number">{receptionAttending}</div><div className="stat-label">Ortliebs Attending</div></div>
          <div className="stat-card"><div className="stat-number">{totalWithPlusOne}</div><div className="stat-label">Plus Ones</div></div>
          <div className="stat-card muted"><div className="stat-number">{pendingCount}</div><div className="stat-label">Awaiting RSVP</div></div>
        </div>

        {/* RSVP Tab */}
        {activeTab === "rsvp" && (
          <div className="rsvp-section">
            <div className="section-title">Guest RSVP</div>
            <div className="search-row">
              <input
                className="input"
                placeholder="Search guest name..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setSelectedGuest(null); }}
              />
            </div>
            {searchResults.length > 0 && !selectedGuest && (
              <div className="search-results">
                {searchResults.map(g => (
                  <div key={g.id} className="search-result-item" onClick={() => { setSelectedGuest(g); setSearchQuery(g.name); }}>
                    <span className="guest-name-text">{g.name}</span>
                    <StatusBadge status={g.venues.Picnic === true || g.venues.Ortliebs === true ? true : g.venues.Picnic === false && g.venues.Ortliebs === false ? false : null} />
                  </div>
                ))}
              </div>
            )}
            {searchQuery && searchResults.length === 0 && !selectedGuest && (
              <div style={{ padding: "16px", color: "#9e9286", fontSize: "13px", background: "#faf8f5", border: "1px solid #e0d9cf" }}>
                No guest found matching "{searchQuery}"
              </div>
            )}

            {selectedGuest && (
              <div className="rsvp-panel">
                <div className="rsvp-panel-name">{selectedGuest.name}</div>
                <div className="venue-grid">
                  {VENUES.map(venue => {
                    const status = guests.find(g => g.id === selectedGuest.id)?.venues[venue];
                    return (
                      <div className="venue-block" key={venue}>
                        <div className="venue-name">{venue}</div>
                        <div className="rsvp-btns">
                          <button
                            className={`rsvp-btn${status === true ? " selected-yes" : ""}`}
                            onClick={() => updateVenue(selectedGuest.id, venue, true)}
                          >✓ Attending</button>
                          <button
                            className={`rsvp-btn${status === false ? " selected-no" : ""}`}
                            onClick={() => updateVenue(selectedGuest.id, venue, false)}
                          >✗ Declined</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="plusone-row">
                  <span className="plusone-label">Bringing a plus one?</span>
                  <button
                    className={`toggle${guests.find(g => g.id === selectedGuest.id)?.plusOne ? " on" : ""}`}
                    onClick={() => togglePlusOne(selectedGuest.id)}
                  />
                  <span style={{ fontSize: "12px", color: "#c9a96e" }}>
                    {guests.find(g => g.id === selectedGuest.id)?.plusOne ? "Yes" : "No"}
                  </span>
                </div>
                <button className="btn btn-gold" onClick={saveAndClear}>Save &amp; Done</button>
              </div>
            )}

            {guests.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">💌</div>
                <p>No guests added yet</p>
                <span>Add guests in the "Add Guests" tab first</span>
              </div>
            )}
          </div>
        )}

        {/* Guest List Tab */}
        {activeTab === "guests" && (
          <div>
            <div className="filter-row">
              <span className="filter-label">Venue:</span>
              {["all", ...VENUES].map(v => (
                <button key={v} className={`filter-btn${listVenueFilter === v ? " active" : ""}`} onClick={() => setListVenueFilter(v)}>
                  {v === "all" ? "All" : v}
                </button>
              ))}
              <span className="filter-label" style={{ marginLeft: 12 }}>Status:</span>
              {["all","attending","declined","pending"].map(f => (
                <button key={f} className={`filter-btn${listFilter === f ? " active" : ""}`} onClick={() => setListFilter(f)}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <input className="input list-search" placeholder="Search guests..." value={listSearch} onChange={e => setListSearch(e.target.value)} />
            {filteredGuests.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🌸</div>
                <p>No guests found</p>
                <span>Try adjusting your filters</span>
              </div>
            ) : (
              <table className="guest-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Picnic</th>
                    <th>Ortliebs</th>
                    <th>Plus One</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuests.map(g => (
                    <tr key={g.id}>
                      <td>{g.name}</td>
                      <td style={{ fontSize: "12px", color: "#9e9286" }}>{g.email || "—"}</td>
                      <td><StatusBadge status={g.venues.Picnic} /></td>
                      <td><StatusBadge status={g.venues.Ortliebs} /></td>
                      <td style={{ fontSize: "12px", letterSpacing: "1px" }}>
                        {g.plusOne && g.plusOneName ? (
                          <span style={{
                            color: g.plusOneConfirmed === false ? "rgba(90,14,30,0.3)" : "#5a0e1e",
                            textDecoration: g.plusOneConfirmed === false ? "line-through" : "none",
                            opacity: g.plusOneConfirmed === false ? 0.5 : 1
                          }}>
                            {g.plusOneName}
                          </span>
                        ) : "—"}
                      </td>
                      <td>
                        <div className="actions-cell">
                          <button className="btn btn-outline btn-sm" onClick={() => { setSelectedGuest(g); setSearchQuery(g.name); setActiveTab("rsvp"); }}>Edit</button>
                          <button className="btn btn-danger" onClick={() => deleteGuest(g.id)}>Remove</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Add Guests Tab */}
        {activeTab === "add" && (
          <div className="rsvp-section">
            <div className="section-title">Add a Guest</div>
            <div className="add-guest-form">
              <input
                className="input"
                placeholder="Guest full name..."
                value={newGuestName}
                onChange={e => setNewGuestName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addGuest()}
              />
              <button className="btn btn-primary" onClick={addGuest}>Add Guest</button>
            </div>
            {guests.length > 0 && (
              <div style={{ marginTop: 28 }}>
                <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#9e9286", marginBottom: 12 }}>Recently Added</div>
                {[...guests].reverse().slice(0, 5).map(g => (
                  <div key={g.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f0ebe4" }}>
                    <span style={{ fontSize: "14px", color: "#2c2416" }}>{g.name}</span>
                    <button className="btn btn-danger" onClick={() => deleteGuest(g.id)}>Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
