'use client';

import { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';

export default function RotatingGlobe() {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);
    root._logo?.dispose();

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        projection: am5map.geoOrthographic(),
        panX: 'none',
        panY: 'none',
        wheelY: 'none',
      })
    );

    const backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );

    backgroundSeries.mapPolygons.template.setAll({
      fill: am5.color(0x1c64f2),
      fillOpacity: 0.95,
      stroke: am5.color(0x9bc4ff),
      strokeWidth: 0.6,
      strokeOpacity: 0.4,
    });

    const graticuleSeries = chart.series.push(
      am5map.GraticuleSeries.new(root, {
        step: 10,
      })
    );

    graticuleSeries.mapLines.template.setAll({
      stroke: am5.color(0xffffff),
      strokeOpacity: 0.15,
    });

    chart.set('rotationX', -80);
    chart.set('rotationY', 12);

    chart.animate({
      key: 'rotationX',
      from: -80,
      to: 280,
      duration: 24000,
      loops: Infinity,
      easing: am5.ease.linear,
    });

    return () => {
      root.dispose();
    };
  }, []);

  return <div ref={chartRef} className="earth-globe" aria-label="Rotating globe" />;
}