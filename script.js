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

function render(){
  const host = document.getElementById("stageHost");
  const renderers = [
    renderTeamStage,
    renderProblemStage,
    renderStackStage,
    renderUspStage,
    renderFeaturesStage,
    renderPitchStage,
    renderSubmitStage,
  ];
  host.innerHTML = "";
  renderers[state.stage](host);
}
