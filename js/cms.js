var firebaseConfig = {
    apiKey: "AIzaSyCcfGz8FF5EOqzkXvmS_ePMiYYnn75tFm8",
    authDomain: "fir-cms-5dad8.firebaseapp.com",
    databaseURL: "https://fir-cms-5dad8.firebaseio.com",
    projectId: "fir-cms-5dad8",
    storageBucket: "fir-cms-5dad8.appspot.com",
    messagingSenderId: "923087778767",
    appId: "1:923087778767:web:ae5b5d0d78666aaef158ba",
    measurementId: "G-M1QCHRDNJT"
};
firebase.initializeApp(firebaseConfig);

var siteDataRef = firebase.database().ref("360ACT");
siteDataRef.once("value", gotSiteData, errData);

let messagesRef = firebase.database().ref('leadcollection/360ACT/contact-form');
document.getElementById('contact-form').addEventListener('submit', submitForm);

var siteData;
function gotSiteData(data) {
    siteData = data.val();
    document.getElementById("hoursLocation").innerHTML = siteData["settingspage"]["general-section"].blockText;
    document.getElementById("phoneNumberBtn").setAttribute("href", `tel:${siteData["settingspage"]["general-section"].phone}`);

    if (document.URL.includes("about.html")) {
        fillAboutPage()
    } else if (document.URL.includes("pages") && !document.URL.includes("index.html")) {
    } else {
        fillHomePage();
    }
}
function loadPayment() {
}
function fillAboutPage() {
    //Header Section
    document.getElementById("heroTitle").innerHTML = `${siteData["aboutpage"]["header-section"].title}`;
    document.getElementById("heroSubtitle").innerHTML = `${siteData["aboutpage"]["header-section"].subtitle}`;
    document.getElementById("heroImage").setAttribute("style", `background-image:url('${siteData["aboutpage"]["header-section"].image}'); height:400px`);
    //Founder Section 
    document.getElementById("founderTitle").innerHTML = `${siteData["aboutpage"]["founder-section"].title}`;
    document.getElementById("founderName").innerHTML = `${siteData["aboutpage"]["founder-section"].name}`;
    document.getElementById("founderDescription").innerHTML = `${siteData["aboutpage"]["founder-section"].LongText}`;
    document.getElementById("founderImage").setAttribute("src", `${siteData["aboutpage"]["founder-section"].image}`);
    //Member 1
    document.getElementById("memberName1").innerHTML = `${siteData["aboutpage"]["member-1-section"].name}`;
    document.getElementById("memberDescription1").innerHTML = `${siteData["aboutpage"]["member-1-section"].LongText}`;
    document.getElementById("memberImage1").setAttribute("src", `${siteData["aboutpage"]["member-1-section"].image}`);
    //Member 2
    document.getElementById("memberName2").innerHTML = `${siteData["aboutpage"]["member-2-section"].name}`;
    document.getElementById("memberDescription2").innerHTML = `${siteData["aboutpage"]["member-2-section"].LongText}`;
    document.getElementById("memberImage2").setAttribute("src", `${siteData["aboutpage"]["member-2-section"].image}`);
    //Member 3
    document.getElementById("memberName3").innerHTML = `${siteData["aboutpage"]["member-3-section"].name}`;
    document.getElementById("memberDescription3").innerHTML = `${siteData["aboutpage"]["member-3-section"].LongText}`;
    document.getElementById("memberImage3").setAttribute("src", `${siteData["aboutpage"]["member-3-section"].image}`);
}

function fillHomePage() {
    //Header Section
    document.getElementById("heroTitle").innerHTML = `${siteData["homepage"]["header-section"].title}`;
    document.getElementById("heroButton").innerHTML = `${siteData["homepage"]["header-section"].button}`;
    document.getElementById("heroImage").setAttribute("style", `background-image:url('${siteData["homepage"]["header-section"].image}')`);
    //Featured Courses
    document.getElementById("featuredTitle").innerHTML = `${siteData["homepage"]["featured-section"].title}`;
    document.getElementById("featuredSubtitle").innerHTML = `${siteData["homepage"]["featured-section"].subtitle}`;
    document.getElementById("featuredButton").innerHTML = `${siteData["homepage"]["featured-section"].button}`;
    //About Section
    document.getElementById("aboutTitle").innerHTML = `${siteData["homepage"]["about-section"].title}`;
    document.getElementById("aboutSubtitle").innerHTML = `${siteData["homepage"]["about-section"].subtitle}`;
    document.getElementById("aboutDescription").innerHTML = `${siteData["homepage"]["about-section"].LongText}`;
    document.getElementById("aboutButton").innerHTML = `${siteData["homepage"]["about-section"].button}`;
    document.getElementById("aboutImage").setAttribute("src", `${siteData["homepage"]["about-section"].image}`);
    //FAQ Section
    document.getElementById("faqTitle").innerHTML = `${siteData["homepage"]["faq-section"].title}`;
    document.getElementById("faq").
    setAttribute("style", 
    `background:url('${siteData["homepage"]["faq-section"].image}') center center no-repeat;
    background-size: cover;`);
    document.getElementById("question1").innerHTML = `${siteData["homepage"]["faq-section"].question1}`;
    document.getElementById("question2").innerHTML = `${siteData["homepage"]["faq-section"].question2}`;
    document.getElementById("question3").innerHTML = `${siteData["homepage"]["faq-section"].question3}`;
    document.getElementById("answer1").innerHTML = `${siteData["homepage"]["faq-section"].answer1}`;
    document.getElementById("answer2").innerHTML = `${siteData["homepage"]["faq-section"].answer2}`;
    document.getElementById("answer3").innerHTML = `${siteData["homepage"]["faq-section"].answer3}`;
    //TESTIMONIAL
    document.getElementById("testimonial").
    setAttribute("style",
        `background:url('${siteData["homepage"]["testimonial-section"].image}') center center no-repeat;
    background-size: cover;`);
    document.getElementById("testimonialTitle").innerHTML = `${siteData["homepage"]["testimonial-section"].title}`;
    document.getElementById("testimonialAuthor1").innerHTML = `${siteData["homepage"]["testimonial-1-section"].author}`;
    document.getElementById("testimonialMessage1").innerHTML = `${siteData["homepage"]["testimonial-1-section"].message}`;
    document.getElementById("testimonialAuthor2").innerHTML = `${siteData["homepage"]["testimonial-2-section"].author}`;
    document.getElementById("testimonialMessage2").innerHTML = `${siteData["homepage"]["testimonial-2-section"].message}`;
    document.getElementById("testimonialAuthor3").innerHTML = `${siteData["homepage"]["testimonial-3-section"].author}`;
    document.getElementById("testimonialMessage3").innerHTML = `${siteData["homepage"]["testimonial-3-section"].message}`;

}
function errData(data) {
    console.log(data);
}   
function submitForm(e) {
    e.preventDefault();

    // get Values
    let email = getInputVal('cf-email');
    let name = getInputVal('cf-name');
    let message = getInputVal('cf-message');
    saveMessage(email, name, message);

    //show alert
    document.querySelector('.alert').style.display = 'block';

    //Hide alert after 3 s
    setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
    }, 3000)
    //clear form
    document.getElementById('subscribe').reset();
}

function getInputVal(id) {
    return document.getElementById(id).value;
}

//save message to firebase
function saveMessage(email, name, message) {
    let newMessageRef = messagesRef.push();
    newMessageRef.set({
        email: email,
        name: name,
        message: message
    })
}