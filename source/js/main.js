var app = angular.module('SvgApp',[]);
app.controller('SvgController', function () {

    var self = this;

    var svgWidth = 514;
    var svgHeight = 514;
    var svgId = 'svgBox';
    var BGId = 'BGPolygon';

    var centerX = svgWidth / 2;
    var centerY = svgHeight / 2;
    var targetCircles, targetRects, targetStars, targetTexts, setTexts, setStar;
    var resultCode;

    var JSTarget = {
        svgBox : document.getElementById('svgBox'),
        svgContainer : document.getElementById('svgContainer'),
        resultSpace : document.getElementById('resultArea'),
        body : document.getElementById('circleStyle'),
        saveBtn : document.getElementById('download'),
        canvas : document.getElementById("canvas"),
        element : null
    };

    var preferenceP = function () {
        this.BC = '#ffffff';
        this.polygonOpacity = 1;
    };

    JSTarget.canvas.setAttribute('width', svgWidth);
    JSTarget.canvas.setAttribute('height', svgHeight);

    var ctx = JSTarget.canvas.getContext("2d");

    var svgBox = Snap('#' + svgId).attr({
        xmlns: 'http://www.w3.org/2000/svg',
        width: svgWidth,
        height: svgHeight,
        viewBox: '0,0,' + svgWidth + ',' + svgHeight
    });


    var svgData = localStorage.getItem('source');
    var preferencePJson = localStorage.getItem('preference');
    var circleListJson = localStorage.getItem('circleList');
    var rectListJson = localStorage.getItem('rectList');
    var markListJson = localStorage.getItem('markList');
    var textListJson = localStorage.getItem('textList');



    /* localStorageを参照 */
    if ( svgData ) {
        JSTarget.svgBox.innerHTML = svgData;
    }
    if ( preferencePJson ) {
        self.preferenceP = JSON.parse(preferencePJson);
    } else {
        self.preferenceP = new preferenceP();
    }
    if ( circleListJson ) {
        self.circleList = JSON.parse(circleListJson);
    } else {
        self.circleList = [];
    }
    if ( rectListJson ) {
        self.rectList = JSON.parse(rectListJson);
    } else {
        self.rectList = [];
    }
    if ( markListJson ) {
        self.markList = JSON.parse(markListJson);
    } else {
        self.markList = [];
    }
    if ( textListJson ) {
        self.textList = JSON.parse(textListJson);
    } else {
        self.textList = [];
    }

    /* -------------- localStorage参照ここまで --------- */



    /* ------------ 設定 ---------------- */



    if ( svgBox.selectAll('polygon').length <= 0 ) {

        var polygonTag = svgBox.polygon('0,0 ' + svgWidth +',0 ' + svgWidth + ',' + svgHeight + ' 0,' + svgHeight);

        polygonTag.attr({
            fill : self.preferenceP.BC,
            opacity: self.preferenceP.polygonOpacity,
            id : BGId
        });

        svgBox.append(polygonTag);

    }


    self.preferenceReplace = function () {

        Snap('#' + BGId).attr({
            fill : self.preferenceP.BC,
            opacity: self.preferenceP.polygonOpacity
        });
        Snap('#previewPreference').attr({
            fill : self.preferenceP.BC,
            opacity: self.preferenceP.polygonOpacity
        });


    };

    self.preferenceReplace(); //ロード時の初期化


    /* ---------------- 設定ここまで --------------- */

    /* --------- 丸ここから ------------- */


    var circleProperty = function () {

        this.circleR = 20;
        this.circleCx = centerX;
        this.circleCy = centerY;
        this.circleBC =  "#000000";
        this.circleBW = 4;
        this.circleFill = "#000000";
        this.circleOpacity = 1;

    };


    self.createCircle = function () {

        var circleP = new circleProperty();

        self.circleList.push(circleP);

        self.circles = svgBox.circle()
            .attr({
                r: circleP.circleR,
                cx: circleP.circleCx,
                cy: circleP.circleCy,
                fill: circleP.circleFill,
                stroke: circleP.circleBC,
                strokeWidth: circleP.circleBW,
                opacity: circleP.circleOpacity,
                class: 'circleSvg',
                id: "circle" + (self.circleList.length - 1)
            });

    };


    self.circleAttrReplace = function (num) {

        targetCircles = svgBox.selectAll('.circleSvg');
        targetCircles[num].attr({
            r: self.circleList[num].circleR,
            fill: self.circleList[num].circleFill,
            stroke: self.circleList[num].circleBC,
            strokeWidth: self.circleList[num].circleBW,
            opacity: self.circleList[num].circleOpacity
        });

    };

    self.circleDelete = function (num) {
        self.circleList.splice(num, 1);
        targetCircles = svgBox.selectAll('.circleSvg');
        targetCircles[num].remove();
    };


    /* --------- 丸ここまで ------------- */



    /* --------- 四角ここから ------------- */




    var rectProperty = function () {

        this.rectW = 40;
        this.rectH = 40;
        this.rectX = centerX;
        this.rectY = centerY;
        this.rectFill = "#000000";
        this.rectBW = 4;
        this.rectBC = "#000000";
        this.rectOpacity = 1;

    };

    self.createRect = function () {

        var rectP = new rectProperty();

        self.rectList.push(rectP);

        self.rects = svgBox.rect()
            .attr({
                width: rectP.rectW,
                height: rectP.rectH,
                x: rectP.rectX,
                y: rectP.rectY,
                fill: rectP.rectFill,
                stroke: rectP.rectBC,
                strokeWidth: rectP.rectBW,
                opacity: rectP.rectOpacity,
                class: 'rectSvg',
                id: "rect" + (self.rectList.length - 1)
            });


    };

    self.rectAttrReplace = function (num) {

        targetRects = svgBox.selectAll('.rectSvg');

        targetRects[num].attr({

            width: self.rectList[num].rectW,
            height: self.rectList[num].rectH,
            fill: self.rectList[num].rectFill,
            stroke: self.rectList[num].rectBC,
            strokeWidth: self.rectList[num].rectBW,
            opacity: self.rectList[num].rectOpacity
        });

    };

    self.rectDelete = function (num) {

        self.rectList.splice(num, 1);
        targetRects = svgBox.selectAll('.rectSvg');
        targetRects[num].remove();

    };

    /* --------- 四角ここまで ------------- */


    /* --------- 星ここから ------------- */


    var markProperty = function () {

        this.mark = '★';
        this.fontSize = 60;
        this.markC= '#000000';
        this.markOpacity = 1;
        this.markText = '★';
        this.textAnchor = 'middle';

    };

    self.createStar = function () {

        var markP = new markProperty();

        self.markList.push(markP);

        self.marks = svgBox.text(centerX, centerY, markP.markText)
            .attr({
                fontSize: markP.fontSize + 'px',
                fill: markP.markC,
                opacity: markP.markOpacity,
                textAnchor: markP.textAnchor,
                class: 'markSvg',
                id: 'mark' + (self.markList.length - 1)
            });
    };

    /* エスケープ処理 */

    function escapeHtml(str) {

        str = str.replace(/&/g, '&amp;');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/>/g, '&gt;');
        str = str.replace(/"/g, '&quot;');
        str = str.replace(/'/g, '&#39;');
        return str;

    }

    self.markAttrReplace = function (num) {

        setStar = document.getElementsByClassName('markSvg');
        setStar[num].innerHTML = escapeHtml(self.markList[num].markText);


        targetStars = svgBox.selectAll('.markSvg');

        targetStars[num].attr({
            fontSize: self.markList[num].fontSize + 'px',
            fill: self.markList[num].markC,
            opacity: self.markList[num].markOpacity
        });

    };

    self.markDelete = function (num) {
        self.markList.splice(num, 1);
        targetStars = svgBox.selectAll('.markSvg');
        targetStars[num].remove();
    };


    /* --------- 星ここまで ------------- */

    /* --------- テキストここから ------------- */


    var textProperty = function () {
        this.valText = 'テキスト';
        this.fontC = '#000000';
        this.fontSize = 30;
        this.textOpacity = 1;
        this.textAnchor = 'middle';
        this.class = 'plainText';
    };

    self.insertText = function () {

        var textP = new textProperty();

        self.textList.push(textP);

        self.texts = svgBox.text(centerX, centerY, textP.valText)
            .attr({
                fill: textP.fontC,
                fontSize: textP.fontSize,
                opacity: textP.textOpacity,
                textAnchor: textP.textAnchor,
                class: textP.class,
                id: 'text' + (self.textList.length - 1)
            });

    };


    self.textAttrReplace = function (num) {

        setTexts = document.getElementsByClassName('plainText');
        setTexts[num].innerHTML = escapeHtml(self.textList[num].valText);

        targetTexts = svgBox.selectAll('.plainText');

        targetTexts[num].attr({
            fontSize: self.textList[num].fontSize + 'px',
            fill: self.textList[num].fontC,
            opacity: self.textList[num].textOpacity
        });

    };

    self.textDelete = function (num) {

        self.textList.splice(num, 1);
        targetTexts = svgBox.selectAll('.plainText');
        targetTexts[num].remove();

    };


    /* --------- テキストここまで ------------- */

    /* --------- コードタブでsvgコードを表示 ------------- */

    self.distResult = function () {

        resultCode = JSTarget.svgContainer.innerHTML;
        JSTarget.resultSpace.innerText = resultCode;

    };



    /* ------------ タブクリックでスタイル変更 -------------------- */

    self.changeStyle = function (idName) {

        JSTarget.body.id = idName;

    };

    /* ------------------- スタイル変更ここまで ------------------------ */

    /* ------------------- 要素をドラッグで移動 ------------------ */

    // ドラッグ判定用
    var run = false;

    var mouse = function () {
        this.x = 0;
        this.y = 0;
    };

    JSTarget.svgBox.addEventListener( 'mousedown', function (element) {

        JSTarget.element = element;

        run = true;


    });

    JSTarget.svgBox.addEventListener('mousemove', function (){

        if( run ){

            mouse.x = event.pageX - JSTarget.svgBox.offsetLeft; //ブラウザの原点からの距離からscreenCanvasの左のズレをマイナスする
            mouse.y = event.pageY - JSTarget.svgBox.offsetTop;

            // 丸を対象にする
            if( JSTarget.element.target.getAttribute('cx') ){
                JSTarget.element.target.setAttribute('cx', mouse.x);
                JSTarget.element.target.setAttribute('cy', mouse.y);
                return;
            }

            // 丸以外
            if( JSTarget.element.target.getAttribute( 'x' ) ){

                // 四角形の真ん中を掴めるように
                if( JSTarget.element.target.getAttribute( 'width' ) ){

                    JSTarget.element.target.setAttribute( 'x', mouse.x - (JSTarget.element.target.getAttribute('width') / 2) );
                    JSTarget.element.target.setAttribute( 'y', mouse.y - (JSTarget.element.target.getAttribute('height') / 2) );
                    return;

                }

                //テキストなど
                JSTarget.element.target.setAttribute('x', mouse.x);
                JSTarget.element.target.setAttribute('y', mouse.y);

            }

        }

    });

    // ドラッグ終了判定
    document.addEventListener( 'mouseup', function () {

        run = false;
        self.saveLocal();
        self.distResult();

    });

    /* ---------------- ドラッグここまで ------------------ */

    /* ---------- リセットボタン ----------- */

    self.deleteAll = function () {

        var confirmAnswer = confirm('編集内容をリセットします。\nよろしいですか？');

        if ( confirmAnswer ) {

            self.circleList = [];
            self.rectList = [];
            self.markList = [];
            self.textList = [];


            self.preferenceP = new preferenceP();

            Snap('#' + BGId).attr({
                fill : self.preferenceP.BC,
                opacity: self.preferenceP.polygonOpacity
            });

            self.preferenceReplace();

            svgBox.selectAll('circle').remove();
            svgBox.selectAll('rect').remove();
            svgBox.selectAll('text').remove();

            localStorage.clear();

            self.distResult();

        }

    };

    /* ------------- リセットボタンここまで --------------- */

    /* ------------- リロードしてもデータを維持出来るようにする --------------- */

    self.saveLocal = function () {

        localStorage.setItem('source', JSTarget.svgBox.innerHTML);
        localStorage.setItem('preference', JSON.stringify(self.preferenceP));
        localStorage.setItem('circleList', JSON.stringify(self.circleList));
        localStorage.setItem('rectList', JSON.stringify(self.rectList));
        localStorage.setItem('markList', JSON.stringify(self.markList));
        localStorage.setItem('textList', JSON.stringify(self.textList));

        self.imageText = JSTarget.svgContainer.innerHTML;

    };

    /* ----------------- リロード対応ここまで -------------------- */


    /* -------------------- ファイルを保存 ---------------------- */

    self.saveImage = function(fileType, fileName, content) {



        if ( typeof Blob == "undefined" ) {
            alert('このブラウザではダウンロード機能が利用出来ません,\nご了承下さい。');
            return;
        }

        if( fileType == 'svg' ){

            var blob = new Blob([content]);
            var url = window.URL || window.webkitURL;
            var blobURL = url.createObjectURL(blob);

            var a = document.createElement('a');
            a.download = fileName;
            a.href = blobURL;
            a.click();

        } else if ( fileType == 'png' ) {

            var DOMURL = window.URL || window.webkitURL || window;
            var img = new Image();
            var svg = new Blob([content], {type: "image/svg+xml;charset=utf-8"});
            var url = DOMURL.createObjectURL(svg);

            img.onload = function() {

                ctx.drawImage(img, 0, 0);
                DOMURL.revokeObjectURL(url);
                url = JSTarget.canvas.toDataURL( [ 'image/png']);
                console.log(url);
                var a = document.createElement('a');
                a.download = fileName;
                a.href = url;
                a.click();

            };

            img.src = url;
        }

    };

    /* ------------------- ファイル保存ここまで -------------------- */



});