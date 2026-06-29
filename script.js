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


