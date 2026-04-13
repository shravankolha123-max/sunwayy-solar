const API_BASE = "http://localhost:5000";

// =======================
// LANGUAGE TRANSLATIONS
// =======================








const translations = {

en: {
company:"Sunwayy Solar Energy",
home:"Home",
services:"Services",
subsidy:"Subsidy",
contact:"Contact",

hero_title:"Clean Solar Energy for Your Home",
hero_desc:"Save electricity bills with solar installation",
consult:"Get Consultation",

services_title:"Our Services",
residential:"Residential Solar",
residential_desc:"Rooftop solar installation for homes.",
commercial:"Commercial Solar",
commercial_desc:"Solar systems for offices and shops.",
maintenance:"Maintenance",
maintenance_desc:"Complete solar maintenance service.",
consultation:"Energy Consultation",
consultation_desc:"Expert guidance for solar savings.",

subsidy_title:"Government Solar Subsidy Schemes",
scheme1:"PM Surya Ghar Yojana",
scheme1_desc:"Government provides subsidy for residential rooftop solar systems.",
scheme2:"PM KUSUM Scheme",
scheme2_desc:"Supports farmers with solar pumps and power plants.",
scheme3:"Grid Connected Rooftop Programme",
scheme3_desc:"Encourages rooftop solar installation.",

contact_title:"Contact Us",
owner:"Owner / Founder:",
business:"Business Type:",
address:"Address:",
mission:"To provide affordable and clean solar energy solutions.",
phone:"Contact Number:",
email:"Email:",

faq_title:"Frequently Asked Questions",
faq1_q:"What is PM Surya Ghar Yojana?",
faq1_a:"PM Surya Ghar Yojana is a government initiative that provides subsidy for rooftop solar systems.",
faq2_q:"How much space is required for solar panels?",
faq2_a:"1 kW solar system needs around 80–100 sq ft of rooftop area.",
faq3_q:"How much electricity bill can I save?",
faq3_a:"You can save up to 100% depending on usage.",
faq4_q:"How long do solar panels last?",
faq4_a:"Solar panels last around 25–30 years.",
faq5_q:"Why should we install solar panels at home?",
faq5_a:"Installing solar panels helps reduce electricity bills and provides clean, renewable energy for your home. It also increases property value and reduces dependence on traditional electricity sources.",
gallery:"Gallery",

message:"Your Message",
submit:"Submit Message"
},

hi: {
company:"सनवे सोलर एनर्जी",
home:"होम",
services:"सेवाएं",
subsidy:"सब्सिडी",
contact:"संपर्क",

hero_title:"आपके घर के लिए सौर ऊर्जा",
hero_desc:"बिजली बिल बचाएं",
consult:"परामर्श लें",

services_title:"हमारी सेवाएं",
residential:"रेजिडेंशियल सोलर",
residential_desc:"घरों के लिए सोलर इंस्टॉलेशन",
commercial:"कमर्शियल सोलर",
commercial_desc:"दुकानों के लिए सोलर सिस्टम",
maintenance:"मेंटेनेंस",
maintenance_desc:"सोलर मेंटेनेंस सेवा",
consultation:"ऊर्जा सलाह",
consultation_desc:"विशेषज्ञ मार्गदर्शन",

subsidy_title:"सरकारी सोलर योजनाएं",
scheme1:"पीएम सूर्य घर योजना",
scheme1_desc:"सरकार द्वारा सब्सिडी प्रदान की जाती है",
scheme2:"पीएम कुसुम योजना",
scheme2_desc:"किसानों के लिए सोलर सहायता",
scheme3:"ग्रिड रूफटॉप योजना",
scheme3_desc:"रूफटॉप सोलर इंस्टॉलेशन को बढ़ावा",

contact_title:"संपर्क करें",
owner:"मालिक:",
business:"व्यवसाय प्रकार:",
address:"पता:",
mission:"सस्ती सौर ऊर्जा समाधान प्रदान करना",
phone:"संपर्क नंबर:",
email:"ईमेल:",

faq_title:"अक्सर पूछे जाने वाले प्रश्न",
faq1_q:"पीएम सूर्य घर योजना क्या है?",
faq1_a:"यह सरकार की योजना है जो सब्सिडी देती है",
faq2_q:"कितनी जगह चाहिए?",
faq2_a:"1 किलोवाट के लिए 80–100 स्क्वेयर फीट",
faq3_q:"कितनी बचत होगी?",
faq3_a:"100% तक बिजली बिल बचत",
faq4_q:"पैनल किती वर्षे चालतात?",
faq4_a:"25–30 वर्षे",
faq5_q:"घरच्या घरी सोलर पॅनल का बसवायचे?",
faq5_a:"सोलर पॅनल्स घरातील वीज बिल कमी करतात आणि स्वच्छ, नूतनीकरणीय ऊर्जा पुरवतात. यामुळे पारंपरिक वीज स्त्रोतांवर अवलंबित्व कमी होते.",
gallery:"गैलरी",

message:"तुमचा संदेश",
submit:"संदेश पाठवा"
},

mr: {
company:"सनवे सोलर एनर्जी",
home:"मुख्यपृष्ठ",
services:"सेवा",
subsidy:"अनुदान",
contact:"संपर्क",

hero_title:"तुमच्या घरासाठी सौर ऊर्जा",
hero_desc:"वीज बिल वाचवा",
consult:"सल्ला घ्या",

services_title:"आमच्या सेवा",
residential:"घरगुती सोलर",
residential_desc:"घरांसाठी सोलर",
commercial:"व्यावसायिक सोलर",
commercial_desc:"दुकानांसाठी सोलर",
maintenance:"देखभाल",
maintenance_desc:"मेंटेनन्स सेवा",
consultation:"ऊर्जा सल्ला",
consultation_desc:"तज्ञ मार्गदर्शन",

subsidy_title:"सरकारी योजना",
scheme1:"पीएम सूर्य योजना",
scheme1_desc:"सरकारी अनुदान योजना",
scheme2:"पीएम कुसुम योजना",
scheme2_desc:"शेतकऱ्यांसाठी सोलर योजना",
scheme3:"रूफटॉप योजना",
scheme3_desc:"घरांसाठी सोलर योजना",

contact_title:"संपर्क करा",
owner:"मालक:",
business:"व्यवसाय प्रकार:",
address:"पत्ता:",
mission:"स्वस्त सौर ऊर्जा देणे",
phone:"फोन:",
email:"ईमेल:",

faq_title:"वारंवार विचारले जाणारे प्रश्न",
faq1_q:"पीएम सूर्य योजना काय आहे?",
faq1_a:"ही सरकारी योजना आहे",
faq2_q:"किती जागा लागते?",
faq2_a:"80–100 स्क्वेअर फूट",
faq3_q:"किती बचत होईल?",
faq3_a:"100% पर्यंत बचत",
faq4_q:"पॅनल किती वर्षे चालतात?",
faq4_a:"25–30 वर्षे",
gallery:"गॅलेरी",

message:"तुमचा संदेश",
submit:"संदेश पाठवा"
}

};


