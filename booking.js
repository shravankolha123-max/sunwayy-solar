const translations = {

en:{
company:"Sunwayy Solar Energy",
title:"Solar Installation Booking",
name:"Full Name",
mobile:"Mobile Number",
city:"City",
bill:"Monthly Electricity Bill (₹)",
scheme:"Select Government Scheme",
scheme1:"PM Surya Yojana",
scheme2:"PM KUSUM Scheme",
scheme3:"Grid Connected Rooftop Programme",
size:"Select Solar System Size",
book:"Book Now",
footer:"© Sunwayy Solar Energy",
booking_subtitle:"Get a quick estimate, subsidy outlook, and downloadable invoice in one step.",
highlight_1_title:"Quick Estimate",
highlight_1_desc:"Instant cost, subsidy, and EMI insights based on your selected system size.",
highlight_2_title:"Subsidy Ready",
highlight_2_desc:"Built around major government rooftop schemes to simplify planning.",
highlight_3_title:"Invoice Download",
highlight_3_desc:"Professional invoice generated automatically after successful booking.",
tip_label:"Tip:",
tip_desc:"Enter your real monthly bill for a more practical solar size recommendation."
},

hi:{
company:"सनवे सोलर एनर्जी",
title:"सोलर इंस्टॉलेशन बुकिंग",
name:"पूरा नाम",
mobile:"मोबाइल नंबर",
city:"शहर",
bill:"मासिक बिजली बिल",
scheme:"सरकारी योजना चुनें",
scheme1:"पीएम सूर्य योजना",
scheme2:"पीएम कुसुम योजना",
scheme3:"ग्रिड रूफटॉप योजना",
size:"सोलर साइज चुनें",
book:"बुक करें",
footer:"© सनवे सोलर एनर्जी",
booking_subtitle:"एक ही स्टेप में तेज अनुमान, सब्सिडी जानकारी और डाउनलोड होने वाली इनवॉइस पाएं।",
highlight_1_title:"त्वरित अनुमान",
highlight_1_desc:"आपके चुने हुए सिस्टम साइज के आधार पर लागत, सब्सिडी और EMI की जानकारी।",
highlight_2_title:"सब्सिडी तैयार",
highlight_2_desc:"मुख्य सरकारी रूफटॉप योजनाओं को ध्यान में रखकर आसान प्लानिंग।",
highlight_3_title:"इनवॉइस डाउनलोड",
highlight_3_desc:"सफल बुकिंग के बाद प्रोफेशनल इनवॉइस अपने आप तैयार होती है।",
tip_label:"टिप:",
tip_desc:"बेहतर सोलर सिफारिश के लिए अपना वास्तविक मासिक बिजली बिल दर्ज करें।"
},

mr:{
company:"सनवे सोलर एनर्जी",
title:"सोलर इंस्टॉलेशन बुकिंग",
name:"पूर्ण नाव",
mobile:"मोबाइल नंबर",
city:"शहर",
bill:"मासिक वीज बिल",
scheme:"सरकारी योजना निवडा",
scheme1:"पीएम सूर्य योजना",
scheme2:"पीएम कुसुम योजना",
scheme3:"ग्रिड रूफटॉप योजना",
size:"सोलर साइज निवडा",
book:"बुक करा",
footer:"© सनवे सोलर एनर्जी",
booking_subtitle:"एकाच स्टेपमध्ये जलद अंदाज, सबसिडी माहिती आणि डाउनलोड होणारे इनवॉइस मिळवा.",
highlight_1_title:"जलद अंदाज",
highlight_1_desc:"तुमच्या निवडलेल्या सिस्टीम साइजवर आधारित खर्च, सबसिडी आणि EMI माहिती.",
highlight_2_title:"सबसिडी तयार",
highlight_2_desc:"मुख्य सरकारी रूफटॉप योजनांसाठी सोपी आणि स्पष्ट योजना मदत.",
highlight_3_title:"इनवॉइस डाउनलोड",
highlight_3_desc:"यशस्वी बुकिंगनंतर प्रोफेशनल इनवॉइस आपोआप तयार होते.",
tip_label:"टीप:",
tip_desc:"अधिक अचूक सोलर शिफारसीसाठी तुमचा खरा मासिक वीज बिल भरा."
}

};


