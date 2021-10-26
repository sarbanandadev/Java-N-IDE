const en_months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর']
const bd_months = ['বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র']
const bd_seasons = ['গ্রীষ্মকাল', 'বর্ষাকাল', 'শরৎকাল', 'হেমন্তকাল', 'শীতকাল', 'বসন্তকাল']
const bd_days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার']
const bd_total = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30]

const num = { 0: '০', 1: '১', 2: '২', 3: '৩', 4: '৪', 5: '৫', 6: '৬', 7: '৭', 8: '৮', 9: '৯' }

function numConvert(EN) {
  let BD = []
  for (let i = 0; i < EN.length; ++i) {
    if (num.hasOwnProperty(EN[i])) {
      BD.push(num[EN[i]]);
    } else {
      BD.push(EN[i])
    }
  }
  return BD.join('')
}

Number.prototype.pad = function(dig) {
  for (var n = this.toString(); n.length < dig; n = 0 + n);
  return numConvert(n)
}

Date.prototype.addHours = function(h) {
  this.setHours(this.getHours() + h)
  return this
}

function isLeapYear(year) {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
}

function dateDiffInDays(a, b) {
  let mspd = 1000 * 60 * 60 * 24 // mspd = milliseconds per day
  let utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  let utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.floor((utc2 - utc1) / mspd)
}

function bdDate(getDate) {
  getDate = getDate || new Date().addHours(-6)
  // Day, Date, Month, Year for English Calendar
  let enDay = getDate.getDay(),
    enDate = getDate.getDate(),
    enMonth = getDate.getMonth(),
    enYear = getDate.getFullYear()
  if (isLeapYear(enYear)) {
    bd_total[10] = 31 // If the given enorian Year is a LeapYear then, the Falgun month enclosed in the enorian year will be 31 days
  }
  // If the given date is smaller than 14th April of current enorian Year
  // 3 is the index of 'April'
  if (enMonth < 3 || (enMonth === 3 && enDate < 14)) {
    enYear = enYear - 1
  }
  let epoch = new Date(enYear + '-04-13')
  let bd_year = enYear - 593
  let remainingDate = dateDiffInDays(epoch, getDate)
  let monthIndex = 0

  for (let i = 0; i < bd_months.length; i++) {
    if (remainingDate <= bd_total[i]) {
      monthIndex = i
      break
    }
    remainingDate -= bd_total[i]
  }

  let bd_date = remainingDate
  let bd_season = bd_seasons[Math.floor(monthIndex / 2)] // ('পৌষ' + 'মাঘ') = 'শীত'. Every consecutive two index in 'bd_months' indicates a single index in 'bd_seasons'.

  return {
    getDay() {
      return bd_days[enDay]
    },
    getDate() {
      return bd_date.pad()
    },
    getMonth() {
      return bd_months[monthIndex]
    },
    getYear() {
      return bd_year.pad(2)
    },
    getSeason() {
      return bd_season
    },
    getEra() {
      return 'বঙ্গাব্দ'
    }
  }
}

let bangla = bdDate(),
  bd_wd = bangla.getDay(),
  bd_dd = bangla.getDate(),
  bd_mm = bangla.getMonth(),
  bd_yy = bangla.getYear(),
  bd_sea = bangla.getSeason(),
  bd_era = bangla.getEra()

function updateClock() {
  let now = new Date(),
    wd = now.getDay(),
    dd = now.getDate(),
    mm = now.getMonth(),
    yy = now.getFullYear(),
    hou = now.getHours(),
    min = now.getMinutes(),
    sec = now.getSeconds(),
    per = 'পূর্বাহ্ন'

  if (hou >= 12) {
    per = 'অপরাহ্ন'
  }
  if (hou == 0) {
    hou = 12
  }
  if (hou > 12) {
    hou = hou - 12
  }

  let ids = ['day', 'date', 'month', 'year', 'bd_date', 'bd_month', 'bd_year', 'bd_season', 'hour', 'minutes', 'seconds', 'period']
  let values = [bd_days[wd] + ', ', dd.pad(), en_months[mm] + ', ', yy.pad(), bd_dd, bd_mm + ', ', bd_yy + ', ', bd_sea, hou.pad(2), min.pad(2), sec.pad(2), per]
  for (let i = 0; i < ids.length; i++) document.getElementById(ids[i]).firstChild.nodeValue = values[i]
}

function initClock() {
  updateClock()
  window.setInterval('updateClock()', 1)
}