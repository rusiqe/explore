var templates = {
    structure:"views/structure.html",
    home:"views/home.html",
    form:"views/formView.html",
    list:"views/dataView.html",
    listItem:"views/listItem.html",
    loaded: 0,
    requested: 0,
};
 
function onDeviceReady( event ) {
    console.log("deviceready");
     
    //initialize salesforce wrapper
    sfw = new SalesforceWrapper();
     
    //load Mousetache HTML templates
    for (var key in templates) {
        (function() {
            var _key = key.toString();
            if ( _key != "loaded" && _key != "requested" ){
                templates.requested ++;
          
                 var templateLoaded = function( template ){
                    onTemplateLoaded( template, _key );
                 }
                 
                $.get( templates[ _key ], templateLoaded );
             }
         })();
    }
}
 
function onTemplateLoaded(template, key) {
     
    console.log( key + ": " + template);
    templates[ key ] = template;
    templates.loaded ++;
     
    if ( templates.loaded == templates.requested ) {
        setupDefaultView();
    }
}
