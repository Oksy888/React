import './App.css'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import React, { useState, useEffect } from 'react'

function App() {
  const [geo, setGeo] = useState([])

  let id = '6709421144174233602'
  const URL = `https:sys-datapoint.flaidata.com/api/app/MusicExtendedData_v2?showrelated=false&showInCharts=false&period=365&withNegativeTrend=false&cutStates=true&limitVideos=1&musicId=${id}`
  const headers = {
    securityKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXQiOiJ3b3JkIiwibmJmIjoxNjc0ODA5MjE2LCJleHAiOjE5OTA0Mjg0MTYsImlhdCI6MTY3NDgwOTIxNiwiaXNzIjoiU2VydmVyIiwiYXVkIjoiQ2xpZW50In0.6i_jgx_kOn0_PR1IJXfgj4JggNDeNvbLgLHZ-8N7TOE',
    applicationId: 1,
    appVersion: 1,
    deviceId: '7a9d25d1-5a7d-40df-b58d-be8adb02ca8b',
  }
  let popularity = []
  async function getPopularityBySound(id) {
    try {
      const res = await fetch(URL, {
        headers: headers,
      })
      const data = await res.json()

      if (!res.ok) {
        return
      }

      popularity = data.musicLocationExtended
      //console.log(popularity)
      return data.musicLocationExtended
    } catch (error) {
      console.log(error)
    }
  }
  // id = '7283588810008742688'

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getPopularityBySound(id)
        if (response) {
          onItemLoaded(response)
        } else {
          console.error('Error fetching data')
        }
      } catch (error) {
        console.error(error)
      }
    }
  }, [id])

  useEffect(() => {}, [])

  function onItemLoaded(char) {
    const allGeo = char.map((item) => {
      return {
        id: item.locationCode,
        value: item.rate,
      }
    })
    setGeo(allGeo)
  }
  const onError = () => {
    console.log('Error')
  }
  am4core.useTheme(am4themes_animated)

  var chart = am4core.create('chartdiv', am4maps.MapChart)
  chart.hiddenState.properties.opacity = 0 // this creates initial fade-in

  chart.geodata = am4geodata_worldLow
  chart.projection = new am4maps.projections.Miller()

  var title = chart.chartContainer.createChild(am4core.Label)
  title.text = 'Popularity'
  title.fontSize = 20
  title.paddingTop = 30
  title.align = 'center'
  title.zIndex = 100

  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries())
  var polygonTemplate = polygonSeries.mapPolygons.template
  polygonTemplate.tooltipText = "{name}: {value.value.formatNumber('#.0')}"
  polygonSeries.heatRules.push({
    property: 'fill',
    target: polygonSeries.mapPolygons.template,
    min: am4core.color('#978fec'),
    max: am4core.color('#7367F0'),
  })
  polygonSeries.useGeodata = true

  // add heat legend
  var heatLegend = chart.chartContainer.createChild(am4maps.HeatLegend)
  heatLegend.valign = 'bottom'
  heatLegend.align = 'left'
  heatLegend.width = am4core.percent(100)
  heatLegend.series = polygonSeries
  heatLegend.orientation = 'horizontal'
  heatLegend.padding(20, 20, 20, 20)
  heatLegend.valueAxis.renderer.labels.template.fontSize = 10
  heatLegend.valueAxis.renderer.minGridDistance = 40

  polygonSeries.mapPolygons.template.events.on('over', (event) => {
    handleHover(event.target)
  })

  polygonSeries.mapPolygons.template.events.on('hit', (event) => {
    handleHover(event.target)
  })

  function handleHover(mapPolygon) {
    if (!isNaN(mapPolygon.dataItem.value)) {
      heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value)
    } else {
      heatLegend.valueAxis.hideTooltip()
    }
  }

  polygonSeries.mapPolygons.template.strokeOpacity = 0.4
  polygonSeries.mapPolygons.template.events.on('out', (event) => {
    heatLegend.valueAxis.hideTooltip()
  })

  chart.zoomControl = new am4maps.ZoomControl()
  chart.zoomControl.valign = 'top'

  // life expectancy data
  polygonSeries.data = geo
  // excludes Antarctica
  polygonSeries.exclude = ['AQ']
  // Create map instance
  /*  var chart = am4core.create('chartdiv', am4maps.MapChart)

  // Set map definition
  chart.geodata = am4geodata_worldLow

  // Set projection
  chart.projection = new am4maps.projections.Miller()

  // Create map polygon series
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries())

  // Make map load polygon (like country names) data from GeoJSON
  polygonSeries.useGeodata = true

  // Configure series
  var polygonTemplate = polygonSeries.mapPolygons.template
  polygonTemplate.tooltipText = '{value}' + '%'
  polygonTemplate.fill = am4core.color('#babfc7')

  // Create hover state and set alternative fill color
  var hs = polygonTemplate.states.create('hover')
  hs.properties.fill = am4core.color('#82868b')

  // Remove Antarctica
  polygonSeries.exclude = ['AQ']

  // Add some data
  polygonSeries.data = geo

  // Bind "fill" property to "fill" key in data
  polygonTemplate.propertyFields.fill = 'fill'
*/
  return <div id="chartdiv"></div>
}

export default App
