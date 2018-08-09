import ProgressBar from 'progressbar.js'
import moment from  'moment'
import lo from 'lodash'
import momentDurationFormatSetup from 'moment-duration-format'

import Step from './step'
import StepList from './stepList'

import 'style.css'


function animateBar(currTime, total) {
  var barSize = currTime / total;
  bar.animate(barSize);
}

function drawCounter(currTime) {
  let counter = document.querySelector(".counter");
  let total = stepList.totalDuration.asSeconds();
  let timeLeft = total - currTime;
  counter.innerHTML = moment.duration(timeLeft,"s").format("mm[min] ss[s]");
}

function tick() {
  var total = stepList.totalDuration.asSeconds();
  currTime++;

  animateBar(currTime, total);
  if (currTime < total) {
    timeoutId = window.setTimeout(tick,1000);
  }
  stepList.draw(currTime);
  drawCounter(currTime);
};


var bar = new ProgressBar.Circle(container, {
  strokeWidth: 6,
  easing: 'easeInOut',
  duration: 1400,
  color: '#dfe318',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: null
});

var allSteps = [
  new Step('Contexto atual', '5s'),
  new Step('Contexto push & pull','10s'),
  new Step('Esforços','10s'),
  new Step('Impacto coletivo','10s'),
  new Step('Crescimento do nivel de impacto coletivo','10s'),
  new Step('Votação','15s')
];

var currTime = 0;
var timeoutId;
var stepList = new StepList(allSteps, document.querySelector("ul.steps"));
stepList.draw(currTime);
drawCounter(currTime);

let playBtn = document.querySelector("#play");
playBtn.addEventListener('click', () => {
  if (timeoutId !== undefined) {
    window.clearTimeout(timeoutId);
  }
  timeoutId = window.setTimeout(tick,1000);
}, false);

let pauseBtn = document.querySelector("#pause");
pauseBtn.addEventListener('click', () => {
  if (timeoutId !== undefined) {
    window.clearTimeout(timeoutId);
  }
}, false);
