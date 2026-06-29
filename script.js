const state = {
  stage: 0,
  team: [],
  problem: null,
  techFrontend: null,
  techBackend: null,
  usp: null,
  features: [],
  pitchName: "",
  pitchTagline: "",
  score: null,
};

const STAGES = ["Team", "Problem", "Stack", "USP", "Features", "Pitch", "Submit"];

const ROLES = ["Backend Dev", "Frontend Dev", "Designer", "PM", "ML Engineer", "DevOps"];

const PROBLEMS = [ { tag: "Problem Statement", 
    text: "College canteens have no idea how much food to cook each day, so half gets wasted and half the students go hungry by 1pm. Build something that fixes this." },
  { tag: "Problem Statement", 
text: "Local trains run on a schedule nobody trusts. Riders want to know, in real time, whether it's actually worth running for that train." },
  { tag: "Problem Statement",
     text: "Small shop owners track inventory in a notebook and find out they're out of stock only when a customer asks. Fix the notebook." },
  { tag: "Problem Statement", 
    text: "Hostel residents split bills in a group chat that nobody can parse three days later. Somebody always ends up owing money forever." },
  { tag: "Problem Statement", 
    text: "First-year students have no idea which electives are actually worth taking until it's too late to switch. Seniors know, but that knowledge dies with them." },
  { tag: "Problem Statement",
     text: "Library books get returned late constantly because nobody remembers due dates until the fine email shows up. Build something that fixes this." },
{ tag: "Problem Statement", 
    text: "Gym equipment is always 'in use' because nobody knows who's actually using it or for how long. People just guess and hover awkwardly." },
{ tag: "Problem Statement", 
 text: "Roommates buy the same groceries twice because nobody knows what's already in the fridge until it's rotting. Fix the fridge problem." },
{ tag: "Problem Statement", 
text: "Freelancers chase clients for payment over email threads that get longer and angrier every week. Nobody knows who actually owes what." },
{ tag: "Problem Statement", 
text: "Parking lots near college fill up by 9am and nobody finds out until they've already circled the block four times." },
{ tag: "Problem Statement", 
    text: "Local volunteers and NGOs can't find each other — one has hands, the other has work, and they keep missing each other on WhatsApp groups." },
{ tag: "Problem Statement", 
text: "Lost-and-found items pile up in a box at the front desk that nobody checks until they've already bought a replacement." },
{ tag: "Problem Statement", 
text: "Group projects always end with one person doing 80% of the work and nobody having proof of who did what. Fix the accountability gap." },
{ tag: "Problem Statement", 
text: "Apartment maintenance requests get reported verbally to a watchman who forgets by lunchtime. The leak is still leaking three weeks later." },
{ tag: "Problem Statement", 
text: "Secondhand textbook trading between seniors and juniors happens entirely through scattered, dying WhatsApp groups nobody remembers to check." },
];

const FRONTEND_OPTIONS = ["React", "Vue", "Svelte", "Plain HTML/CSS"];
const BACKEND_OPTIONS = ["Node.js", "Bun", "Django", "Go"];
const USP_OPTIONS = [ { name: "Offline-first", votes: 3 },
  { name: "Dead simple UI", votes: 5 },
{ name: "Real-time sync", votes: 2 },
  { name: "Zero sign-up", votes: 4 }, ];

const DEFAULT_FEATURES = [ "Login & onboarding",
  "Core feature (the actual point)",
  "Dashboard / home screen",
"Notifications",
  "Settings page", ];

let teamIdCounter = 0;

// commit log (signature element of my site)
function commit(path, val){ const log = document.getElementById("commitLines");
  const line = document.createElement("div");
  line.className = "line";
  line.innerHTML = `&gt; <span class="path">${path}</span>.set(<span class="val">"${val}"</span>)`;
log.appendChild(line);
const box = document.getElementById("commitLog");
box.scrollTop = box.scrollHeight; }

// stage pipelines
function renderPips(){ const host = document.getElementById("stagePips");
  host.innerHTML = STAGES.map((s,i) => {
    let cls = "pip";
if(i < state.stage) cls += " done";
    if(i === state.stage) cls += " active";
return `<span class="${cls}">${i+1}. ${s}</span>`; }).join(""); }

// router
function goTo(stageIndex){
  state.stage = stageIndex;
renderPips();
render(); }

function render(){ const host = document.getElementById("stageHost");
const renderers = [ renderTeamStage,
renderProblemStage, renderStackStage,
renderUspStage, renderFeaturesStage,
renderPitchStage, renderSubmitStage, ];
host.innerHTML = "";
renderers[state.stage](host); }

