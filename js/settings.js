const settings = {
  textIds: ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10'],
  borderIds: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10'],
  iconIds: ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8', 'i9', 'i10'],
}

const GetMe = {

  theCurrentValues() {
    const allVals = {};
    const ids = settings.borderIds.concat(settings.textIds).concat(settings.iconIds);
    ids.forEach((id) => {
      allVals[id] = GetMe.theElementValue(id);
    })
    Object.filter = (obj, predicate) =>
      Object.fromEntries(Object.entries(obj).filter(predicate));

    const filtered = Object.filter(allVals, ([name, val]) => val);
    return filtered;

  },
  theElementValue(id) {
    if (id.startsWith('t')) {
      // console.log('text')
      const el = $(`#currentcard #card-${id}`);
      if (el && el.css('display') == 'block') {
        const text = el.text();
        const item = {
          "display": el.css('display'),
          "left": el.css('left'),
          "bottom": el.css('bottom'),
          "z-index": el.css('z-index'),
          "background-color": Convert.theRGB2HEX(el.css('background-color')),
          "color": Convert.theRGB2HEX(el.css('color')),
          "font-size": el.css('font-size'),
          "font-weight": el.css('font-weight')
        }
        return { "css": item, "text": text };

      } else {
        return false;
      }
    } else if (id.startsWith('b')) {
      // console.log('border')
      const el = $(`#currentcard #card-${id}`);
      if (el && el.css('display') == 'block') {
        //create item
        // console.log(Convert.theRGB2HEX(el.css('border-color')))
        const item = {
          "display": el.css('display'),
          "bottom": el.css('bottom'),
          "left": el.css('left'),
          "width": el.css('width'),
          "height": el.css('height'),
          "border-width": el.css('border-width'),
          "border-color": Convert.theRGB2HEX(el.css('border-color')),
          "border-radius": el.css('border-radius'),
          "background-color": Convert.theRGB2HEX(el.css('background-color')),
          "z-index": el.css('z-index'),
          "transform": 'rotate(' + Convert.theTransformValue(el[0]) + 'deg)'
        }
        return { "css": item };

      } else {
        return false;
      }

    } else if (id.startsWith('i')) {
      // console.log('border')
      const el = $(`#currentcard #card-${id}`);
      if (el && el.css('display') == 'block') {
        //create item
        // console.log(Convert.theRGB2HEX(el.css('border-color')))
        const iconClass = el.children('i').prop('class');
        const item = {
          "display": el.css('display'),
          "bottom": el.css('bottom'),
          "left": el.css('left'),
          "width": el.css('width'),
          "height": el.css('height'),
          "font-size": el.css('font-size'),
          "color": Convert.theRGB2HEX(el.css('color')),
          "z-index": el.css('z-index'),
          "transform": 'rotate(' + Convert.theTransformValue(el[0]) + 'deg)'
        }
        return { "css": item, "class": iconClass };

      } else {
        return false;
      }

    }
  },
  theColorData() {
    let deferred = $.Deferred()
    const tJSON = teamsJSON;
    const eplColors = {};
    const eplTeams = [];
    const mlbColors = {};
    const mlbTeams = [];
    const mlsColors = {};
    const mlsTeams = [];
    const nbaColors = {};
    const nbaTeams = [];
    const nflColors = {};
    const nflTeams = [];
    const nhlColors = {};
    const nhlTeams = [];
    let allLeagues = {};

    let count = 0;
    tJSON.forEach((tc) => {
      switch (tc.league) {
        case 'epl':
          eplColors[tc.name] = tc.colors.hex;
          eplTeams.push(tc.name);
          break;
        case 'mlb':
          mlbColors[tc.name] = tc.colors.hex;
          mlbTeams.push(tc.name);
          break;
        case 'mls':
          mlsColors[tc.name] = tc.colors.hex;
          mlsTeams.push(tc.name);
          break;
        case 'nba':
          nbaColors[tc.name] = tc.colors.rgb;
          nbaTeams.push(tc.name);
          break;
        case 'nfl':
          nflColors[tc.name] = tc.colors.hex;
          nflTeams.push(tc.name);
          break;
        case 'nhl':
          nhlColors[tc.name] = tc.colors.hex;
          nhlTeams.push(tc.name);
          break;
        default:
          console.log('__________----- what happend');
      }
      count = count + 1;

      if (count == tJSON.length) {
        allLeagues['epl'] = eplColors
        allLeagues['eplTeams'] = eplTeams
        allLeagues['mlb'] = mlbColors
        allLeagues['mlbTeams'] = mlbTeams
        allLeagues['mls'] = mlsColors
        allLeagues['mlsTeams'] = mlsTeams
        allLeagues['nba'] = nbaColors
        allLeagues['nbaTeams'] = nbaTeams
        allLeagues['nfl'] = nflColors
        allLeagues['nflTeams'] = nflTeams
        allLeagues['nhl'] = nhlColors
        allLeagues['nhlTeams'] = nhlTeams
        const data = allLeagues;
        //console.log(data)
        deferred.resolve(data);
      }

    })

    return deferred.promise();
  },
};

