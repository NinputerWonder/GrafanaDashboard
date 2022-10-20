(function () {
    function getStartDate(today, days) {
        var startDate = new Date(today.getTime());
        startDate.setDate(today.getDate() - days);
        return startDate;
    }

    function getEndDate(startDate) {
        var endDate = new Date(startDate.getTime())
        endDate.setDate(startDate.getDate() + 1);
        return endDate;
    }

    function getBugUrl(id) {
        return "http://picc.jira/bug/" + id;
    }

    function formatDate(date) {
        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " "
            + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    var today = new Date();
    var id = 0;
    var csvLines = ["id,url,strat_time,end_time,reason_id,level_id"];
    for(var days = 60; days >= 0; days -- ) {
        var startDate = getStartDate(today, days);
        var endDate = getEndDate(startDate);
        var bugCountPerDay = Math.ceil(Math.random() * 10);
        for(var count = 0; count < bugCountPerDay; count ++) {
            var reason = Math.ceil(Math.random() * 6);
            var level = Math.ceil(Math.random() * 4);
            id ++;
            csvLines.push([id, getBugUrl(id), formatDate(startDate), formatDate(endDate), reason, level].join(','));
        }       
    }

    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csvLines.join('\n')));
    pom.setAttribute('download', 'dummy.csv');
    pom.click();
})();