// team building stage 
function renderTeamStage(host){
if(state.team.length === 0){ state.team.push({ id: teamIdCounter++, name: "Anjali", role: "Backend Dev" });
state.team.push({ id: teamIdCounter++, name: "", role: "Designer" }); }

    const card = document.createElement("div");
card.className = "card";
  card.innerHTML = ` <div class="eyebrow">Step 1</div>
<h2>Build your team</h2> <div class="sub">Add your teammates and give them a role. Someone needs to be the backend person — they'll have opinions later.</div>
 <div class="team-grid" id="teamGrid"></div>
<button class="btn" id="addMemberBtn">+ Add teammate</button> <div class="btn-row">
 <button class="btn btn-primary" id="teamNextBtn">Lock in team →</button>
</div> `;
host.appendChild(card);

function drawRows(){ const grid = card.querySelector("#teamGrid"); grid.innerHTML = "";
state.team.forEach((member) => { const row = document.createElement("div");
row.className = "member-row"; row.innerHTML = `  <input type="text" placeholder="Teammate name" value="${member.name}" data-id="${member.id}" class="nameInput">
        <select data-id="${member.id}" class="roleSelect">
${ROLES.map(r => `<option value="${r}" ${r===member.role?'selected':''}>${r}</option>`).join("")}
</select>
        <button class="remove-btn" data-id="${member.id}" title="Remove">✕</button> `;
grid.appendChild(row); });

grid.querySelectorAll(".nameInput").forEach(inp => { inp.addEventListener("input", e => {
const id = Number(e.target.dataset.id);
    state.team.find(m => m.id === id).name = e.target.value;
        validateTeam(); }); });
grid.querySelectorAll(".roleSelect").forEach(sel => { sel.addEventListener("change", e => { const id = Number(e.target.dataset.id);
    state.team.find(m => m.id === id).role = e.target.value; }); });
grid.querySelectorAll(".remove-btn").forEach(btn => { btn.addEventListener("click", e => {
const id = Number(e.target.dataset.id); state.team = state.team.filter(m => m.id !== id);
drawRows(); validateTeam();
}); }); }

function validateTeam(){ const named = state.team.filter(m => m.name.trim().length > 0);
card.querySelector("#teamNextBtn").disabled = named.length === 0; }
drawRows();
validateTeam();
card.querySelector("#addMemberBtn").addEventListener("click", () => { state.team.push({ id: teamIdCounter++, name: "", role: "Frontend Dev" });
drawRows(); validateTeam(); });
card.querySelector("#teamNextBtn").addEventListener("click", () => { state.team = state.team.filter(m => m.name.trim().length > 0);
commit("team", state.team.map(m => `${m.name} (${m.role})`).join(", "));
    goTo(1);
});
}
// problem statement stage 
function renderProblemStage(host){
  if(!state.problem){ state.problem = PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)]; }

const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = ` <div class="eyebrow">Step 2</div>
<h2>Your problem statement</h2> <div class="sub">This is what you're solving. No swapping it for an easier one — that's not how real hackathons work either.</div>
<div class="statement-box">
      <span class="tag">${state.problem.tag}</span>
    ${state.problem.text}
</div>
<div class="btn-row">
    <button class="btn btn-ghost" id="rerollBtn">🎲 Reroll (costs you nothing but dignity :) )</button>
<button class="btn btn-primary" id="acceptBtn">Accept challenge →</button>
</div> `;
  host.appendChild(card);

card.querySelector("#rerollBtn").addEventListener("click", () => { let next;
do { next = PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)]; }
while (next.text === state.problem.text && PROBLEMS.length > 1); state.problem = next;
render(); });

card.querySelector("#acceptBtn").addEventListener("click", () => { commit("problem_statement", state.problem.text.slice(0, 40) + "...");
goTo(2); }); }

// tech stack stage 