// =======================
// LANGUAGE SWITCH
// =======================

const switcher = document.getElementById("languageSwitcher");

switcher.addEventListener("change", function(){

let lang = this.value;

localStorage.setItem("lang", lang);

applyLanguage(lang);

});


// APPLY LANGUAGE

function applyLanguage(lang){

document.querySelectorAll("[data-key]").forEach(el => {
let key = el.getAttribute("data-key");

if(translations[lang][key]){
el.innerText = translations[lang][key];
}
});

}


// LOAD SAVED LANGUAGE

window.onload = function(){

let savedLang = localStorage.getItem("lang") || "en";

switcher.value = savedLang;

applyLanguage(savedLang);

};


// =======================
// FAQ TOGGLE
// =======================

document.querySelectorAll(".faq-question").forEach(q => {
q.addEventListener("click", () => {
q.parentElement.classList.toggle("active");
});
});


// =======================
// MESSAGE COUNTER
// =======================

const textarea = document.getElementById("messageBox");
const counter = document.getElementById("charCount");
const progress = document.getElementById("progressFill");

const maxLength = 300;

if(textarea){

textarea.addEventListener("input", function(){

let length = textarea.value.length;

counter.textContent = length;

/* WIDTH */
let percent = (length / maxLength) * 100;
progress.style.width = percent + "%";

/* COLOR CHANGE */
progress.classList.remove("orange","red");

if(length >= 250){
progress.classList.add("red");
}
else if(length >= 150){
progress.classList.add("orange");
}

});

}