/* LANGUAGE SWITCH */

document.getElementById("languageSwitcher").addEventListener("change",function(){

let lang=this.value;
localStorage.setItem("lang",lang);

document.querySelectorAll("[data-key]").forEach(el=>{
el.innerText=translations[lang][el.getAttribute("data-key")];
});

});


window.onload=function(){

let savedLang=localStorage.getItem("lang") || "en";

document.getElementById("languageSwitcher").value=savedLang;

document.querySelectorAll("[data-key]").forEach(el=>{
el.innerText=translations[savedLang][el.getAttribute("data-key")];
});

}


/* BOOKING */

function bookNow(){

let name=document.getElementById("name").value;
let mobile=document.getElementById("mobile").value;
let city=document.getElementById("city").value;
let bill=document.getElementById("bill").value;
let scheme=document.getElementById("scheme").value;
let size=document.getElementById("size").value;

/* SEND DATA TO SERVER */

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

fetch(`${API_BASE}/book`, {
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
name,
mobile,
city,
bill,
scheme,
size
})
})
.then(async (res) => {
const data = await res.json().catch(() => ({}));
if (!res.ok) throw new Error(data.error || "Request failed");
return data;
})
.then((data) => {
const ref = data.id ? `\nRecord ID: ${data.id}` : "";
alert("✅ Booking saved in the database." + ref);
showBookingSummary(name,mobile,city,bill,scheme,size);
downloadInvoice(name,mobile,city,bill,scheme,size,data.id);
})
.catch(() => {
alert("❌ Error saving. Is the server running and MongoDB connected?");
});

}

function parseSizeKw(sizeText){
const parsed = parseFloat(String(sizeText).replace(/[^\d.]/g,""));
return Number.isFinite(parsed) ? parsed : 0;
}

function calculateFinancials(sizeText){
const sizeKw = parseSizeKw(sizeText);
const totalCost = Math.round(sizeKw * 55000);
const subsidyPerKw = sizeKw <= 2 ? 30000 : 18000;
const subsidy = Math.round(sizeKw * subsidyPerKw);
const finalPayable = Math.max(totalCost - subsidy, 0);
const emiMonthly = Math.round((finalPayable * 1.10) / 12);

return {
sizeKw,
totalCost,
subsidy,
finalPayable,
emiMonthly
};
}

function showBookingSummary(name,mobile,city,bill,scheme,size){
const resultEl = document.getElementById("bookingResult");
if(!resultEl){
return;
}

const details = calculateFinancials(size);

const content=`SUNWAYY SOLAR ENERGY
-----------------------------------------

Customer Details
-------------------------
Name: ${name}
Mobile: ${mobile}
City: ${city}

Project Details
-------------------------
System Size: ${details.sizeKw.toFixed(2)} kW
Scheme: ${scheme}
Monthly Bill: ₹${bill}

Financial Details
-------------------------
Total Cost: ₹${details.totalCost}
Government Subsidy: ₹${details.subsidy}
Final Payable: ₹${details.finalPayable}

EMI Plan (12 Months @10%)
Monthly EMI: ₹${details.emiMonthly}

-----------------------------------------
Thank you for choosing Sunwayy Solar`;

resultEl.textContent = content;
resultEl.hidden = false;
}

let cachedLogoDataUrl = null;

function readBlobAsDataUrl(blob){
return new Promise((resolve,reject) => {
const reader = new FileReader();
reader.onload = () => resolve(reader.result);
reader.onerror = reject;
reader.readAsDataURL(blob);
});
}

async function getLogoSource(){
if(cachedLogoDataUrl){
return cachedLogoDataUrl;
}
try{
const res = await fetch("logo.png.png");
if(!res.ok){
return "logo.png.png";
}
const blob = await res.blob();
cachedLogoDataUrl = await readBlobAsDataUrl(blob);
return cachedLogoDataUrl;
}catch{
return "logo.png.png";
}
}

