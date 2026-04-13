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
footer:"© Sunwayy Solar Energy"
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
footer:"© सनवे सोलर एनर्जी"
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
footer:"© सनवे सोलर एनर्जी"
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

const API_BASE = "http://localhost:5000";

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
})
.catch(() => {
alert("❌ Error saving. Is the server running and MongoDB connected?");
});

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