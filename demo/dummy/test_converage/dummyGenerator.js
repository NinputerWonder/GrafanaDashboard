(function() {
    function formatDate(date) {
        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " "
            + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    var today = new Date();
    var id = 0;
    var csvLines = ["id,date,coverage"];
    for(var days = 60; days >= 0; days -- ) {
        var id = 60-days+1;
        var date = new Date(today.getTime());
        date.setDate(today.getDate() - days);
       
        var converage = (2 + Math.ceil(Math.random() * 10))/100.0;
        csvLines.push([id, formatDate(date), converage].join(','));   
    }

    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csvLines.join('\n')));
    pom.setAttribute('download', 'dummy.csv');
    pom.click();
})();