const Convert = {
  theTransformValue(el) {
    var st = window.getComputedStyle(el, null);
    var tm = st.getPropertyValue("-webkit-transform") ||
      st.getPropertyValue("-moz-transform") ||
      st.getPropertyValue("-ms-transform") ||
      st.getPropertyValue("-o-transform") ||
      st.getPropertyValue("transform") ||
      "none";
    if (tm != "none") {
      var values = tm.split('(')[1].split(')')[0].split(',');
      /*
      a = values[0];
      b = values[1];
      angle = Math.round(Math.atan2(b,a) * (180/Math.PI));
      */
      //return Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI)); //this would return negative values the OP doesn't wants so it got commented and the next lines of code added
      var angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
      return (angle < 0 ? angle + 360 : angle); //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
    }
    return 0;
  },
  theRGB2HEX(rgbVal) {
    rgbVal = rgbVal.replace('rgb(', '').replace(')', '');
    const rbgArr = rgbVal.split(',');
    const r = parseInt(rbgArr[0], 10);
    const g = parseInt(rbgArr[1], 10);
    const b = parseInt(rbgArr[2], 10);

    const hexVal = rgbToHex(r, g, b);
    return hexVal
  },
  invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
      // https://stackoverflow.com/a/3943023/112731
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186
        ? '#000000'
        : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + Convert.padZero(r) + Convert.padZero(g) + Convert.padZero(b);
  },
  padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }
}

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('');