function renderStackStage(host){ const card = document.createElement("div");
card.className = "card";
  card.innerHTML = ` <div class="eyebrow">Step 3</div>
<h2>Pick your tech stack</h2>
<div class="sub">A web app is the right call here. Frontend first, then ask your team about the backend.</div>

<div class="section-label">Frontend</div>
<div class="choice-grid" id="frontendGrid"></div>

<div id="adviceSlot"></div>
<div class="section-label">Backend</div>
<div class="choice-grid" id="backendGrid"></div>

<div class="btn-row">
    <button class="btn btn-primary" id="stackNextBtn" disabled>Confirm stack →</button> </div> `;
  host.appendChild(card);

  const fGrid = card.querySelector("#frontendGrid");
  const bGrid = card.querySelector("#backendGrid");
  const adviceSlot = card.querySelector("#adviceSlot");
  const nextBtn = card.querySelector("#stackNextBtn");
  const backendDev = state.team.find(m => m.role === "Backend Dev");

function drawFrontend(){
fGrid.innerHTML = FRONTEND_OPTIONS.map(opt => ` <div class="choice ${state.techFrontend===opt?'selected':''}" data-opt="${opt}">${opt}</div> `).join("");
fGrid.querySelectorAll(".choice").forEach(el => {
el.addEventListener("click", () => {
     state.techFrontend = el.dataset.opt;
commit("tech_stack.frontend", state.techFrontend);
drawFrontend();
    maybeShowAdvice();
checkReady(); });
});
}

function maybeShowAdvice(){ if(state.techFrontend && backendDev && !state.techBackend){
const suggestion = "Bun";
adviceSlot.innerHTML = `
    <div class="advice-box">
<div class="avatar">${backendDev.name.charAt(0).toUpperCase()}</div> <div>
<b>${backendDev.name}</b> (${backendDev.role}): "${state.techFrontend} on the frontend? Cool, don't overthink the backend — go with <b>${suggestion}</b>. It's fast to set up and we won't waste hours fighting config at 2am."
</div>
</div> `; } }

function drawBackend(){ bGrid.innerHTML = BACKEND_OPTIONS.map(opt => `
<div class="choice ${state.techBackend===opt?'selected':''}" data-opt="${opt}">${opt}</div> `).join("");
    bGrid.querySelectorAll(".choice").forEach(el => { el.addEventListener("click", () => { state.techBackend = el.dataset.opt;
commit("tech_stack.backend", state.techBackend); drawBackend();
checkReady(); });
}); }

function checkReady(){ nextBtn.disabled = !(state.techFrontend && state.techBackend); }
drawFrontend();
  drawBackend();
maybeShowAdvice();
  checkReady();

nextBtn.addEventListener("click", () => goTo(3)); }

// usp and team vote stage 

function renderUspStage(host){
const card = document.createElement("div");
card.className = "card";
card.innerHTML = ` <div class="eyebrow">Step 4</div>
<h2>Choose your USP</h2> <div class="sub">What makes your project worth a second look? You can pick yourself, or let the team vote decide.</div>
<div class="choice-grid" id="uspGrid"></div> <div class="btn-row">
    <button class="btn" id="voteBtn">📊 Let the team vote</button>
<button class="btn btn-primary" id="uspNextBtn" disabled>Confirm USP →</button>
</div> `;
host.appendChild(card);

const grid = card.querySelector("#uspGrid");
  const nextBtn = card.querySelector("#uspNextBtn");
let votesRevealed = false;

function drawUsp(){ grid.innerHTML = USP_OPTIONS.map(opt => `<div class="choice ${state.usp===opt.name?'selected':''}" data-opt="${opt.name}">
${opt.name}
${votesRevealed ? `<span class="votes">${opt.votes} vote${opt.votes!==1?'s':''}</span>` : ''}
</div> `).join("");
grid.querySelectorAll(".choice").forEach(el => {
el.addEventListener("click", () => { state.usp = el.dataset.opt;
    commit("usp", state.usp);
drawUsp();
nextBtn.disabled = false;
});
    });
}
drawUsp();

card.querySelector("#voteBtn").addEventListener("click", (e) => { votesRevealed = true;
    const winner = USP_OPTIONS.reduce((a,b) => a.votes > b.votes ? a : b);
state.usp = winner.name;
    commit("usp", state.usp + " (team vote)");
drawUsp();
nextBtn.disabled = false;
e.target.disabled = true;
    e.target.textContent = "✓ Votes counted"; });

  nextBtn.addEventListener("click", () => goTo(4));
}
// drag and drop feature priority stage 
function renderFeaturesStage(host){
if(state.features.length === 0){ state.features = [...DEFAULT_FEATURES]; }

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = ` <div class="eyebrow">Step 5</div>
<h2>Prioritize your features</h2>
<div class="sub">Drag to reorder. Top of the list ships first — be honest about what you can actually finish.</div>
    <div class="feature-list" id="featureList"></div>
<div class="btn-row">
<button class="btn btn-primary" id="featuresNextBtn">Lock priorities →</button>
 </div> `;
host.appendChild(card);

const list = card.querySelector("#featureList");
let dragIndex = null;

function drawList(){ list.innerHTML = "";
state.features.forEach((feat, i) => {
const item = document.createElement("div");
item.className = "feature-item";
    item.draggable = true;
item.dataset.index = i;
    item.innerHTML = `<span class="rank">${i+1}</span><span class="grip">⠿⠿</span><span>${feat}</span>`;

item.addEventListener("dragstart", () => {
dragIndex = i;
item.classList.add("dragging");
});
    item.addEventListener("dragend", () => {
item.classList.remove("dragging"); });
    item.addEventListener("dragover", (e) => e.preventDefault());
item.addEventListener("drop", (e) => {
e.preventDefault();
    const dropIndex = Number(item.dataset.index);
if(dragIndex === null || dragIndex === dropIndex) return;
const moved = state.features.splice(dragIndex, 1)[0];
        state.features.splice(dropIndex, 0, moved);
    dragIndex = null;
    drawList(); });

list.appendChild(item);
});
}
drawList();

card.querySelector("#featuresNextBtn").addEventListener("click", () => { commit("feature_priority", state.features[0]);
goTo(5); });
}

