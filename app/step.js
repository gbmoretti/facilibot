import moment from  'moment'
import momentDurationFormatSetup from 'moment-duration-format'

export default class Step {
  constructor(name, durationString) {
    this.name = name;

    const valueUnit = durationString.match(/^([0-9]+)(.*)/);
    this.timeUnit = valueUnit[2];
    this.timeValue = parseInt(valueUnit[1]);
  }

  get duration() {
    return moment.duration(this.timeValue,this.timeUnit);
  }
}