const Create = {
  borderHTML(id) {
    const borderHTML = `
      <div class="border-form__container" id="settings-${id}">
          <div>
            <input onclick="showBorderSettings('${id}')" type="checkbox" id="show${id}" name="" />
            <label for="show${id}">Show Border ${id.slice(1)}</label>
            <div class="toggler" onclick="toggleSettings('${id}')">Toggle Settings</div>
          </div>

          <div class="hide" id="form${id}">
            <div class="form-row">
              <div class="form-group">
                <input onchange="adjustBorderColor('${id}')" type="color" id="color${id}" name="" value="#000000" />
                <label for="color${id}">Border</label>
              </div>
              <div class="form-group">
                <input onchange="adjustBackgroundColor('${id}')" type="color" id="bcolor${id}" name="" value="#FFFFFF" />
                <label for="bcolor${id}">Background</label>
              </div>
              <span class="clearBack" onclick="clearBackground('${id}')">Clear</span>
            </div>
            <div>
              <input type="file" onchange="setImage('${id}',this);" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <input onchange="adjustBorderWidth('${id}')" type="number" value="0" id="width${id}">
                <label for="width${id}">Width</label>
              </div>
              <div class="form-group">
                <input onchange="adjustBorderHeight('${id}')" type="number" value="0" id="height${id}">
                <label for="height${id}">Height</label>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <input onchange="adjustBorderLine('${id}')" type="number" value="1" id="line${id}">
                <label for="line${id}">Line width</label>
              </div>
              <div class="form-group">
                <input onchange="adjustBorderRadius('${id}')" type="number" min="0" max="50" value="0" id="radius${id}">
                <label for="radius${id}">Radius</label>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="x${id}">X</label>
                <input onchange="adjustBorderXCoord('${id}')" type="number" value="0" id="x${id}">
              </div>
              <div class="form-group">
                <label for="y${id}">Y</label>
                <input onchange="adjustBorderYCoord('${id}')" type="number" value="0" id="y${id}">
              </div>
              <div class="form-group">
                <label for="z${id}">Z</label>
                <input onchange="adjustZCoord('${id}')" type="number" value="1" id="z${id}">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="rotate${id}">Rotate</label>
                <input onchange="adjustRotate('${id}')" type="number" value="0" id="rotate${id}">
              </div>
            </div>
            <div class="form-row">
              <select onchange="showTeams('${id}')" name="" id="chooseLeague${id}" class="selector">
                <option value="none">None</option>
                <option value="mlb">MLB</option>
                <option value="nfl">NFL</option>
                <option value="nba">NBA</option>
                <option value="nhl">NHL</option>
                <option value="mls">MLS</option>
                <option value="epl">EPL</option>
              </select>
              <select onchange="showColors('${id}')" name="" id="chooseTeam${id}" class="selector">
                <option value="none">None</option>
              </select>
            </div>
            <div id="colorContainer${id}"></div>
          </div>
      </div>`;
    return borderHTML;
  },
  textHTML(id) {
    const textHTML = `
      <div class="border-form__container" id="settings-${id}">
            <div>
              <input onclick="showTextSettings('${id}')" type="checkbox" id="show${id}" name="" />
              <label for="show${id}">Show Text ${id.slice(1)}</label>
              <span class="toggler" onclick="toggleSettings('${id}')">Toggle Settings</span>
            </div>

            <div class="hide" id="form${id}">
              <div>
                <input onkeyup="addText('${id}')" type="text" id="text${id}" value="" style="width: 100%;">
              </div>
              <div class="form-row">
                <div class="form-group">
                  <input onchange="adjustTextSize('${id}')" type="number" value="16" id="width${id}">
                  <label for="width${id}">Size</label>
                </div>
                <div class="form-group">
                  <input onchange="adjustTextLine('${id}')" type="checkbox" value="1" id="line${id}">
                  <label for="line${id}">Bold</label>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <input onchange="adjustTextColor('${id}')" type="color" id="color${id}" name="" value="#000000" />
                  <label for="color${id}">Text</label>
                </div>
                <div class="form-group">
                  <input onchange="adjustBackgroundColor('${id}')" type="color" id="bcolor${id}" name="" value="#FFFFFF" />
                  <label for="bcolor${id}">Background</label>
                </div>
                <span class="clearBack" onclick="clearBackground('${id}')">Clear</span>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="x${id}">X</label>
                  <input onchange="adjustXCoord('${id}')" type="number" value="0" id="x${id}">
                </div>
                <div class="form-group">
                  <label for="y${id}">Y</label>
                  <input onchange="adjustYCoord('${id}')" type="number" value="0" id="y${id}">
                </div>
                <div class="form-group">
                  <label for="z${id}">Z</label>
                  <input onchange="adjustZCoord('${id}')" type="number" value="0" id="z${id}">
                </div>
              </div>
              <div class="form-row">
              <select onchange="showTeams('${id}')" name="" id="chooseLeague${id}" class="selector">
                <option value="none">None</option>
                <option value="mlb">MLB</option>
                <option value="nfl">NFL</option>
                <option value="nba">NBA</option>
                <option value="nhl">NHL</option>
                <option value="mls">MLS</option>
                <option value="epl">EPL</option>
              </select>
              <select onchange="showColors('${id}')" name="" id="chooseTeam${id}" class="selector">
                <option value="none">None</option>
              </select>
            </div>
            <div id="colorContainer${id}"></div>
            </div>
          </div>`;
    return textHTML;
  },
  iconHTML(id) {
    const iconHTML = `
      <div class="border-form__container" id="settings-${id}">
            <div>
              <input onclick="showTextSettings('${id}')" type="checkbox" id="show${id}" name="" />
              <label for="show${id}">Show Icon ${id.slice(1)}</label>
              <span class="toggler" onclick="toggleSettings('${id}')">Toggle Settings</span>
            </div>

            <div class="hide" id="form${id}">

            <div>
              <select onchange="changeIcon('${id}')" name="" id="chooseIcon${id}" class="selector" style="width: 100%;">
                <option value=""></option>
                <option value="fa-solid fa-star">Star</option>
                <option value="fa-regular fa-star">Star alt</option>
                <option value="fa-solid fa-sun">Sun</option>
                <option value="fa-regular fa-sun">Sun alt</option>
                <option value="fa-solid fa-burst">Burst</option>
                <option value="fa-solid fa-certificate">Certificate</option>
                <option value="fa-solid fa-medal">Metal</option>
                <option value="fa-solid fa-meteor">Meteor</option>
                <option value="fa-solid fa-jedi">Jedi</option>
                <option value="fa-solid fa-temperature-full">Thermometer</option>
                <option value="fa-solid fa-smoking">Smoking</option>
                <option value="fa-solid fa-hand-fist">Fist</option>
                <option value="fa-solid fa-baseball">Baseball</option>
                <option value="fa-solid fa-baseball-bat-ball">Baseball Bat</option>
                <option value="fa-solid fa-pepper-hot">Pepper</option>
                <option value="fa-solid fa-bomb">Bomb</option>
                <option value="fa-solid fa-flag-checkered">Checkered Flag</option>
                <option value="fa-regular fa-life-ring">LifeSaver</option>
                <option value="fa-solid fa-triangle-exclamation">Warning</option>
                <option value="fa-solid fa-globe">Globe</option>
                <option value="fa-solid fa-beer-mug-empty">Beer</option>
                <option value="fa-solid fa-champagne-glasses">Champagne</option>
                <option value="fa-solid fa-martini-glass-empty">Martini</option>
                <option value="fa-solid fa-joint">Jibber</option>
                <option value="fa-solid fa-hat-cowboy">Cowboy Hat</option>
                <option value="fa-regular fa-face-smile">Smile</option>
                <option value="fa-solid fa-face-rolling-eyes">Rolling eyes</option>
                <option value="fa-regular fa-face-rolling-eyes">Rolling eyes alt</option>
                <option value="fa-regular fa-face-meh">Meh</option>
                <option value="fa-regular fa-face-grin-tongue-wink">Wink</option>
              </select>
            </div>

              <div class="form-row">
                <div class="form-group">
                  <input onchange="adjustTextSize('${id}')" type="number" value="16" id="width${id}">
                  <label for="width${id}">Size</label>
                </div>
                <div class="form-group">
                  <input onchange="adjustTextColor('${id}')" type="color" id="color${id}" name="" value="#000000" />
                  <label for="color${id}">Color</label>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="x${id}">X</label>
                  <input onchange="adjustXCoord('${id}')" type="number" value="0" id="x${id}">
                </div>
                <div class="form-group">
                  <label for="y${id}">Y</label>
                  <input onchange="adjustYCoord('${id}')" type="number" value="0" id="y${id}">
                </div>
                <div class="form-group">
                  <label for="z${id}">Z</label>
                  <input onchange="adjustZCoord('${id}')" type="number" value="0" id="z${id}">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="rotate${id}">Rotate</label>
                  <input onchange="adjustRotate('${id}')" type="number" value="0" id="rotate${id}">
                </div>
              </div>
              <div class="form-row">
              <select onchange="showTeams('${id}')" name="" id="chooseLeague${id}" class="selector">
                <option value="none">None</option>
                <option value="mlb">MLB</option>
                <option value="nfl">NFL</option>
                <option value="nba">NBA</option>
                <option value="nhl">NHL</option>
                <option value="mls">MLS</option>
                <option value="epl">EPL</option>
              </select>
              <select onchange="showColors('${id}')" name="" id="chooseTeam${id}" class="selector">
                <option value="none">None</option>
              </select>
            </div>
            <div id="colorContainer${id}"></div>
            </div>
          </div>`;
    return iconHTML;
  }
}