// pitching stage 
// Quick check for real word content — catches keyboard mashing like jkjkkjk or asdasd without needing a dictionary. Not bulletproof, but enough to stop obvious junk from sailing through.
function looksLikeRealText(str, minWords){
  const trimmed = str.trim();
if(trimmed.length === 0) return false;

// rejecting strings that are just one character repeated (like aaaaa)
  if(/^(.)\1*$/.test(trimmed)) return false;

const words = trimmed.split(/\s+/).filter(Boolean);
  if(words.length < minWords) return false;

// every word must have at least one vowel and not be pure keyboard-row mashing. this is a heuristic, not a dictionary check — real short words still pass.
const vowelPattern = /[aeiou]/i;
  const realWords = words.filter(w => {
const letters = w.replace(/[^a-zA-Z]/g, "");
if(letters.length === 0) return false; // pure numbers/symbols don't count as a word
    if(letters.length >= 3 && !vowelPattern.test(letters)) return false; // "jkjkkjk", "xqzpt"
    return true; });

return realWords.length >= minWords;}

function renderPitchStage(host){ const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = ` <div class="eyebrow">Step 6</div>
<h2>Build your pitch</h2> <div class="sub">Two minutes in front of the judge. Name the project, then sell it in one line — actual words, the judge can tell the difference.</div>
<div class="field"> <span class="field-label">Project name</span>
<input type="text" id="pitchNameInput" placeholder="e.g. MessKeeper" value="${state.pitchName}"> <span class="field-error" id="nameError"></span>
</div>
<div class="field">
    <span class="field-label">One-line pitch</span>
<textarea id="pitchTaglineInput" placeholder="What does it do, and why should the judge care?">${state.pitchTagline}</textarea>
<span class="field-error" id="taglineError"></span> </div>
 <div class="btn-row">
<button class="btn btn-primary" id="pitchNextBtn" disabled>Finalize pitch →</button> </div> `;
  host.appendChild(card);

const nameInput = card.querySelector("#pitchNameInput");
  const taglineInput = card.querySelector("#pitchTaglineInput");
const nextBtn = card.querySelector("#pitchNextBtn");
const nameError = card.querySelector("#nameError");
const taglineError = card.querySelector("#taglineError");

function checkReady(){ const nameOk = looksLikeRealText(nameInput.value, 1);
const taglineOk = looksLikeRealText(taglineInput.value, 4);

nameInput.classList.toggle("invalid", nameInput.value.trim().length > 0 && !nameOk);
taglineInput.classList.toggle("invalid", taglineInput.value.trim().length > 0 && !taglineOk);
nameError.textContent = (nameInput.value.trim().length > 0 && !nameOk) ? "That doesn't look like a real name — give your project an actual one." : "";
    taglineError.textContent = (taglineInput.value.trim().length > 0 && !taglineOk) ? "Write a real sentence (at least 4 words) — the judge can tell when it's keyboard mashing."
: "";
nextBtn.disabled = !(nameOk && taglineOk); }

nameInput.addEventListener("input", () => { state.pitchName = nameInput.value; checkReady(); });
  taglineInput.addEventListener("input", () => { state.pitchTagline = taglineInput.value; checkReady(); });
checkReady();

nextBtn.addEventListener("click", () => {
    commit("pitch.name", state.pitchName);
goTo(6);});
}

