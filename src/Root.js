/*
 * File Name: Root.js
 * Author Name: William Alves Jardim
 * Author Email: williamalvesjardim@gmail.com
 * 
 * LICENSE: WilliamJardim/Vectorization © 2024 by William Alves Jardim is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International. To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-sa/4.0/**
*/

//Compatibilidade com NodeJS
if( typeof window === 'undefined' ){
    global.window = global; 
    
//Se for navegador
}else{
    if (typeof module === 'undefined') {
        globalThis.module = {};
    }
}

if(!window.Vectorization){ window.Vectorization = {} };

/**
 * Base class for all other components.
 * @param {Object} config;
 * @returns {Vectorization.Base}
 */
window.Vectorization.Base = function(config){
    const context = {};
    context._config = config;
    context.objectName = 'Base';
    context.extendedFrom = 'Base';
    context.namespace = 'window.Vectorization';
    context.path = 'Vectorization.Base';
    context.autoGeneratedGetters = [];
    context.autoGeneratedSetters = [];
    context._translations = config.translations;

    context.copyArgs = function(config){
        //Copia os argumentos
        let configKeys = Object.keys(config);
        for( let i = 0 ; i < configKeys.length ; i++){
            context[ configKeys[i] ] = config[ configKeys[i] ];
        }
    }

    context._doDefaultBaseAfterCreate = function(){
        context.createGettersFromOriginalProperties();
        context.createSettersFromOriginalProperties();
    }

    context.createGettersFromOriginalProperties = function(){
        //Getters
        Object.keys( context ).forEach( function(attrib){
            const nameOfGetter = `get${String( String(attrib[0]).replace('_','').toUpperCase() + String(attrib.slice(1, attrib.length) )).replace('_','').replace('get', '').replace('getGet', '').replace('Get', '') }`;
            
            if( typeof context[attrib] != 'function' && !context[nameOfGetter] ){
                context[nameOfGetter] = function(){
                    return context[attrib];
                }
                context.autoGeneratedGetters.push(nameOfGetter);
            }
        });
    }

    context.createSettersFromOriginalProperties = function(){
        //Setters
        Object.keys( context ).forEach( function(attrib){
            const nameOfSetter = `set${String( String(attrib[0]).replace('_','').toUpperCase() + String(attrib.slice(1, attrib.length) )).replace('_','').replace('get', '').replace('getGet', '').replace('Get', '') }`;
            
            if( typeof context[attrib] != 'function' && !context[nameOfSetter] ){
                context[nameOfSetter] = function(valueToDefine){
                    context[attrib] = valueToDefine; 
                }
                context.autoGeneratedSetters.push(nameOfSetter);
            }
        });
    }

    //Métodos responsavel por fazer as traduções dos métodos
    context.translateMethods = function(translations) {
        let translationsKeys;

        //Traduz os métodos
        translationsKeys = Object.keys(translations.translatedMethods);

        //Percorre cada nome a ser traduzido
        for(let i = 0 ; i < translationsKeys.length ; i++)
        {
           const nomeMetodoTraduzido = translationsKeys[i];
           const nomeOriginal = translations.translatedMethods[nomeMetodoTraduzido];

           //Aplica a tradução
           if(typeof context[nomeOriginal] === 'function'){
               context[nomeMetodoTraduzido] = context[nomeOriginal].bind(context);
           }
        }
    }

    //Métodos responsavel por fazer as traduções dos atributos
    context.translateAttributes = function(translations) {
        let translationsKeys;

        //Traduz os atributos
        translationsKeys = Object.keys(translations.translatedAttributes);

        //Percorre cada nome a ser traduzido
        for(let i = 0 ; i < translationsKeys.length ; i++)
        {
           const nomeMetodoTraduzido = translationsKeys[i];
           const nomeOriginal = translations.translatedAttributes[nomeMetodoTraduzido];

           //Aplica a tradução no atributo
           if(context[nomeOriginal] != undefined && typeof context[nomeOriginal] != 'function' && !context[nomeMetodoTraduzido] ){
              context[nomeMetodoTraduzido] = context[nomeOriginal];
           }
        }
    }

    //Parecido com a função translateAttributes, porém ele faz essa tradução e retorna um objeto com as traduções aplicadas
    //No caso o translationsDicionario pode ser um objeto ja pronto que só precisa ser traduzido
    //Isso vai ser usado na inicialização de algumas classes como Vectorization.Matrix e Vectorization.Vector
    context.translateAttributes_andReturn = function(propioDicionario, translations){
        let translationsKeys;
        let novoObjeto = {... propioDicionario};

        //Traduz os atributos
        translationsKeys = Object.keys(propioDicionario);

        //Percorre cada nome a ser traduzido
        for(let i = 0 ; i < translationsKeys.length ; i++)
        {
           const nomeMetodoTraduzido = translationsKeys[i];
           const nomeOriginal = translations.translatedAttributes[nomeMetodoTraduzido];

           if( nomeOriginal != undefined && !propioDicionario[nomeOriginal] ){
               novoObjeto[nomeOriginal] = propioDicionario[nomeMetodoTraduzido];
           }
        }

        return novoObjeto;
    }

    //Para não ter problemas com atributos desatualizados
    context.atualizarAtributosTraduzidos = function(translations=context._internal_translations){
        let translationsKeys;

        //Pegar os atributos traduzidos
        translationsKeys = Object.keys(translations.translatedAttributes);

        //Percorre cada nome a ser traduzido
        for(let i = 0 ; i < translationsKeys.length ; i++)
        {
            const nomeMetodoTraduzido = translationsKeys[i];
            const nomeOriginal = translations.translatedAttributes[nomeMetodoTraduzido];

            if( nomeOriginal != undefined && 
                typeof context[nomeMetodoTraduzido] != 'function' && 
                typeof context[nomeOriginal] != 'function' &&
                context[nomeOriginal] != undefined &&
                context[nomeMetodoTraduzido] != undefined
            ){
                context[nomeMetodoTraduzido] = context[nomeOriginal];
            }
        }
    }

    //Start class
    context.copyArgs(config);
    context._doDefaultBaseAfterCreate();

    context.applyTranslations = function(translationFunction=null){
        //Se existir uma tradução para a classe
        if(context._translations && typeof context._translations === 'function'){
            context._internal_translations = translationFunction || context._translations();
            context.translateMethods( context._internal_translations );
            context.translateAttributes( context._internal_translations );
        }
    }

    context.applyTranslations(null);

    return context;
}

//Funções a nivel principal

/**
 * Gera uma matrix de identidade
 * @param {Number} ordem 
 * @returns {Vectorization.Matrix}
*/
window.Vectorization.matrixIdentidade = function(ordem){
    const NON_DIAGONAL_VALUE = 0;
    const DIAGONAL_VALUE = 1;
    let matrix = [];

    for( let i = 0 ; i < ordem ; i++ )
    {
        matrix[i] = [];
        for( let j = 0 ; j < ordem ; j++ )
        {
            //NA LINHA ATUAL, Toda vez que o indice do número for igual ao indice da linha, ele faz parte da diagonal principal
            if( j == i ){
                matrix[i][j] = DIAGONAL_VALUE;

            }else{
                matrix[i][j] = NON_DIAGONAL_VALUE;
            }
        }
    }

    const extraProps = {
        isIdentidade: true
    }

    return Vectorization.Matrix(matrix, extraProps);
}

module.exports = window.Vectorization.Root;