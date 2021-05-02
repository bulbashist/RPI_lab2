// DOM Elements
const time = document.querySelector('.time'),
	greeting = document.querySelector('.greeting'),
	name = document.querySelector('.name'),
	focus = document.querySelector('.focus');
	const weather = document.querySelector('.weather');
	const weatherIcon = document.querySelector('.weather-icon');
	const temperature = document.querySelector('.temperature');
	const weatherDescription = document.querySelector('.weather-description');
	const blockquote = document.querySelector('blockquote');
	const figcaption = document.querySelector('figcaption');
	const BGBtn = document.querySelector('.changeBG');
	const quoteBtn = document.querySelector('.changeQuote');


// Show Time
function showTime() {
	const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
	const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
	let today = new Date(),
	month = months[today.getMonth()];
	dayOfWeek = daysOfWeek[today.getDay()];
	day = today.getDate();
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
	
	time.innerHTML = `${dayOfWeek}<span>,</span>${day} ${month}<br>${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
	setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
	
	let dayTime;
	if (hour < 6) dayTime = 'night';
	else if (hour < 12) dayTime = 'morning';
    else if (hour < 18) dayTime = 'day';
	else dayTime = 'evening';

  if (hour < 12) {
    // Morning
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/924T2Wv/night.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

function ChangeBG() {
	let today = new Date();
	let hour = today.getHours();
	
	let dayTime;
	if (hour < 6) dayTime = 'night';
	else if (hour < 12) dayTime = 'morning';
    else if (hour < 18) dayTime = 'afternoon';
	else dayTime = 'evening';
	greeting.textContent = `Good ${dayTime}, `
	
	let imgNumber;
	localStorage.getItem('imgNumber') != null ? imgNumber = localStorage.getItem('imgNumber') : imgNumber = 10;
	let URL = `assets/images/${dayTime}/${imgNumber}.jpg`;
	document.body.style.backgroundImage = `url(${URL})`;
	imgNumber++;
	if (imgNumber > 20) imgNumber = 10;
	localStorage.setItem('imgNumber', imgNumber);
}


function GetName() {
	localStorage.getItem('name') != null ? name.innerText = localStorage.getItem('name') : name.innerText = '[Enter name]';
}

function SetName(e) {
	if (e.type == 'click') {
		this.innerText = '';
		return;
	}		
	if (e.keyCode == 13) {
		if (name.innerText == 0) GetName(this);
		else localStorage.setItem('name', name.innerText);
		name.blur();
	}
}

function GetFocus() {
	localStorage.getItem('focus') != null ? focus.innerText = localStorage.getItem('focus') : focus.innerText = '[Enter focus]';
}

function SetFocus(e) {
	if (e.type == 'click') {
		focus.innerText = '';
		return;
	}		
	if (e.keyCode == 13) {
		if (focus.innerText == 0) GetFocus();
		else localStorage.setItem('focus', focus.innerText);
		focus.blur();
	}
}

async function GetWeather() {
	localStorage.getItem('weather') != null ? weather.innerText = localStorage.getItem('weather') : weather.innerText = '[Enter city]';
	
	if (localStorage.getItem('weather') != null) {
		let windSpeed = document.querySelector('.windspeed');
		let humidity = document.querySelector('.humidity');

		let city = localStorage.getItem('weather');
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
		const res = await fetch(url);
		const data = await res.json();
		if (data.weather == undefined) {
			alert('Для заданного города невозможно вывести погоду');
			temperature.textContent = '';
			humidity.textContent = '';
			windSpeed.textContent = '';
			return;
		}
		weatherIcon.classList.add('weather-icon');
		weatherIcon.classList.add('owf');
		weatherIcon.classList.add(`owf-${data.weather[0].id}`);	
		temperature.textContent = `${data.main.temp}°C`;
		humidity.textContent = `${data.main.humidity}%`
		windSpeed.textContent = `${data.wind.speed}м/с`;
	}
}

function SetWeather(e) {
	if (e.type == 'click') {
		weather.innerText = '';
		return;
	}		
	if (e.keyCode == 13) {
		if (weather.innerText == 0) {}
		else localStorage.setItem('weather', weather.innerText);
		GetWeather();
		weather.blur();
	}	
}

async function GetQuote() {
	//alert(Math.random());
	var rand =  Math.round(Math.random() * 1000) ;
	const url = `https://type.fit/api/quotes`;
	const res = await fetch(url);
	const data = await res.json();
	blockquote.textContent = data[rand].text;
	figcaption.textContent = data[rand].author;
}

function init() {
	document.addEventListener('DOMContentLoaded', GetQuote);
	name.addEventListener('keypress', SetName);
	name.addEventListener('click', SetName);
	focus.addEventListener('keypress', SetFocus);
	focus.addEventListener('click', SetFocus);
	weather.addEventListener('keypress', SetWeather);
	weather.addEventListener('click', SetWeather);
	quoteBtn.addEventListener('click', GetQuote);
	BGBtn.addEventListener('click', ChangeBG);
	setInterval(ChangeBG, 3600000);
	
	ChangeBG();
	showTime();
	GetName();
	GetFocus();
	GetWeather();
}

init();

