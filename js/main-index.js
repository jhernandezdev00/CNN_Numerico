var modelo = null;
var botonPredecir = document.getElementById("predecir");

//Tomar y configurar el canvas
var g_canvas  = document.getElementById("bigcanvas");
var g1_canvas = g_canvas.getContext("2d");
var p_canvas  = document.getElementById("smallcanvas");
var p1_canvas = p_canvas.getContext("2d");

var canvasEle = document.getElementById("canvas_data");
var ctx = canvasEle.getContext("2d");

function limpiar(){
    g1_canvas.clearRect(0,0,g_canvas.clientWidth,g_canvas.clientHeight);
    drawingcanvas.clear()
    document.getElementById("resultado").innerHTML = "---";
    document.getElementById("promedio").innerHTML = "--- %";
    ctx.clearRect(0,0,canvasEle.clientWidth,canvasEle.clientHeight);
    drawingcanvas.clear()
}

function predecir(){
    resample_single(g_canvas,28,28,p_canvas);

    var imgDATA = p1_canvas.getImageData(0,0,28,28);
    var arr = []
    var arr28 = []

    ctx.putImageData(imgDATA,0,0)

    for(var p=0, i=0; p<imgDATA.data.length; p+=4){
        var value = imgDATA.data[p+3]/255
        arr28.push([value])
        if(arr28.length==28){
            arr.push(arr28);
            arr28 = []
        }
    }

    arr = [arr];
    var tensor = tf.tensor4d(arr);
    var resultados = modelo.predict(tensor).dataSync();
    var indice = resultados.indexOf(Math.max.apply(null,resultados));
    var probabilidad = resultados[indice];

    console.log("La Prediccion es: ", indice);
    console.log("La Prediccion es: ", probabilidad);
    document.getElementById("resultado").innerHTML = indice;
    document.getElementById("promedio").innerHTML = (probabilidad*100).toFixed(3)+" %";
}

//dispx
/**
     * Hermite resize - fast image resize/resample using Hermite filter. 1 cpu version!
     * 
     * @param {HtmlElement} g_canvas
     * @param {int} width
     * @param {int} height
     * @param {boolean} resize_canvas if true, g_canvas will be resized. Optional.
     * Cambiado por RT, resize g_canvas ahora es donde se pone el chiqitillllllo
     */

function resample_single(g_canvas, width, height, resize_canvas) {
    var width_source = g_canvas.width;
    var height_source = g_canvas.height;
    width = Math.round(width);
    height = Math.round(height);

    var ratio_w = width_source / width;
    var ratio_h = height_source / height;
    var ratio_w_half = Math.ceil(ratio_w / 2);
    var ratio_h_half = Math.ceil(ratio_h / 2);

    var ctx = g_canvas.getContext("2d");
    var p1_canvas = resize_canvas.getContext("2d");
    var img = ctx.getImageData(0, 0, width_source, height_source);
    var img2 = p1_canvas.createImageData(width, height);
    var data = img.data;
    var data2 = img2.data;

    for (var j = 0; j < height; j++) {
        for (var i = 0; i < width; i++) {
            var x2 = (i + j * width) * 4;
            var weight = 0;
            var weights = 0;
            var weights_alpha = 0;
            var gx_r = 0;
            var gx_g = 0;
            var gx_b = 0;
            var gx_a = 0;
            var center_y = (j + 0.5) * ratio_h;
            var yy_start = Math.floor(j * ratio_h);
            var yy_stop = Math.ceil((j + 1) * ratio_h);
            for (var yy = yy_start; yy < yy_stop; yy++) {
                var dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
                var center_x = (i + 0.5) * ratio_w;
                var w0 = dy * dy; //pre-calc part of w
                var xx_start = Math.floor(i * ratio_w);
                var xx_stop = Math.ceil((i + 1) * ratio_w);
                for (var xx = xx_start; xx < xx_stop; xx++) {
                    var dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
                    var w = Math.sqrt(w0 + dx * dx);
                    if (w >= 1) {
                        //pixel too far
                        continue;
                    }
                    //hermite filter
                    weight = 2 * w * w * w - 3 * w * w + 1;
                    var pos_x = 4 * (xx + yy * width_source);
                    //alpha
                    gx_a += weight * data[pos_x + 3];
                    weights_alpha += weight;
                    //colors
                    if (data[pos_x + 3] < 255)
                        weight = weight * data[pos_x + 3] / 250;
                    gx_r += weight * data[pos_x];
                    gx_g += weight * data[pos_x + 1];
                    gx_b += weight * data[pos_x + 2];
                    weights += weight;
                }
            }
            data2[x2] = gx_r / weights;
            data2[x2 + 1] = gx_g / weights;
            data2[x2 + 2] = gx_b / weights;
            data2[x2 + 3] = gx_a / weights_alpha;
        }
    }

    for (var p=0; p < data2.length; p += 4) {
        var gris = data2[p]; //Esta en blanco y negro

        if (gris < 100) {
            gris = 0; 
        } else {
            gris = 255; 
        }

        data2[p] = gris;
        data2[p+1] = gris;
        data2[p+2] = gris;
    }

    p1_canvas.putImageData(img2, 0, 0);   
}

tf.loadLayersModel('model/model.json').then(function(model) {
    modelo = model;
  });