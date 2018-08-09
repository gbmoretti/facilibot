import lo from 'lodash'
import moment from 'moment'

export default class StepList {
  constructor(steps, listElement) {
    this.steps = steps;
    this.listElement = listElement;
  }

  get totalDuration() {
    return lo.reduce(this.steps, (acc, step) => {
      acc.add(step.duration);
      return acc;
    },moment.duration(0,'s'));
  }

  draw(currentTime) {
    this.listElement.innerHTML = '';
    var durationAcc = moment.duration(0, 's');
    lo.each(this.steps, (step) => {
      let startTime = durationAcc.asSeconds();
      durationAcc.add(step.duration);
      let endingTime = durationAcc.asSeconds();

      var status = 'doing';
      if (currentTime <= startTime) {
        status = 'new';
      }
      if (currentTime > endingTime) {
        status = 'done';
      }

      let stepElmnt = document.createElement("li");
      stepElmnt.className = status;
      let durationElemnt = document.createElement("span");
      durationElemnt.append(step.duration);
      durationElemnt.className = 'step-duration';

      stepElmnt.append(step.name, durationElemnt);
      this.listElement.append(stepElmnt);
    });
  }
}
