# Algoritmo Red Neuronal Convolucional para Deteccion de Numeros

<a href="https://georgedx2.github.io/CNN_Numerico/"><button style="background-color: #1BB4AD; border: 1px; cursor:pointer; padding: 5px 20px; color: white; display:inline-block; text-align: center;"><img src="source\cerebro.png" style="vertical-align:middle"> ACCEDE A LA RED NEURONAL</button></a>

<hr>
<p>Las redes neuronales convolucionales son un tipo de red neuronal muy utilizada para la visión por ordenador y son utilizadas para trabajar con imágenes, vídeo y audio.

Las redes neuronales convolucionales están basadas en la biología de la corteza visual. Intentan imitar cómo tu cerebro procesa las imágenes que vienen de tu retina. [1]

<h1>Creacion del Modelo</h1>
En esta parte se debe de agregar las capas necesarias, hasta lograr los resultados que deseamos, para ello es importante recordar que dependiendo de las imagenes a analizar y el objetivo de las mismas depende la configuracion de nuestra red en nuestro casos, solo necesitaremos utilizar capas de Convolucion, Max-Pooling y una capa final de conectada totalmente con el momelo que nos arroje el resultado de la clasificion, tal y como se ve en la siguiente imagen.
<img src="source\model.png"></p>

Balaji S. (2020). Binary Image classifier CNN using TensorFlow [FIGURA]. Recuperado de: https://medium.com/techiepedia/binary-image-classifier-cnn-using-tensorflow-a3f5d6746697

<p>
Ademas de esto usaremos una tecnica que lleva por nombre Dropout, la capa Dropout es una capa regularizadora comúnmente utilizada en las redes neuronales. Ayuda a evitar el sobreajuste al desactivar aleatoriamente un porcentaje de las unidades de salida de una capa durante el entrenamiento. Esto ayuda a reducir la interdependencia entre las unidades y mejora la generalización del modelo.

<img src="source\droping.png">Srivastava, Nitish, et al. Dropout: una forma sencilla de evitar que las redes neuronales sobreajuste”, JMLR 2014</p>

<p>Si desea visualizar mayor información acerca del modelo <a href="https://github.com/GeorgeDX2/CNN_Numerico/blob/main/Codigo_RedNeuronal/Red_Neuronal_Convolucional_Sencilla_para_detectar_numeros.ipynb">PRESIONE AQUI</a></p>

<hr>
<h1> Referencias </h1>

<ol>
    <li>Datademia. (2022). ¿Qué es deep learning y qué es una red neuronal? Datademia. https://datademia.es/blog/que-es-deep-learning-y-que-es-una-red-neuronal</li>
    <li>Balaji, S. (2023, 26 agosto). Binary Image Classifier CNN using TensorFlow - Techiepedia - Medium. Medium. https://medium.com/techiepedia/binary-image-classifier-cnn-using-tensorflow-a3f5d6746697</li>
</ol>