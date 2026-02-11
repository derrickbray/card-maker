

$(document).ready(function () {
    init();
});


function init() {
    console.log('from the init function');

    let borderHTML = '';
    let textHTML = '';
    let iconHTML = '';

    settings.borderIds.forEach((b) => {
        let borderItem = Create.borderHTML(b);
        borderHTML = borderHTML + borderItem;
    });

    settings.textIds.forEach((t) => {
        let textItem = Create.textHTML(t);
        textHTML = textHTML + textItem;
    });

    settings.iconIds.forEach((i) => {
        let iconItem = Create.iconHTML(i);
        iconHTML = iconHTML + iconItem;
    })

    Templates.forEach((t) => {
        const op = `<option value="${t.name}">${t.name}</option>`;
        $('#templateCh').append(op)
    })

    const optionTabs = `<div class="option-tabs">
        <div onclick="showSettingsTab('border')" class="optionClicker" data-tab="border">Border Options</div>
        <div onclick="showSettingsTab('text')" class="optionClicker" data-tab="text">Text Options</div>
        <div onclick="showSettingsTab('icon')" class="optionClicker" data-tab="icon">Icon Options</div>
    </div>`;
    const borderEl = `<div id="border-element" class="options-content"><div class="border-form">${borderHTML}</div></div>`;
    const textEl = `<div id="text-element" class="options-content hide"><div class="border-form">${textHTML}</div></div>`;
    const iconEl = `<div id="icon-element" class="options-content hide"><div class="border-form">${iconHTML}</div></div>`;

    $('#CurrentItemForm').append(optionTabs + borderEl + textEl + iconEl);
    $('#templateCh').on('change', setTemplate);
}

function addCardToGallery() {
    console.log('add to gallery');
    const alreadyThere = $('.print-gallery').children().length;
    // $('#itemCount').text(`Count ${alreadyThere}`);
    if (alreadyThere && alreadyThere > 38) {
        $('#itemCount').text(`Count ${alreadyThere} Page is full`);
        return;
    }
    const theCurrentCard = $('#currentcard').clone();
    const eachEl = $(theCurrentCard).find('*');
    $(eachEl).each((inx, item) => {
        const newID = $(item).prop('id') + 'tplt';
        $(item).addClass('template-item');
        $(item).prop('id', newID);
    })

    $('.print-gallery').prepend(theCurrentCard);
    setTimeout(() => {
        const nowThere = $('.print-gallery').children().length;
        $('#itemCount').text(`Count ${nowThere}`);
    }, 100);
}

function removeLastCard() {
    $($('.print-gallery').children()[0]).remove();
    setTimeout(() => {
        const alreadyThere = $('.print-gallery').children().length;
        $('#itemCount').text(`Count ${alreadyThere}`);
    }, 100);
}

function changeCardSize() {
    const toThisSize = $(`#sizeCh`).val();
    if (toThisSize == 'label') {
        const labelSizes = {
            "width": "80.5mm",
            "height": "24mm"
        }
        $(`#currentcard`).css(labelSizes);
    } else if (toThisSize == 'card') {
        const cardSizes = {
            "width": "72.5mm",
            "height": "102mm"
        }
        $(`#currentcard`).css(cardSizes);
    } else {
        console.log('-----------  add a new choice here')
    }
}