const Templates = [

  {
    name: 'Simple Border',
    templateValues: {
      "b1": {
        "css": {
          "display": "block",
          "bottom": "0px",
          "left": "0px",
          "width": "284px",
          "height": "71px",
          "border-width": "10px",
          "border-color": "rgb(0, 0, 0)",
          "border-radius": "0%",
          "background-color": "rgba(0, 0, 0, 0)",
          "z-index": "10",
          "transform": "matrix(1, 0, 0, 1, 0, 0)"
        }
      },
      "b2": {
        "css": {
          "display": "block",
          "bottom": "15px",
          "left": "233px",
          "width": "46px",
          "height": "22px",
          "border-width": "3px",
          "border-color": "rgb(0, 0, 0)",
          "border-radius": "0%",
          "background-color": "rgba(0, 0, 0, 0)",
          "z-index": "10",
          "transform": "matrix(1, 0, 0, 1, 0, 0)"
        }
      },
      "t1": {
        "css": {
          "display": "block",
          "left": "15px",
          "bottom": "58px",
          "z-index": "10",
          "background-color": "rgba(0, 0, 0, 0)",
          "color": "rgb(0, 0, 0)",
          "font-size": "18px",
          "font-weight": "700"
        },
        "text": "Your Name Here"
      },
      "t2": {
        "css": {
          "display": "block",
          "left": "15px",
          "bottom": "41px",
          "z-index": "10",
          "background-color": "rgba(0, 0, 0, 0)",
          "color": "rgb(0, 0, 0)",
          "font-size": "16px",
          "font-weight": "400"
        },
        "text": "Home Team"
      },
      "t3": {
        "css": {
          "display": "block",
          "left": "15px",
          "bottom": "10px",
          "z-index": "10",
          "background-color": "rgba(0, 0, 0, 0)",
          "color": "rgb(0, 0, 0)",
          "font-size": "15px",
          "font-weight": "700"
        },
        "text": "#21"
      },
      "t4": {
        "css": {
          "display": "block",
          "left": "240px",
          "bottom": "19px",
          "z-index": "10",
          "background-color": "rgba(0, 0, 0, 0)",
          "color": "rgb(0, 0, 0)",
          "font-size": "16px",
          "font-weight": "700"
        },
        "text": "RAW"
      }
    }
  },

  {
    name: 'Large Name',
    templateValues: {
      "b1": {
        "css": {
          "display": "block",
          "bottom": "0px",
          "left": "0px",
          "width": "286px",
          "height": "73px",
          "border-radius": "0%",
          "border-width": "10px",
          "border-color": "rgb(0, 0, 102)",
          "background-color": "rgba(0, 0, 0, 0)",
          "z-index": "10"
        }
      },
      "b2": {
        "css": {
          "display": "block",
          "bottom": "14px",
          "left": "182px",
          "width": "58px",
          "height": "37px",
          "border-radius": "0%",
          "border-width": "5px",
          "border-color": "rgb(0, 0, 102)",
          "background-color": "rgb(196, 30, 58)",
          "z-index": "20"
        }
      },
      "t1": {
        "css": {
          "display": "block",
          "left": "12px",
          "bottom": "13px",
          "z-index": "10",
          "background-color": "rgba(0, 0, 0, 0)",
          "color": "rgb(0, 0, 102)",
          "font-size": "42px",
          "font-weight": "700"
        },
        "text": "PUJOLS "
      },
      "t2": {
        "css": {
          "display": "block",
          "left": "15px",
          "bottom": "16px",
          "z-index": "10",
          "background-color": "rgba(0, 0, 0, 0)",
          "color": "rgb(196, 30, 58)",
          "font-size": "42px",
          "font-weight": "700"
        },
        "text": "PUJOLS "
      },
      "t3": {
        "css": {
          "display": "block",
          "left": "188px",
          "bottom": "38px",
          "z-index": "30",
          "background-color": "rgba(0, 0, 0, 0)",
          "color": "rgb(0, 0, 102)",
          "font-size": "12px",
          "font-weight": "700"
        },
        "text": "Cardinals"
      },
      "t4": {
        "css": {
          "display": "block",
          "left": "189px",
          "bottom": "20px",
          "z-index": "20",
          "background-color": "rgba(0, 0, 0, 0)",
          "color": "rgb(0, 0, 102)",
          "font-size": "11px",
          "font-weight": "700"
        },
        "text": "#156 RAW"
      }
    }
  },

  {
    name: 'Angled elements',
    templateValues: {
      "b1": {
        "css": {
          "display": "block",
          "bottom": "0px",
          "left": "0px",
          "width": "286px",
          "height": "73px",
          "border-width": "9px",
          "border-color": "#000066",
          "border-radius": "0%",
          "background-color": "rgb(0, 0, 102)",
          "z-index": "10",
          "transform": "matrix(1, 0, 0, 1, 0, 0)"
        }
      },
      "b2": {
        "css": {
          "display": "block",
          "bottom": "9px",
          "left": "-62px",
          "width": "198px",
          "height": "22px",
          "border-width": "5px",
          "border-color": "#c41e3a",
          "border-radius": "0%",
          "background-color": "rgba(0, 0, 0, 0)",
          "z-index": "10",
          "transform": "matrix(0.615661, 0.788011, -0.788011, 0.615661, 0, 0)"
        }
      },
      "b3": {
        "css": {
          "display": "block",
          "bottom": "0px",
          "left": "-105px",
          "width": "175px",
          "height": "58px",
          "border-width": "5px",
          "border-color": "#c41e3a",
          "border-radius": "0%",
          "background-color": "rgba(0, 0, 0, 0)",
          "z-index": "10",
          "transform": "matrix(-0.241922, 0.970296, -0.970296, -0.241922, 0, 0)"
        }
      },
      "b4": {
        "css": {
          "display": "block",
          "bottom": "13px",
          "left": "77px",
          "width": "192px",
          "height": "58px",
          "border-width": "4px",
          "border-color": "#fedb00",
          "border-radius": "0%",
          "background-color": "rgb(196, 30, 58)",
          "z-index": "10",
          "transform": "matrix(1, 0, 0, 1, 0, 0)"
        }
      },
      "t1": {
        "css": {
          "display": "block",
          "left": "84px",
          "bottom": "48px",
          "z-index": "10",
          "background-color": "rgba(0, 0, 0, 0)",
          "color": "rgb(0, 0, 102)",
          "font-size": "22px",
          "font-weight": "700"
        },
        "text": "ALBERT PUJOLS"
      },
      "t2": {
        "css": {
          "display": "block",
          "left": "239px",
          "bottom": "18px",
          "z-index": "10",
          "background-color": "rgba(0, 0, 0, 0)",
          "color": "rgb(254, 219, 0)",
          "font-size": "16px",
          "font-weight": "700"
        },
        "text": "STL"
      },
      "t3": {
        "css": {
          "display": "block",
          "left": "0px",
          "bottom": "0px",
          "z-index": "10",
          "background-color": "rgba(0, 0, 0, 0)",
          "color": "rgb(0, 0, 0)",
          "font-size": "16px",
          "font-weight": "400"
        },
        "text": ""
      },
      "t4": {
        "css": {
          "display": "block",
          "left": "0px",
          "bottom": "0px",
          "z-index": "10",
          "background-color": "rgba(0, 0, 0, 0)",
          "color": "rgb(0, 0, 0)",
          "font-size": "16px",
          "font-weight": "400"
        },
        "text": ""
      }
    }
  },

  {
    name: 'Angled 2',
    templateValues: {
      "b1": {
        "css": {
          "display": "block",
          "bottom": "0px",
          "left": "0px",
          "width": "286px",
          "height": "73px",
          "border-width": "9px",
          "border-color": "#000066",
          "border-radius": "0%",
          "background-color": "#000066",
          "z-index": "10",
          "transform": "rotate(0deg)"
        }
      },
      "b2": {
        "css": {
          "display": "block",
          "bottom": "9px",
          "left": "-62px",
          "width": "198px",
          "height": "22px",
          "border-width": "5px",
          "border-color": "#c41e3a",
          "border-radius": "0%",
          "background-color": "#NaN0000",
          "z-index": "10",
          "transform": "rotate(52deg)"
        }
      },
      "b3": {
        "css": {
          "display": "block",
          "bottom": "0px",
          "left": "-105px",
          "width": "175px",
          "height": "58px",
          "border-width": "5px",
          "border-color": "#c41e3a",
          "border-radius": "0%",
          "background-color": "#NaN0000",
          "z-index": "10",
          "transform": "rotate(104deg)"
        }
      },
      "b4": {
        "css": {
          "display": "block",
          "bottom": "13px",
          "left": "77px",
          "width": "192px",
          "height": "58px",
          "border-width": "4px",
          "border-color": "#fedb00",
          "border-radius": "0%",
          "background-color": "#c41e3a",
          "z-index": "10",
          "transform": "rotate(0deg)"
        }
      },
      "t1": {
        "css": {
          "display": "block",
          "left": "84px",
          "bottom": "48px",
          "z-index": "10",
          "background-color": "#NaN0000",
          "color": "#000066",
          "font-size": "22px",
          "font-weight": "700"
        },
        "text": "ALBERT PUJOLS"
      },
      "t2": {
        "css": {
          "display": "block",
          "left": "239px",
          "bottom": "18px",
          "z-index": "10",
          "background-color": "#NaN0000",
          "color": "#fedb00",
          "font-size": "16px",
          "font-weight": "700"
        },
        "text": "STL"
      },
      "t3": {
        "css": {
          "display": "block",
          "left": "0px",
          "bottom": "0px",
          "z-index": "10",
          "background-color": "#NaN0000",
          "color": "#000000",
          "font-size": "16px",
          "font-weight": "400"
        },
        "text": ""
      },
      "t4": {
        "css": {
          "display": "block",
          "left": "0px",
          "bottom": "0px",
          "z-index": "10",
          "background-color": "#NaN0000",
          "color": "#000000",
          "font-size": "16px",
          "font-weight": "400"
        },
        "text": ""
      }
    }
  },

  {
    name: 'icons',
    templateValues: {
      "b1": {
        "css": {
          "display": "block",
          "bottom": "0px",
          "left": "0px",
          "width": "284px",
          "height": "71px",
          "border-width": "10px",
          "border-color": "#000000",
          "border-radius": "0%",
          "background-color": "#NaN0000",
          "z-index": "10",
          "transform": "rotate(0deg)"
        }
      },
      "b2": {
        "css": {
          "display": "block",
          "bottom": "15px",
          "left": "233px",
          "width": "46px",
          "height": "22px",
          "border-width": "3px",
          "border-color": "#000000",
          "border-radius": "0%",
          "background-color": "#NaN0000",
          "z-index": "10",
          "transform": "rotate(0deg)"
        }
      },
      "t1": {
        "css": {
          "display": "block",
          "left": "15px",
          "bottom": "58px",
          "z-index": "10",
          "background-color": "#NaN0000",
          "color": "#000000",
          "font-size": "18px",
          "font-weight": "700"
        },
        "text": "Your Name Here"
      },
      "t2": {
        "css": {
          "display": "block",
          "left": "15px",
          "bottom": "41px",
          "z-index": "10",
          "background-color": "#NaN0000",
          "color": "#000000",
          "font-size": "16px",
          "font-weight": "400"
        },
        "text": "Home Team"
      },
      "t3": {
        "css": {
          "display": "block",
          "left": "15px",
          "bottom": "10px",
          "z-index": "10",
          "background-color": "#NaN0000",
          "color": "#000000",
          "font-size": "15px",
          "font-weight": "700"
        },
        "text": "#21"
      },
      "t4": {
        "css": {
          "display": "block",
          "left": "240px",
          "bottom": "19px",
          "z-index": "10",
          "background-color": "#NaN0000",
          "color": "#000000",
          "font-size": "16px",
          "font-weight": "700"
        },
        "text": "RAW"
      },
      "i1": {
        "css": {
          "display": "block",
          "bottom": "25px",
          "left": "14px",
          "width": "18px",
          "height": "18px",
          "font-size": "16px",
          "color": "#e82626",
          "z-index": "10",
          "transform": "rotate(0deg)"
        },
        "class": "fa-solid fa-star"
      },
      "i2": {
        "css": {
          "display": "block",
          "bottom": "13px",
          "left": "38px",
          "width": "30px",
          "height": "31px",
          "font-size": "27px",
          "color": "#000000",
          "z-index": "10",
          "transform": "rotate(0deg)"
        },
        "class": "fa-solid fa-jedi"
      }
    }
  },

  {
    name: 'Card size',
    templateValues: {
      "b1": {
        "css": {
          "display": "block",
          "bottom": "0px",
          "left": "0px",
          "width": "243px",
          "height": "338px",
          "border-width": "1px",
          "border-color": "#000000",
          "border-radius": "0%",
          "background-color": "#NaN0000",
          "z-index": "10",
          "transform": "rotate(0deg)"
        }
      },
      "t1": {
        "css": {
          "display": "block",
          "left": "21px",
          "bottom": "64px",
          "z-index": "10",
          "background-color": "#NaN0000",
          "color": "#000000",
          "font-size": "16px",
          "font-weight": "700"
        },
        "text": "Hey there this is my card"
      }
    }
  },
  {
    name: 'Lookouts Card',
    templateValues: {
      "b1": {
        "css": {
          "display": "block",
          "bottom": "0px",
          "left": "0px",
          "width": "243px",
          "height": "309px",
          "border-width": "0px",
          "border-color": "#000000",
          "border-radius": "0%",
          "background-color": "#NaN0000",
          "z-index": "10",
          "transform": "rotate(0deg)"
        }
      },
      "b2": {
        "css": {
          "display": "block",
          "bottom": "294px",
          "left": "8px",
          "width": "234px",
          "height": "39px",
          "border-width": "0px",
          "border-color": "#000000",
          "border-radius": "0%",
          "background-color": "#eb3d49",
          "z-index": "10",
          "transform": "rotate(0deg)"
        }
      },
      "b3": {
        "css": {
          "display": "block",
          "bottom": "0px",
          "left": "0px",
          "width": "230px",
          "height": "324px",
          "border-width": "8px",
          "border-color": "#db3333",
          "border-radius": "0%",
          "background-color": "#NaN0000",
          "z-index": "10",
          "transform": "rotate(0deg)"
        }
      },
      "b4": {
        "css": {
          "display": "block",
          "bottom": "0px",
          "left": "7px",
          "width": "232px",
          "height": "57px",
          "border-width": "0px",
          "border-color": "#000000",
          "border-radius": "0%",
          "background-color": "#eb3d49",
          "z-index": "10",
          "transform": "rotate(0deg)"
        }
      },
      "t1": {
        "css": {
          "display": "block",
          "left": "10px",
          "bottom": "293px",
          "z-index": "10",
          "background-color": "#NaN0000",
          "color": "#000000",
          "font-size": "40px",
          "font-weight": "700"
        },
        "text": "LOOKOUTS"
      },
      "t2": {
        "css": {
          "display": "block",
          "left": "7px",
          "bottom": "296px",
          "z-index": "10",
          "background-color": "#NaN0000",
          "color": "#ecff83",
          "font-size": "40px",
          "font-weight": "700"
        },
        "text": "LOOKOUTS"
      },
      "t3": {
        "css": {
          "display": "block",
          "left": "0px",
          "bottom": "0px",
          "z-index": "10",
          "background-color": "#NaN0000",
          "color": "#000000",
          "font-size": "16px",
          "font-weight": "400"
        },
        "text": ""
      },
      "t4": {
        "css": {
          "display": "block",
          "left": "58px",
          "bottom": "23px",
          "z-index": "10",
          "background-color": "#NaN0000",
          "color": "#000000",
          "font-size": "22px",
          "font-weight": "700"
        },
        "text": "Judah Bray"
      },
      "t5": {
        "css": {
          "display": "block",
          "left": "88px",
          "bottom": "10px",
          "z-index": "10",
          "background-color": "#NaN0000",
          "color": "#ecff83",
          "font-size": "15px",
          "font-weight": "700"
        },
        "text": "All-Star"
      },
      "i1": {
        "css": {
          "display": "block",
          "bottom": "13px",
          "left": "146px",
          "width": "11px",
          "height": "11px",
          "font-size": "10px",
          "color": "#ecff83",
          "z-index": "10",
          "transform": "rotate(0deg)"
        },
        "class": "fa-solid fa-star"
      },
      "i2": {
        "css": {
          "display": "block",
          "bottom": "13px",
          "left": "72px",
          "width": "11px",
          "height": "11px",
          "font-size": "10px",
          "color": "#ecff83",
          "z-index": "10",
          "transform": "rotate(0deg)"
        },
        "class": "fa-solid fa-star"
      }
    }
  },
  {
    name: 'All-Star',
    templateValues: {
      "b1": {
        "css": {
          "display": "block",
          "bottom": "10px",
          "left": "-1px",
          "width": "275px",
          "height": "376px",
          "border-width": "1px",
          "border-color": "#f0e13d",
          "border-radius": "0%",
          "background-color": "#NaN0000",
          "z-index": "10",
          "transform": "rotate(0deg)"
        }
      },
      "b2": {
        "css": {
          "display": "block",
          "bottom": "-4px",
          "left": "-3px",
          "width": "276px",
          "height": "74px",
          "border-width": "2px",
          "border-color": "#ffffff",
          "border-radius": "0%",
          "background-color": "#d9d3d3",
          "z-index": "10",
          "transform": "rotate(0deg)"
        }
      },
      "b3": {
        "css": {
          "display": "block",
          "bottom": "4px",
          "left": "4px",
          "width": "70px",
          "height": "70px",
          "border-width": "1px",
          "border-color": "#000000",
          "border-radius": "50%",
          "background-color": "#ffffff",
          "z-index": "20",
          "transform": "rotate(0deg)"
        }
      },
      "b4": {
        "css": {
          "display": "block",
          "bottom": "0px",
          "left": "0px",
          "width": "260px",
          "height": "372px",
          "border-width": "7px",
          "border-color": "#ffffff",
          "border-radius": "0%",
          "background-color": "#NaN0000",
          "z-index": "10",
          "transform": "rotate(0deg)"
        }
      },
      "t1": {
        "css": {
          "display": "block",
          "left": "83px",
          "bottom": "-1px",
          "z-index": "10",
          "background-color": "#NaN0000",
          "color": "#000000",
          "font-size": "35px",
          "font-weight": "400"
        },
        "text": "Judah Bray"
      },
      "t2": {
        "css": {
          "display": "block",
          "left": "81px",
          "bottom": "1px",
          "z-index": "10",
          "background-color": "#NaN0000",
          "color": "#e36730",
          "font-size": "35px",
          "font-weight": "400"
        },
        "text": "Judah Bray"
      },
      "t3": {
        "css": {
          "display": "block",
          "left": "12px",
          "bottom": "14px",
          "z-index": "60",
          "background-color": "#NaN0000",
          "color": "#000000",
          "font-size": "43px",
          "font-weight": "700"
        },
        "text": "JB"
      },
      "t4": {
        "css": {
          "display": "block",
          "left": "17px",
          "bottom": "347px",
          "z-index": "30",
          "background-color": "#NaN0000",
          "color": "#000000",
          "font-size": "13px",
          "font-weight": "700"
        },
        "text": "Rookie"
      },
      "t5": {
        "css": {
          "display": "block",
          "left": "11px",
          "bottom": "337px",
          "z-index": "40",
          "background-color": "#NaN0000",
          "color": "#000000",
          "font-size": "11px",
          "font-weight": "700"
        },
        "text": "ALL-STAR"
      },
      "i1": {
        "css": {
          "display": "block",
          "bottom": "309px",
          "left": "6px",
          "width": "65px",
          "height": "75px",
          "font-size": "65px",
          "color": "#e36730",
          "z-index": "10",
          "transform": "rotate(0deg)"
        },
        "class": "fa-solid fa-certificate"
      },
      "i2": {
        "css": {
          "display": "block",
          "bottom": "3px",
          "left": "13px",
          "width": "53px",
          "height": "70px",
          "font-size": "61px",
          "color": "#dd6631",
          "z-index": "40",
          "transform": "rotate(0deg)"
        },
        "class": "fa-solid fa-hand-fist"
      }
    }
  }








];