// final stage of submission and judging 
function renderSubmitStage(host){ const card = document.createElement("div");
  card.className = "card";

if(state.score === null){ card.innerHTML = ` <div class="eyebrow">Step 7</div>
<h2>Final review before you submit</h2> <div class="sub">Here's everything you locked in. Once you submit, the judge sees exactly this.</div>
<div class="recap">
<div>Team <span>${state.team.map(m=>m.name).join(', ')}</span></div>
    <div>Frontend <span>${state.techFrontend}</span></div>
<div>Backend <span>${state.techBackend}</span></div>
<div>USP <span>${state.usp}</span></div> <div>Top feature <span>${state.features[0]}</span></div>
<div>Project <span>${state.pitchName}</span></div>
</div> <div class="btn-row">
<button class="btn btn-primary" id="submitBtn">🚀 Submit to judge</button>
</div> `;
host.appendChild(card);
card.querySelector("#submitBtn").addEventListener("click", () => { commit("submission", "sent to judge");
    state.score = judgeProject();
render(); });
return; }

  const { points, good, lines } = state.score;
  const verdictClass = good ? "good" : "bad";

card.innerHTML = `
<div class="eyebrow">Final verdict</div>
    <div class="verdict">
      <h2>${state.pitchName || "Your project"}</h2>
      <div class="score-num ${verdictClass}">${points}<span class="score-out">/100</span></div>
 </div>
  ${lines.map(l => `
   <div class="judge-line ${verdictClass}">
    <span class="who">The Judge</span>
 ${l}
      </div> `).join("")}
    <div class="btn-row">
      <button class="btn btn-primary" id="restartBtn">↻ Run it again</button>
    </div>
`;
host.appendChild(card);

card.querySelector("#restartBtn").addEventListener("click", () => {  Object.assign(state, {
    stage: 0, team: [], problem: null, techFrontend: null, techBackend: null,
usp: null, features: [], pitchName: "", pitchTagline: "", score: null, });
document.getElementById("commitLines").innerHTML = ""; goTo(0);
});
}

// judging logic 
function judgeProject(){ let points = 40; 
  const lines = [];

  if(state.techBackend === "Bun" || state.techBackend === "Node.js"){
    points += 12;
    lines.push(`Decent stack — ${state.techFrontend} and ${state.techBackend} is a sensible pick for a 24-hour build. Nothing flashy, but it'll actually run.`);} 
else {
    points += 6;
    lines.push(`${state.techFrontend} with ${state.techBackend}? Bold. I hope someone on this team actually knows ${state.techBackend}, because explaining it during Q&A won't save you.`);
}

// USP
if(state.usp === "Dead simple UI" || state.usp === "Zero sign-up"){
    points += 18;
    lines.push(`Going with "${state.usp}" as your USP is smart — judges reward things they can understand in ten seconds. Good instinct.`);} 
   else {
    points += 10;
    lines.push(`"${state.usp}" is a fine USP on paper, but did anyone actually finish building it, or is it a slide?`);}

// feature priority
if(state.features[0] && state.features[0].toLowerCase().includes("core")){
    points += 15;
    lines.push("You prioritized the actual core feature first. Refreshing — most teams build five login pages and call it a day.");}
   else {
    points += 5;
    lines.push(`You built "${state.features[0]}" first instead of the feature that actually solves the problem. Classic hackathon mistake.`);}

  const tagline = state.pitchTagline.trim();
  const taglineWordCount = tagline.split(/\s+/).filter(Boolean).length;
  if(taglineWordCount >= 8){
    points += 10;
    lines.push(`The pitch for "${state.pitchName}" actually explains what it does. Refreshing change from the usual buzzword soup.`);
  } else {
    points += 5;
    lines.push(`Your one-liner for "${state.pitchName}" is technically a sentence, but say more — what does it actually do?`);
  }

// team factor
  if(state.team.length >= 3){ points += 5; } 
else { lines.push("A two-person team for this scope? Respect the hustle, but it shows in the gaps."); }
  points = Math.min(100, Math.max(8, points));
  const good = points >= 60;

if(good){ lines.unshift(`Solid run. This one's actually shippable — approved.`); } 
else { lines.unshift(`I've seen worse. I've also seen much better. Here's the roast you signed up for:`); }

return { points, good, lines };}
renderPips();
render();