function setImage(id, input) {
    $(`#card-${id}`).html(`<img class="borderImg" id="backImg-${id}">`);
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $(`#backImg-${id}`).attr('src', e.target.result).width('100%');
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function showSettings(ev) {
    console.log(ev)
    console.log(ev.srcElement.parentElement);
    const parentEl = ev.srcElement.parentElement;
    const theForm = $(parentEl).find('.border-form');
    if ($(theForm).css('display') == 'none') {
        $('.border-form').hide();
        $(theForm).show();
    } else {
        $('.border-form').hide();
        // $(parentEl).find('.border-form').hide();
    }
}

function showSettingsTab(tab) {
    // Hide all content sections
    $('.options-content').addClass('hide');
    // Remove active state from all tabs
    $('.optionClicker').removeClass('active');

    // Show the selected content
    $(`#${tab}-element`).removeClass('hide');
    // Mark the clicked tab as active
    $(`.optionClicker[data-tab="${tab}"]`).addClass('active');
}

function setTemplate() {
    console.log($('#templateCh').val())
    const templateChoice = $('#templateCh').val();
    if (templateChoice == 'none') {
        // clear form and card
        clearFormNCard();
    } else {
        const neededTemplate = Templates.filter((t) => {
            return t.name == templateChoice;
        });
        setTheValues(neededTemplate[0]);
    }
}

function printGallery() {
    const prtContent = document.getElementById("printThis");
    const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write('<link rel=stylesheet href=css/style.css>');
    WinPrint.document.write('<div>' + prtContent.innerHTML + '</div>');
    WinPrint.document.close();
    setTimeout(() => {
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
    }, 1000);
}

function setTheValues(template) {
    clearFormNCard();
    const templateVals = template.templateValues;
    const valArray = Object.entries(templateVals)
    console.log(valArray);
    valArray.forEach((v) => {
        const id = v[0];
        const cssVals = v[1].css;
        const iconClass = v[1].class;
        $(`#bcolor${id}`).val(cssVals["background-color"]);
        $(`#show${id}`).prop('checked', true);
        $(`#card-${id}`).css(cssVals);
        $(`#x${id}`).val(cssVals["left"].replace('px', ''));
        $(`#y${id}`).val(cssVals["bottom"].replace('px', ''));
        $(`#z${id}`).val(cssVals["z-index"]);

        try {
            $(`#rotate${id}`).val(cssVals["transform"].replace('rotate(', '').replace('deg)', ''));
        } catch (error) {
            const matrix = cssVals['transform'];
            if (matrix) {
                const angle = convertToAngle(matrix);
                $(`#rotate${id}`).val(angle);
            }
        }


        if (id.startsWith('b')) {
            // form values
            $(`#color${id}`).val(cssVals["border-color"]);
            $(`#line${id}`).val(cssVals["border-width"].replace('px', ''));
            $(`#width${id}`).val(cssVals["width"].replace('px', ''));
            $(`#height${id}`).val(cssVals["height"].replace('px', ''));
            $(`#radius${id}`).val(cssVals["border-radius"].replace('%', ''));

        } else if (id.startsWith('t')) {
            // card value
            $(`#card-${id}`).text(v[1].text);
            // form values
            $(`#text${id}`).val(v[1].text);
            $(`#width${id}`).css(cssVals["font-size"].replace('px', ''));
            $(`#color${id}`).val(cssVals["color"]);
        } else if (id.startsWith('i')) {
            $(`#width${id}`).css(cssVals["font-size"].replace('px', ''));
            $(`#card-${id}`).html(`<i class="${iconClass}"></i>`);
        }
    });
}

function createTemplateJSON() {
    const templateValues = GetMe.theCurrentValues();
    console.log(templateValues)
    //
}

function changeIcon(id) {
    const iconSelection = $(`#chooseIcon${id}`).val()
    console.log('changeIcon value ', iconSelection, id)
    const icon = `<i class="${iconSelection}"></i>`;
    $(`#card-${id}`).html(icon);
}

function convertToAngle(matrix) {
    var values = matrix.split('(')[1],
        values = values.split(')')[0],
        values = values.split(',');

    var sin = values[1]; // 0.5

    return Math.round(Math.asin(sin) * (180 / Math.PI));
}


function clearFormNCard() {
    // const ids = settings.borderIds.concat(settings.textIds);
    settings.borderIds.forEach((id) => {
        clearBorderForm(id);
    });

    settings.textIds.forEach((id) => {
        clearTextForm(id);
    })

    settings.iconIds.forEach((id) => {
        clearTextForm(id);
    })
}

function clearTextForm(id) {
    $(`#form${id}`).hide();
    $(`#show${id}`).prop('checked', false);
    $(`#text${id}`).val('');
    $(`#color${id}`).val('#000000');
    $(`#bcolor${id}`).val('#FFFFFF');
    $(`#width${id}`).val('16');
    $(`#line${id}`).prop('checked', false)
    $(`#x${id}`).val('0');
    $(`#y${id}`).val('0');
    $(`#z${id}`).val('1');
    $(`#chooseIcon${id}`).val('');
    $(`#card-${id}`).html(``);
    resetTextCard(id)
}

function resetTextCard(id) {
    adjustTextSize(id);
    clearBackground(id);
    adjustTextColor(id);
    adjustTextLine(id);
    addText(id);
    adjustXCoord(id);
    adjustYCoord(id);
    adjustZCoord(id);
}

function clearBorderForm(id) {
    $(`#form${id}`).hide();
    $(`#show${id}`).prop('checked', false);
    $(`#color${id}`).val('#000000');
    $(`#bcolor${id}`).val('#FFFFFF');
    $(`#width${id}`).val('175');
    $(`#height${id}`).val('58');
    $(`#line${id}`).val('1');
    $(`#radius${id}`).val('0');
    $(`#x${id}`).val('0');
    $(`#y${id}`).val('0');
    $(`#z${id}`).val('1');
    resetBorderCard(id)
}

function resetBorderCard(id) {
    $(`#card-${id}`).hide();
    adjustBorderColor(id);
    clearBackground(id);
    adjustBorderWidth(id);
    adjustBorderHeight(id);
    adjustBorderLine(id);
    adjustBorderXCoord(id);
    adjustBorderYCoord(id);
    adjustBorderRadius(id);
    adjustZCoord(id);
}

function showTeams(id) {
    $(`#chooseTeam${id}`).html('<option value="none">None</option>');
    const lg = $(`#chooseLeague${id}`).val();
    GetMe.theColorData().then((cd) => {
        // console.log(cd);
        const theTeams = cd[`${lg}Teams`];
        theTeams.forEach((team) => {
            const el = `<option value="${team}">${team}</option>`;
            $(`#chooseTeam${id}`).append(el);
        })
    });
}

function showColors(id) {
    let kind = 'Border';
    let kindNN = 'bord'
    if (id.startsWith('t')) {
        kind = 'Text';
        kindNN = 'text'
    }
    const lg = $(`#chooseLeague${id}`).val();
    const tm = $(`#chooseTeam${id}`).val();
    $(`#colorContainer${id}`).html('');
    GetMe.theColorData().then((cd) => {
        const theColors = cd[lg][tm];
        // console.log(theColors)
        if (theColors) {
            theColors.forEach((c) => {
                let el;
                if (lg == 'nba') {
                    console.log('do this stuff');
                    alert('NOt ready yet')
                } else {
                    el = `<div style="padding: .3rem;"><span style="background-color:#${c};width:16px;height:16px;">Color
                                </span>#${c} 
                                <span><span class="clrBtn" onclick="setColVal('${kindNN}','${id}','${c}')">${kind}</span>
                                <span class="clrBtn" onclick="setColVal('back','${id}','${c}')">Background</span></span>
                            </div>`;
                    $(`#colorContainer${id}`).append(el);
                }
            })
        }
    })
}

function setColVal(kind, id, color) {
    let target = '';
    if (kind == 'back') {
        target = '#bcolor';
        $(`#card-${id}`).css('backgroundColor', `#${color}`);
    } else if (kind == 'text') {
        target = '#color';
        $(`#card-${id}`).css('color', `#${color}`);
    } else {
        target = '#color';
        $(`#card-${id}`).css('borderColor', `#${color}`);
    }

    $(target + id).val(`#${color}`)
}


function showBorderSettings(id) {
    if ($(`#card-${id}`).css('display') == 'none') {
        $(`#card-${id}`).show();
    } else {
        $(`#card-${id}`).hide();
    }
}

function clearBackground(id) {
    $(`#card-${id}`).css('backgroundColor', 'transparent');
}

function adjustRotate(id) {
    const r = $(`#rotate${id}`).val();
    const rval = `rotate(${r}deg)`;
    $(`#card-${id}`).css('transform', rval);
}

function adjustBorderColor(id) {
    $(`#card-${id}`).css('borderColor', $(`#color${id}`).val());
}

function adjustBorderRadius(id) {
    $(`#card-${id}`).css('border-radius', $(`#radius${id}`).val() + '%');
}

function adjustBorderWidth(id) {
    $(`#card-${id}`).css('width', $(`#width${id}`).val());
}

function adjustBorderHeight(id) {
    $(`#card-${id}`).css('height', $(`#height${id}`).val());
}

function adjustBorderLine(id) {
    $(`#card-${id}`).css('borderWidth', $(`#line${id}`).val());
}

function adjustBorderXCoord(id) {
    $(`#card-${id}`).css('left', $(`#x${id}`).val() + 'px');
}

function adjustBorderYCoord(id) {
    $(`#card-${id}`).css('bottom', $(`#y${id}`).val() + 'px');
}

function showTextSettings(id) {
    if ($(`.${id}`).css('display') == 'none') {
        $(`#card-${id}`).show();
    } else {
        $(`#card-${id}`).hide();
    }
}

function toggleSettings(id) {
    if ($(`#form${id}`).css('display') == 'none') {
        $(`#form${id}`).show();
    } else {
        $(`#form${id}`).hide();
    }
}

function addText(id) {
    $(`#card-${id}`).text($(`#text${id}`).val());
}

function adjustTextColor(id) {
    $(`#card-${id}`).css('color', $(`#color${id}`).val());
}

function adjustTextWidth(id) {
    $(`#card-${id}`).css('fontSize', $(`#width${id}`).val() + 'px');
}

function adjustTextSize(id) {
    $(`#card-${id}`).css('fontSize', $(`#width${id}`).val() + 'px')
    // $(`#card-${id}`).css('height', $(`#height${id}`).val());
}

function adjustTextLine(id) {
    const isChecked = $(`#line${id}`).is(':checked');
    if (isChecked) {
        $(`#card-${id}`).css('fontWeight', 'bold');
    } else {
        $(`#card-${id}`).css('fontWeight', 'normal');
    }
}

function adjustXCoord(id) {
    $(`#card-${id}`).css('left', $(`#x${id}`).val() + 'px');
}

function adjustYCoord(id) {
    $(`#card-${id}`).css('bottom', $(`#y${id}`).val() + 'px');
}

function adjustZCoord(id) {
    const zVal = $(`#z${id}`).val();
    let z = zVal * 10;
    if (z < 1) {
        z = 1;
    }
    $(`#card-${id}`).css('zIndex', z);
}

function adjustBackgroundColor(id) {
    $(`#card-${id}`).css('backgroundColor', $(`#bcolor${id}`).val());
}

$.fn.rotationInfo = function () {
    var el = $(this),
        tr = el.css("-webkit-transform") || el.css("-moz-transform") || el.css("-ms-transform") || el.css("-o-transform") || '',
        info = { rad: 0, deg: 0 };
    if (tr = tr.match('matrix\\((.*)\\)')) {
        tr = tr[1].split(',');
        if (typeof tr[0] != 'undefined' && typeof tr[1] != 'undefined') {
            info.rad = Math.atan2(tr[1], tr[0]);
            info.deg = parseFloat((info.rad * 180 / Math.PI).toFixed(1));
        }
    }
    return info;
};