(function(window, undefined) {
  var dictionary = {
    "712849d0-8fa7-4851-8162-bc208ff835df": "Formulario_AltaClient",
    "651befb9-ae58-4c50-a1d3-47c15a14783b": "Ajuda",
    "e8a3de70-de5a-4d79-b66d-b90309a59ebd": "Pagar",
    "d12245cc-1680-458d-89dd-4f0d7fb22724": "Pagina Principal",
    "d3dbb0fb-af7b-4c32-898d-9f09b2673f32": "Reserva_Preu",
    "61d79b8a-14b9-4ea9-afea-866b7aa8313e": "RegistradoOK",
    "368075a4-bfad-46c2-b821-38bba095edc1": "PagoOK",
    "31198b87-6e12-4348-a93f-458210fc5890": "Formulario_AltaLimpiador",
    "5fd9657e-e1f9-4d88-8600-2952474a7b39": "Reserva",
    "f39803f7-df02-4169-93eb-7547fb8c961a": "Template 1",
    "bb8abf58-f55e-472d-af05-a7d1bb0cc014": "default"
  };

  var uriRE = /^(\/#)?(screens|templates|masters|scenarios)\/(.*)(\.html)?/;
  window.lookUpURL = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, url;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      url = folder + "/" + canvas;
    }
    return url;
  };

  window.lookUpName = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, canvasName;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      canvasName = dictionary[canvas];
    }
    return canvasName;
  };
})(window);