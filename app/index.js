import ProgressBar from 'progressbar.js'
import moment from  'moment'
import lo from 'lodash'
import momentDurationFormatSetup from 'moment-duration-format'

import 'style.css'

function stepDurationToMoment(step) {
  let valueUnit = step.duration.match(/^([0-9]+)(.*)/);
  return moment.duration(parseInt(valueUnit[1]),valueUnit[2]);
}

function drawStepList(steps, currTime) {
  let listElmnt = document.querySelector(".steps");
  listElmnt.innerHTML = '';

  var durationAcc = moment.duration(0, 's');
  lo.each(steps, (step) => {
    let stepDuration = stepDurationToMoment(step);
    let startTime = durationAcc.asSeconds();
    durationAcc.add(stepDuration);
    let endingTime = durationAcc.asSeconds();

    var status = 'doing';
    if (currTime <= startTime) {
      status = 'new';
    }
    if (currTime > endingTime) {
      status = 'done';
    }
    console.log({currTime: currTime, startTime: startTime, endingTime: endingTime, status: status});

    let stepElmnt = document.createElement("li");
    stepElmnt.className = status;
    let durationElemnt = document.createElement("span");
    durationElemnt.append(step.duration);
    durationElemnt.className = 'step-duration';

    stepElmnt.append(step.name, durationElemnt);
    listElmnt.append(stepElmnt);
  });
};

function totalDuration(steps) {
  return lo.reduce(steps, (acc, step) => {
    acc.add(stepDurationToMoment(step));
    return acc;
  },moment.duration(0,'s'));
};

function animateBar(currTime, total) {
  var barSize = currTime / total;
  bar.animate(barSize);
}

function drawCounter(currTime) {
  let counter = document.querySelector(".counter");
  let total = totalDuration(allSteps).asSeconds();
  let timeLeft = total - currTime;
  counter.innerHTML = moment.duration(timeLeft,"s").format("mm[min] ss[s]");
}

function tick() {
  var total = totalDuration(allSteps).asSeconds();
  currTime++;

  animateBar(currTime, total);
  if (currTime < total) {
    timeoutId = window.setTimeout(tick,1000);
  }
  drawStepList(allSteps, currTime);
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
	{name: 'Contexto atual', duration: '5m'},
  {name: 'Contexto push & pull', duration: '10m'},
  {name: 'Esforços', duration: '10m'},
  {name: 'Impacto coletivo', duration: '10m'},
  {name: 'Crescimento do nivel de impacto coletivo', duration: '10m'},
  {name: 'Votação', duration: '15m'}
];

var currTime = 0;
var timeoutId;
drawStepList(allSteps, currTime);
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
