<template>

    <div>
      <router-view></router-view>
      <!-- 头部 -->
   <div class="index-header">
<el-row  type="flex"  justify="space-around" align="middle">
    <!-- 进度条开始 -->
  <el-col :span="5" v-for="col in colors" :key="col.percentage">
    <el-card shadow="always" class="index-header-card     " :class="col.card">
        <el-col :span="22"  type="flex"  justify="center" align="middle">
            <el-progress type="dashboard" :percentage="col.percentage" :color="col.color"></el-progress>
            <el-tag type="success">CPU使用率</el-tag>
        </el-col>
    </el-card> 
  </el-col>
</el-row>
<!-- 进度条结束 -->
   </div>
   <!-- 饼图 -->
<div class="index-bing">
    <div id="main" style="width: 100%;height:500px;margin-top:30px;"></div>
</div>

    </div>

</template>

<script>
export default {
  data() {
    return {
      percentage: 10,
      colors: [
        { color: "#f56c6c", percentage: 10, card: "card1" },
        { color: "#e6a23c", percentage: 35, card: "card2" },
        { color: "#6f7ad3", percentage: 85, card: "card3" },
        { color: "#e6a23c", percentage: 20, card: "card4" }
      ]
    };
  },
  mounted() {
    this.drow();
  },
  methods: {
    drow() {
      var echarts = require("echarts");

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      setTimeout(function() {
        var option = {
          legend: {},
          tooltip: {
            trigger: "axis",
            showContent: false
          },
          dataset: {
            source: [
              ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
              ["Matcha Latte", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
              ["Milk Tea", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
              ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
              ["Walnut Brownie", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
            ]
          },
          xAxis: { type: "category" },
          yAxis: { gridIndex: 0 },
          grid: { top: "55%" },
          series: [
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            {
              type: "pie",
              id: "pie",
              radius: "30%",
              center: ["50%", "25%"],
              label: {
                formatter: "{b}: {@2012} ({d}%)"
              },
              encode: {
                itemName: "product",
                value: "2012",
                tooltip: "2012"
              }
            }
          ]
        };

        myChart.on("updateAxisPointer", function(event) {
          var xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            myChart.setOption({
              series: {
                id: "pie",
                label: {
                  formatter: "{b}: {@[" + dimension + "]} ({d}%)"
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            });
          }
        });

        // 绘制图表
        myChart.setOption(option);
      });
    }
  }

  // 基于准备好的dom，初始化echarts实例

  // 指定图表的配置项和数据
};
</script>
<style>
.index-header {
  width: 100%;
  height: 200px;
  padding: 20px 0;
}
.index-bing {
  width: 100%;
  height: 500px;
  padding: 20px 0;
}

.index-header .index-header-card {
  height: 200px;
}
.index-header .index-header-card.card1 {
  background-color: rgb(103, 194, 58);
}
.index-header .index-header-card.card2 {
  background-color: rgb(230, 162, 60);
}
.index-header .index-header-card.card3 {
  background-color: rgb(245, 108, 108);
}
.index-header .index-header-card.card4 {
  background-color: rgb(144, 147, 153);
}
.index-svg {
  width: 126px;
  height: 126px;
  background: yellow;
}
</style>


