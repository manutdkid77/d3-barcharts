var canvas = d3.select("svg");

var iWidth = canvas.attr("width");
var iHeight = canvas.attr("height");

var margin = { top: 20, right: 40, bottom: 40, left: 100 };
var iInnerWidth = iWidth - margin.right - margin.left;
var iInnerHeight = iHeight - margin.top - margin.bottom;

var colorNoData = "#979797";
var colorAssesments = "#038181";
var colorTraining = "#006666";
var colorPolicy = "#004C4C";
var colorGap = "#66B2B2";

var backupJson = [
    { "name": "Steven", "percentages": [100, 20, 70] },
    { "name": "Wilson", "percentages": [70, 60, 10] },
    { "name": "Misha", "percentages": [5, 3, 41] },
    { "name": "Haley", "percentages": [5, 3, 41] },
    { "name": "Jim", "percentages": ["", "", ""] },
    { "name": "Christina", "percentages": [60, 15, 84] }
]

d3.json("https://api.myjson.com/bins/11twcw")
    .then(data => bindBarChart(data))
    .catch((error) => {
        //If failed to load json from api, use backupJson
        bindBarChart(backupJson);
    });

function bindBarChart(jsonData) {

    var xScale = d3.scaleLinear()
        .domain([0, 300])
        .range([0, iInnerWidth]);

    var yScale = d3.scaleBand()
        .domain(jsonData.map(d => {
            return d.name;
        }))
        .paddingInner(0.15)
        .paddingOuter(0.1)
        .range([0, iInnerHeight]);

    var parentGroup = canvas.append("g");

    parentGroup.attr("transform", `translate(${margin.left},${margin.top})`);

    var groups = parentGroup.selectAll("rect")
        .data(jsonData)
        .enter()
        .append("g");

    var group1 = groups.append("g").attr("data-groupID", "group1");

    group1.append("rect")
        .attr("width", xScale(100))
        .attr("height", yScale.bandwidth())
        .attr("y", d => yScale(d.name))
        .attr("fill", function (d) {
            //check if valid, otherwise show Gray color (NoData)
            if (d.percentages[0])
                return colorGap;
            else
                return colorNoData;
        });

    group1.append("rect")
        .attr("width", function (d) {
            return xScale(d.percentages[0]);
        })
        .attr("height", yScale.bandwidth())
        .attr("y", d => yScale(d.name))
        .attr("fill", function (d) {
            //check if valid, otherwise show Gray color (NoData)
            if (d.percentages[0])
                return colorAssesments;
            else
                return colorNoData;
        });

    group1.append("text")
        .attr("x", xScale(0))
        .attr("y", function (d) {
            var rectHeight = yScale.bandwidth();
            return yScale(d.name) + rectHeight / 2;
        })
        .attr("width", xScale(100))
        .attr("text-anchor", "start")
        // .attr("alignment-baseline", "before-edge")
        .text(function (d) {

            //check if valid, otherwise show empty text (NoData)
            if (d.percentages[0])
                return d.percentages[0] + "%";
            else
                return "";
        })
        .style("fill", "white");

    var group2 = groups.append("g").attr("data-groupID", "group2");

    group2.append("rect")
        .attr("width", xScale(100))
        .attr("height", yScale.bandwidth())
        .attr("y", d => yScale(d.name))
        .attr("x", xScale(100))
        .attr("fill", function (d) {
            //check if valid, otherwise show Gray color (NoData)
            if (d.percentages[1])
                return colorGap;
            else
                return colorNoData;
        });


    group2.append("rect")
        .attr("width", function (d) {
            return xScale(d.percentages[1]);
        })
        .attr("height", yScale.bandwidth())
        .attr("y", d => yScale(d.name))
        .attr("x", xScale(100))
        .attr("fill", function (d) {
            //check if valid, otherwise show Gray color (NoData)
            if (d.percentages[1])
                return colorTraining;
            else
                return colorNoData;
        });

    group2.append("text")
        .attr("x", xScale(100))
        .attr("y", function (d) {
            var rectHeight = yScale.bandwidth();
            return yScale(d.name) + rectHeight / 2;
        })
        .attr("width", xScale(100))
        .attr("text-anchor", "start")
        .text(function (d) {

            //check if valid, otherwise show empty text (NoData)
            if (d.percentages[1])
                return d.percentages[1] + "%";
            else
                return "";
        })
        .style("fill", "white");

    var group3 = groups.append("g").attr("data-groupID", "group3");

    group3.append("rect")
        .attr("width", xScale(100))
        .attr("height", yScale.bandwidth())
        .attr("y", d => yScale(d.name))
        .attr("x", xScale(200))
        .attr("fill", function (d) {
            //check if valid, otherwise show Gray color (NoData)
            if (d.percentages[2])
                return colorGap;
            else
                return colorNoData;
        });

    group3.append("rect")
        .attr("width", function (d) {
            return xScale(d.percentages[2]);
        })
        .attr("height", yScale.bandwidth())
        .attr("y", d => yScale(d.name))
        .attr("x", xScale(200))
        .attr("fill", function (d) {
            //check if valid, otherwise show Gray color (NoData)
            if (d.percentages[2])
                return colorPolicy;
            else
                return colorNoData;
        });

    group3.append("text")
        .attr("x", xScale(200))
        .attr("y", function (d) {
            var rectHeight = yScale.bandwidth();
            return yScale(d.name) + rectHeight / 2;
        })
        .attr("width", xScale(100))
        .attr("text-anchor", "start")
        .text(function (d) {

            //check if valid, otherwise show empty text (NoData)
            if (d.percentages[2])
                return d.percentages[2] + "%";
            else
                return "";
        })
        .style("fill", "white");



    parentGroup.append("g").call(d3.axisLeft(yScale).tickSize(0).tickPadding(15))
        .attr("class", "axisGray")
    parentGroup.append("g").call(d3.axisBottom(xScale).tickSize(0).tickValues(0))
        .attr("transform", `translate(0,${iInnerHeight})`)
        .attr("class", "axisGray");
}