async function downloadInvoice(name,mobile,city,bill,scheme,size,recordId){
const details = calculateFinancials(size);
const now = new Date();
const dateTime = now.toLocaleString();
const logoSrc = await getLogoSource();

const invoiceHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Sunwayy Solar Invoice</title>
<style>
body{font-family:Segoe UI,Arial,sans-serif;background:#f4f7fc;padding:24px;margin:0;color:#1c2b4d;}
.invoice{max-width:820px;margin:0 auto;background:#fff;border:1px solid #d7deea;border-radius:12px;padding:24px 28px;box-shadow:0 8px 24px rgba(0,0,0,0.08);}
.top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;}
.top-left{display:flex;align-items:center;gap:12px;}
.logo{width:86px;height:86px;object-fit:contain;border-radius:8px;}
.company{font-size:24px;font-weight:800;color:#18408f;margin:0;}
.meta{font-size:14px;line-height:1.5;color:#47577a;text-align:right;}
.line{margin:16px 0;border-top:2px dashed #b9c6e0;}
h3{margin:14px 0 8px;color:#1f3f87;}
.row{margin:5px 0;font-size:15px;}
.label{font-weight:700;}
.thank{margin-top:18px;font-weight:700;color:#18408f;}
</style>
</head>
<body>
  <div class="invoice">
    <div class="top">
      <div class="top-left">
        <img class="logo" src="${logoSrc}" alt="Sunwayy Solar Energy logo">
        <h1 class="company">SUNWAYY SOLAR ENERGY</h1>
      </div>
      <div class="meta">
        <div><strong>Date & Time:</strong> ${dateTime}</div>
        <div><strong>Record ID:</strong> ${recordId || "N/A"}</div>
      </div>
    </div>

    <div class="line"></div>

    <h3>Customer Details</h3>
    <div class="row"><span class="label">Name:</span> ${name}</div>
    <div class="row"><span class="label">Mobile:</span> ${mobile}</div>
    <div class="row"><span class="label">City:</span> ${city}</div>

    <h3>Project Details</h3>
    <div class="row"><span class="label">System Size:</span> ${details.sizeKw.toFixed(2)} kW</div>
    <div class="row"><span class="label">Scheme:</span> ${scheme}</div>
    <div class="row"><span class="label">Monthly Bill:</span> ₹${bill}</div>

    <h3>Financial Details</h3>
    <div class="row"><span class="label">Total Cost:</span> ₹${details.totalCost}</div>
    <div class="row"><span class="label">Government Subsidy:</span> ₹${details.subsidy}</div>
    <div class="row"><span class="label">Final Payable:</span> ₹${details.finalPayable}</div>

    <h3>EMI Plan (12 Months @10%)</h3>
    <div class="row"><span class="label">Monthly EMI:</span> ₹${details.emiMonthly}</div>

    <div class="line"></div>
    <div class="thank">Thank you for choosing Sunwayy Solar.</div>
  </div>
</body>
</html>`;

const blob = new Blob([invoiceHtml],{type:"text/html"});
const link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = `sunwayy-invoice-${now.getTime()}.html`;
link.click();
URL.revokeObjectURL(link.href);
}


/* INVOICE */

function generateInvoice(name,mobile,city,bill,scheme,size){

let content=`SUNWAYY SOLAR ENERGY

Name: ${name}
Mobile: ${mobile}
City: ${city}

Bill: ₹${bill}
Scheme: ${scheme}
Size: ${size}

Status: Booking Confirmed`;

let blob=new Blob([content],{type:"text/plain"});

let link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="invoice.txt";

link.click();

}



/* ================= THEME ================= */

document.addEventListener("DOMContentLoaded", function(){

const themeBtn = document.getElementById("themeToggle");

/* LOAD SAVED THEME */
if(localStorage.getItem("theme") === "dark"){
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