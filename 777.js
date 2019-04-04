window.onload = function () {
	var search = document.getElementById("search");
	var  send_btn = document.getElementById("send_btn");

	send_btn.onclick = function () {
    	var input = $("#search").val();
        console.log(input);

	    axios({
        url: "https://5d61y1zmsd.execute-api.us-east-2.amazonaws.com/prod/chat",
        
        method: 'post',
        data: {
            'name':input   
        },
        }).then(response => {
            

        var dom = document.getElementById("container");
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
        data: splitData(response.data.body).categoryData
    },
    yAxis: {
            type : 'value',
            scale:true,
            boundaryGap: [0.01, 0.01]
    },
    series: [{
        name: "Time:",
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
        console.log(response);
        response = $.parseJSON(response);
        console.log(response);
          for (var key in response) {
                var dateString = key;
            categoryData.push(dateString);
            values.push([response[key][0],response[key][1],response[key][3],response[key][2]]);
                        volumns.push(response[key][4]);
        }

        console.log('aaa');
        return {
            categoryData: categoryData,
            values: values,
            volumns: volumns
        };
    };
