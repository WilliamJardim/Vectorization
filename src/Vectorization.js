/*
 * File Name: Vectorization.js
 * Author Name: William Alves Jardim
 * Author Email: williamalvesjardim@gmail.com
 * 
 * LICENSE: MIT
*/

var Vectorization_4Node = class{
    constructor(){
        if( typeof window !== 'undefined' && window.isbrowser == true ){
            throw 'This class only works in Node';
        }

        //Se for node
        if( window.isbrowser == false && window.iscompilation == false )
        {
            //Importando classe raiz
            this.Root = require('./Root');

            this.Utilidades = require('./Utilidades');

            //Importando numeros escalares
            this.Scalar = require('./Scalar');
            this.Scalar_translation = require('./Scalar-translation');

            //Importando Text
            this.Scalar = require('./Text');
            this.Scalar_translation = require('./Text-translation');

            //Importando Vetores
            this.Vector = require('./Vector');
            this.Vector_translation = require('./Vector-translation');

            //Importando Vetores de String
            this.StringVector = require('./StringVector');
            this.StringVector_translation = require('./StringVector-translation');

            this.Random = require('./Random');
            this.Random_translation = require('./Random-translation');

            //Importando Matrizes
            this.Matrix = require('./Matrix');
            this.Matrix_translation = require('./Matrix-translation');
            
            this.StringMatrix = require('./StringMatrix');
            this.StringMatrix_translation = require('./StringMatrix-translation');
        }

        return window.Vectorization;
    }
}; 

module.exports = new Vectorization_4Node();