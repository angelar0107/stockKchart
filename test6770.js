window.onload = function () {
	var search = document.getElementById("search");
	var  send_btn = document.getElementById("send_btn");

	send_btn.onclick = function () {
    	var input = $("#search").val();

	    axios({
        url: "https://j1j442rwp8.execute-api.us-east-2.amazonaws.com/chat/chat",
        
        method: 'post',
        data: {
            'name':input   
        },
        }).then(response => {

        var dom = document.getElementById("container1");
var myChart = echarts.init(dom);
var app = {};
option = null;

option = {
    tooltip : {
    trigger: 'axis',
    formatter: function (params) {
        var res = params[0].seriesName + ' ' + params[0].name;
        res += '<br/> open: ' + params[0].value[1] + ' high: ' + params[0].value[4];
        res += '<br/> close: ' + params[0].value[2] + '  low: ' + params[0].value[3];
        return res;
        }
    },
    xAxis: {
        data: splitData(response.data.body).volumns
    },
    yAxis: {
            type : 'value',
            scale:true,
            boundaryGap: [0.01, 0.01]
    },
    series: [{
        name: "volumns:",
        type: 'k',
        data: splitData(response.data.body).values
    }]
};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}

    });

    }


}


function splitData(response) {
        var categoryData = [];
        var values = [];
        var volumns = [];
        response = $.parseJSON(response);
        
        for (var i = 0; i < response.length; i++) {
                        var dateString = i+1;
            categoryData.push(dateString);
            values.push([response[i].open,response[i].close,response[i].low,response[i].high]);
                        volumns.push(response[i].volume);
        }
        return {
            categoryData: categoryData,
            values: values,
            volumns: volumns
        };
    };