/* ===== TOGGLE LIKE FAQ ===== */
document.querySelectorAll(".converter-title").forEach(title => {

title.addEventListener("click", function(){

this.parentElement.classList.toggle("active");

});

});


/* ===== CURRENCY FUNCTION ===== */
window.convertCurrency = async function(){

let amount = document.getElementById("amount").value;
let from = document.getElementById("from").value;
let to = document.getElementById("to").value;
let resultBox = document.getElementById("result");

if(!amount){
resultBox.innerText = "Enter amount";
return;
}

resultBox.innerText = "Converting...";

try{
let res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
let data = await res.json();

let result = amount * data.rates[to];

resultBox.innerText = `${amount} ${from} = ${result.toFixed(2)} ${to}`;

}catch{
resultBox.innerText = "Error fetching data";
}

}


// WAIT UNTIL PAGE LOADS
document.addEventListener("DOMContentLoaded", function(){

const modal = document.getElementById("modal");
const openBtn = document.querySelector(".open-modal-btn");
const closeBtn = document.querySelector(".close-btn");

openBtn.addEventListener("click", function(){
modal.style.display = "flex";
});

closeBtn.addEventListener("click", function(){
modal.style.display = "none";
});

window.addEventListener("click", function(e){
if(e.target === modal){
modal.style.display = "none";
}
});

const consultationSubmit = document.getElementById("consultationSubmit");
if (consultationSubmit) {
consultationSubmit.addEventListener("click", async function(){
const name = document.getElementById("consultationName")?.value?.trim();
const mobile = document.getElementById("consultationMobile")?.value?.trim();
const city = document.getElementById("consultationCity")?.value?.trim();
if (!name || !mobile || !city) {
alert("Please fill all fields.");
return;
}
try {
const res = await fetch(`${API_BASE}/consultation`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ name, mobile, city })
});
const data = await res.json();
if (!res.ok) throw new Error(data.error || "Request failed");
const ref = data.id ? `\nRecord ID: ${data.id}` : "";
alert("Thank you! We will contact you soon." + ref);
modal.style.display = "none";
document.getElementById("consultationName").value = "";
document.getElementById("consultationMobile").value = "";
document.getElementById("consultationCity").value = "";
} catch {
alert("Could not submit. Is the server running?");
}
});
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
contactForm.addEventListener("submit", async function(e){
e.preventDefault();
const messageBox = document.getElementById("messageBox");
const text = messageBox?.value?.trim();
if (!text) {
alert("Please enter a message.");
return;
}
try {
const res = await fetch(`${API_BASE}/contact`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ message: text })
});
const data = await res.json();
if (!res.ok) throw new Error(data.error || "Request failed");
const ref = data.id ? `\nRecord ID: ${data.id}` : "";
alert("Message saved in the database." + ref);
messageBox.value = "";
if (counter) counter.textContent = "0";
if (progress) {
progress.style.width = "0%";
progress.classList.remove("orange","red");
}
} catch {
alert("Could not send message. Is the server running?");
}
});
}
});
document.addEventListener("DOMContentLoaded", function(){

const themeBtn = document.getElementById("themeToggle");

if(!themeBtn){
console.log("Theme button not found ❌");
return;
}

/* LOAD SAVED THEME */
let savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){
document.body.classList.add("dark");
}

/* CLICK EVENT */
themeBtn.addEventListener("click", function(){

document.body.classList.toggle("dark");

/* SAVE */
if(document.body.classList.contains("dark")){
localStorage.setItem("theme","dark");
}else{
localStorage.setItem("theme","light");
}

});

});



/* ================= SMOOTH SCROLL ================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

link.addEventListener("click", function(e){

e.preventDefault();

let target = document.querySelector(this.getAttribute("href"));

if(target){
target.scrollIntoView({
behavior:"smooth",
block:"start"
});
}

});

});


function openGallery() {
    window.location.href = "gallery.html";
}







