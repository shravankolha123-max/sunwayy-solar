/* Use backend on :5000 for Live Server/local; same-origin for Render/production */
const API_BASE =
  typeof location !== "undefined" &&
  (location.hostname === "127.0.0.1" || location.hostname === "localhost") &&
  location.port === "5500"
    ? "https://sunwayy-solar.onrender.com"
    : typeof location !== "undefined" &&
        (location.protocol === "http:" || location.protocol === "https:") &&
        location.hostname
      ? ""
      : "https://sunwayy-solar.onrender.com";

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
submit:"Submit Message",
view_services:"View Services",
stat_installations:"Installations Completed",
stat_panel_life:"Years Panel Life",
stat_bill_saving:"Bill Saving Potential (%)",
stat_support:"Support Availability (Hours)",
why_title:"Why Choose Sunwayy Solar",
why_warranty_title:"Long Warranty Support",
why_warranty_desc:"Durable solar components with reliable installation and after-sales help.",
why_subsidy_title:"Subsidy Guidance",
why_subsidy_desc:"End-to-end support for PM Surya Ghar and other relevant government schemes.",
why_response_title:"Fast Site Response",
why_response_desc:"Quick rooftop assessment and transparent recommendations for your home.",
why_maintenance_title:"Maintenance Help",
why_maintenance_desc:"Prompt troubleshooting and periodic checks to keep your system efficient.",
process_title:"How We Deliver Your Solar Project",
process_1_title:"Site Survey",
process_1_desc:"We inspect roof area, shadow conditions, and energy usage to recommend the right system.",
process_2_title:"Design & Subsidy Planning",
process_2_desc:"Detailed layout, generation estimate, and complete support for eligible subsidy paperwork.",
process_3_title:"Installation & Testing",
process_3_desc:"Safe mounting, wiring, inverter setup, and quality testing before handover.",
process_4_title:"Monitoring & Maintenance",
process_4_desc:"Performance guidance and after-installation support to keep output at best levels.",
converter_title:"Currency Converter",
convert_btn:"Convert",
testimonials_title:"What Customers Say",
testimonial_1_text:"Very smooth installation process. Team explained subsidy steps clearly and the system runs perfectly.",
testimonial_1_name:"- Homeowner, Jalgaon",
testimonial_2_text:"From site visit to commissioning, everything was professional. Our electricity bill dropped significantly.",
testimonial_2_name:"- Shop Owner, Tambapura",
testimonial_3_text:"Good after-sales support and quick response whenever we needed maintenance guidance.",
testimonial_3_name:"- Family User, Jeevan Nagar",
footer_brand_title:"Sunwayy Solar Energy",
footer_brand_desc:"Clean, affordable, and reliable rooftop solar solutions for homes and businesses.",
footer_links_title:"Quick Links",
footer_link_services:"Services",
footer_link_subsidy:"Subsidy",
footer_link_booking:"Book Installation",
footer_link_gallery:"Gallery",
footer_contact_title:"Contact",
footer_location:"Jalgaon, Maharashtra",
footer_copy:"© Sunwayy Solar Energy. All rights reserved.",
call_now:"Call Now",
whatsapp:"WhatsApp",
free_consultation:"Get Free Consultation",
modal_title:"Free Solar Consultation",
modal_desc:"Fill your details and we will contact you"
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
submit:"संदेश पाठवा",
view_services:"सेवाएं देखें",
stat_installations:"पूर्ण इंस्टॉलेशन",
stat_panel_life:"पैनल आयु (वर्ष)",
stat_bill_saving:"बिल बचत क्षमता (%)",
stat_support:"सपोर्ट उपलब्धता (घंटे)",
why_title:"Sunwayy Solar क्यों चुनें",
why_warranty_title:"लंबी वारंटी सपोर्ट",
why_warranty_desc:"विश्वसनीय इंस्टॉलेशन और आफ्टर-सेल्स सपोर्ट के साथ टिकाऊ सोलर घटक।",
why_subsidy_title:"सब्सिडी मार्गदर्शन",
why_subsidy_desc:"PM Surya Ghar और अन्य योजनाओं के लिए पूरी प्रक्रिया में सहायता।",
why_response_title:"तेज साइट प्रतिक्रिया",
why_response_desc:"आपके घर के लिए त्वरित रूफ सर्वे और साफ़ सुझाव।",
why_maintenance_title:"मेंटेनेंस सहायता",
why_maintenance_desc:"सिस्टम को बेहतर रखने के लिए त्वरित सहायता और नियमित जांच।",
process_title:"हम आपका सोलर प्रोजेक्ट कैसे पूरा करते हैं",
process_1_title:"साइट सर्वे",
process_1_desc:"छत की जगह, छाया और उपयोग का निरीक्षण कर सही सिस्टम सुझाते हैं।",
process_2_title:"डिज़ाइन और सब्सिडी योजना",
process_2_desc:"लेआउट, उत्पादन अनुमान और आवश्यक दस्तावेज़ में पूरी मदद।",
process_3_title:"इंस्टॉलेशन और टेस्टिंग",
process_3_desc:"सुरक्षित माउंटिंग, वायरिंग, इन्वर्टर सेटअप और गुणवत्ता जांच।",
process_4_title:"मॉनिटरिंग और मेंटेनेंस",
process_4_desc:"इंस्टॉलेशन के बाद प्रदर्शन मार्गदर्शन और सतत सपोर्ट।",
converter_title:"करेंसी कन्वर्टर",
convert_btn:"कन्वर्ट करें",
testimonials_title:"ग्राहक क्या कहते हैं",
testimonial_1_text:"इंस्टॉलेशन प्रक्रिया बहुत आसान रही। टीम ने सब्सिडी स्टेप्स स्पष्ट बताए।",
testimonial_1_name:"- गृहस्वामी, जलगांव",
testimonial_2_text:"साइट विजिट से कमिशनिंग तक सब कुछ प्रोफेशनल था। बिजली बिल में अच्छी कमी आई।",
testimonial_2_name:"- दुकान मालिक, तांबापुरा",
testimonial_3_text:"बाद की सेवा बहुत अच्छी है और मेंटेनेंस के लिए तुरंत प्रतिक्रिया मिलती है।",
testimonial_3_name:"- परिवार उपयोगकर्ता, जीवन नगर",
footer_brand_title:"Sunwayy Solar Energy",
footer_brand_desc:"घर और व्यवसाय के लिए स्वच्छ, किफायती और भरोसेमंद रूफटॉप सोलर समाधान।",
footer_links_title:"त्वरित लिंक",
footer_link_services:"सेवाएं",
footer_link_subsidy:"सब्सिडी",
footer_link_booking:"इंस्टॉलेशन बुक करें",
footer_link_gallery:"गैलरी",
footer_contact_title:"संपर्क",
footer_location:"जलगांव, महाराष्ट्र",
footer_copy:"© Sunwayy Solar Energy. सर्वाधिकार सुरक्षित।",
call_now:"अभी कॉल करें",
whatsapp:"व्हाट्सएप",
free_consultation:"मुफ्त परामर्श लें",
modal_title:"मुफ्त सोलर परामर्श",
modal_desc:"अपनी जानकारी भरें, हम आपसे संपर्क करेंगे"
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
submit:"संदेश पाठवा",
view_services:"सेवा पहा",
stat_installations:"पूर्ण झालेले प्रोजेक्ट",
stat_panel_life:"पॅनेल आयुष्य (वर्षे)",
stat_bill_saving:"बिल बचत क्षमता (%)",
stat_support:"सपोर्ट उपलब्धता (तास)",
why_title:"Sunwayy Solar का निवडावे",
why_warranty_title:"दीर्घकालीन वॉरंटी सपोर्ट",
why_warranty_desc:"विश्वासार्ह इंस्टॉलेशन आणि विक्रीनंतरच्या सेवेसह टिकाऊ सोलर घटक.",
why_subsidy_title:"सब्सिडी मार्गदर्शन",
why_subsidy_desc:"पीएम सूर्य घर आणि इतर योजनांसाठी सुरुवातीपासून शेवटपर्यंत मदत.",
why_response_title:"जलद साइट प्रतिसाद",
why_response_desc:"तुमच्या घरासाठी जलद छत सर्वेक्षण आणि स्पष्ट शिफारसी.",
why_maintenance_title:"मेंटेनन्स मदत",
why_maintenance_desc:"सिस्टीम कार्यक्षम ठेवण्यासाठी नियमित तपासणी आणि जलद troubleshooting.",
process_title:"आम्ही तुमचा सोलर प्रोजेक्ट कसा पूर्ण करतो",
process_1_title:"साइट सर्वे",
process_1_desc:"छताची जागा, सावली आणि वापर तपासून योग्य सिस्टीम सुचवतो.",
process_2_title:"डिझाईन आणि सब्सिडी प्लॅन",
process_2_desc:"सविस्तर लेआउट, निर्मिती अंदाज आणि पात्र कागदपत्रांसाठी संपूर्ण मदत.",
process_3_title:"इंस्टॉलेशन आणि टेस्टिंग",
process_3_desc:"सुरक्षित माउंटिंग, वायरिंग, इन्व्हर्टर सेटअप आणि गुणवत्ता चाचणी.",
process_4_title:"मॉनिटरिंग आणि देखभाल",
process_4_desc:"इंस्टॉलेशननंतर कार्यक्षमतेसाठी मार्गदर्शन आणि सतत सपोर्ट.",
converter_title:"चलन रूपांतरण",
convert_btn:"रूपांतर करा",
testimonials_title:"ग्राहक काय म्हणतात",
testimonial_1_text:"इंस्टॉलेशन खूप व्यवस्थित झाले. टीमने सब्सिडी प्रक्रिया स्पष्ट समजावली.",
testimonial_1_name:"- गृह मालक, जळगाव",
testimonial_2_text:"साइट भेट ते कमिशनिंग सर्व काही व्यावसायिक होते. वीज बिल लक्षणीय कमी झाले.",
testimonial_2_name:"- दुकान मालक, तांबापुरा",
testimonial_3_text:"विक्रीनंतरचा सपोर्ट उत्कृष्ट आहे आणि मेंटेनन्ससाठी जलद प्रतिसाद मिळतो.",
testimonial_3_name:"- कुटुंब वापरकर्ता, जीवन नगर",
footer_brand_title:"Sunwayy Solar Energy",
footer_brand_desc:"घर आणि व्यवसायांसाठी स्वच्छ, परवडणारे आणि विश्वासार्ह रूफटॉप सोलर उपाय.",
footer_links_title:"जलद दुवे",
footer_link_services:"सेवा",
footer_link_subsidy:"सब्सिडी",
footer_link_booking:"इंस्टॉलेशन बुक करा",
footer_link_gallery:"गॅलरी",
footer_contact_title:"संपर्क",
footer_location:"जळगाव, महाराष्ट्र",
footer_copy:"© Sunwayy Solar Energy. सर्व हक्क राखीव.",
call_now:"आता कॉल करा",
whatsapp:"व्हॉट्सअॅप",
free_consultation:"मोफत सल्ला घ्या",
modal_title:"मोफत सोलर सल्ला",
modal_desc:"तुमची माहिती भरा, आम्ही लवकर संपर्क करू"
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

function animateStats(){
const stats = document.querySelectorAll(".stat-number");
stats.forEach(el => {
const target = Number(el.getAttribute("data-target")) || 0;
let current = 0;
const step = Math.max(1, Math.ceil(target / 50));
const timer = setInterval(() => {
current += step;
if(current >= target){
el.textContent = `${target}+`;
clearInterval(timer);
return;
}
el.textContent = `${current}+`;
}, 22);
});
}

function initRevealAnimations(){
const revealItems = document.querySelectorAll(".reveal-on-scroll");
if(!revealItems.length){
return;
}
let statsAnimated = false;
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if(entry.isIntersecting){
entry.target.classList.add("visible");
if(!statsAnimated && entry.target.classList.contains("stats-section")){
animateStats();
statsAnimated = true;
}
}
});
},{ threshold: 0.2 });

revealItems.forEach(item => observer.observe(item));
}

document.addEventListener("DOMContentLoaded", initRevealAnimations);


function openGallery() {
    window.location.href = "gallery.html";
}







