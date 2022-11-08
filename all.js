
// 目前計算bmi正確
// loclStorage有存到

// 顯示結果（bmidata) css無法呈現



var calculate = document.querySelector('.result');
// 按下查看結果
var record = document.querySelector('.BMIrecord');
// bmi的歷史紀錄
var resultIcon = document.querySelector('.resultIcon');
var data = JSON.parse(localStorage.getItem('BmIdata')) || [];





calculate.addEventListener('click', calBMI, false);
// 查看結果的監聽事件

function calBMI(e) {
    e.preventDefault();

    var h = document.querySelector('.hight').value;
    var w = document.querySelector('.weight').value;
      
    if (h === '' || w === '') { return }
    var BMI = w / ((h / 100) * (h / 100));
    BMI = BMI.toFixed(2);
    var level;
    if (BMI < 18.5) level = '過輕';
    else if (BMI >= 18.5 && BMI < 25) level = '正常';
    else if (BMI >= 25 && BMI < 30) level = '過重';
    else if (BMI >= 30 && BMI < 35) level = '輕度肥胖';
    else if (BMI >= 35 && BMI < 40) level = '中度肥胖';
    else level = '重度肥胖';


    var BMIlist = {
        BMI: BMI,
        level: level,
        w: w,
        h: h,
    };
    // 原本加引號就顯示不出數值，順序要在BMI,level下面，不然值會是undefined

    
    data.push(BMIlist);
    localStorage.setItem('BmIdata', JSON.stringify(data));
    updateList(data);

    var bmidata = document.querySelector('.bmidata');
    bmidata.innerHTML =  '<div class="'+BMIlist.level+'resultIcon resultIcon">'+BMIlist.BMI+'<br><span class="resultBMI">BMI</span><img src="img/icons_loop.png" class="loopImg"></div><div class="'+BMIlist.level+'level">'+BMIlist.level+'</div>'

    calculate.style.opacity='0';
    
};

function updateList() {
    var str = '';
    for(var i = 0 ; i<data.length; i++){
        str += '<tr class="' + data[i].level + 'list"><td class="' + data[i].level + 'Color"><span>' + data[i].level + '</span></td><td><span style="font-size:14px;margin-right:5px;">BMI</span>' + data[i].BMI + '</td><td><span style="font-size:14px;margin-right:5px;">weight</span>' + data[i].w + '</td><td><span style="font-size:14px;margin-right:5px;">height</span>' + data[i].h + '</td><td></td></tr>'
    }
    record.innerHTML = str;
}