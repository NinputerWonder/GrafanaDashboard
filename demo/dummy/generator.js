(function() {
    function createBugLevelDummy() {
        var insertSql = "INSERT INTO bug_level (id, description) VALUES";
        
        var lines = [[1, '致命'], [2, '严重'], [3, '一般'], [4, '次要']]
            .map(level => `(${level[0]}, \'${level[1]}\')`);
        
        return `${insertSql}\n${lines.join(',\n')};\n`;
    }

    function createBugReasonDummy() {
        var insertSql = "INSERT INTO bug_reason (id, description) VALUES";
        var lines = [[1, '待补充'], 
        [2, '修改代码影响其他功能'], 
        [3, '第三方系统协议变化'],
         [4, '没有处理边界值'],
         [5, '自测数据没有清理'],
         [6, '需求理解错误']]
            .map(reason => `(${reason[0]}, \'${reason[1]}\')`);
        
        return `${insertSql}\n${lines.join(',\n')};\n`;
    }

    function formatDate(date) {
        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " "
            + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    function createBugInfoDummy() {
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
    
       
        var insertSql = "INSERT INTO bug_info (id,url,start_time,end_time,reason_id,level_id) VALUES";
    
        var today = new Date();
        var id = 0;
        var lines = [];
        for(var days = 60; days >= 0; days -- ) {
            var startDate = getStartDate(today, days);
            var endDate = getEndDate(startDate);
            var bugCountPerDay = Math.ceil(Math.random() * 10);
            for(var count = 0; count < bugCountPerDay; count ++) {
                var reason = Math.ceil(Math.random() * 6);
                var level = Math.ceil(Math.random() * 4);
                id ++;
                lines.push(`(${id}, \'${getBugUrl(id)}\', \'${formatDate(startDate)}\', \'${formatDate(endDate)}\', ${reason}, ${level})`);
            }       
        }

        return `${insertSql}\n${lines.join(',\n')};\n`;
    }

    function createRiskDummy() {
        var today = new Date();
        var lines = [];
        var insertSql = "INSERT INTO risk (id,date,count) VALUES";
        for(var days = 60; days >= 0; days -- ) {
            var id = 60-days+1;
            var date = new Date(today.getTime());
            date.setDate(today.getDate() - days);
        
            var count = 300 + Math.ceil(Math.random() * 50);
            lines.push(`(${id}, \'${formatDate(date)}\', ${count})`);
        }

        return `${insertSql}\n${lines.join(',\n')};\n`;
    }

    function createTestCoverageDummy() {
        var today = new Date();
        var lines = [];
        var insertSql = "INSERT INTO test_coverage (id,date,coverage) VALUES";
        for(var days = 60; days >= 0; days -- ) {
            var id = 60-days+1;
            var date = new Date(today.getTime());
            date.setDate(today.getDate() - days);
        
            var converage = (2 + Math.ceil(Math.random() * 10))/100.0;

            lines.push(`(${id}, \'${formatDate(date)}\', ${converage})`);
        }

        return `${insertSql}\n${lines.join(',\n')};\n`;
    }
    

    var dummySql = createBugLevelDummy() + createBugReasonDummy() + createBugInfoDummy() + createRiskDummy() + createTestCoverageDummy();
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dummySql));
    pom.setAttribute('download', 'dummy.sql');
    pom.click();
})();


