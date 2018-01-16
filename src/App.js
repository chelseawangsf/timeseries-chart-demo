import React, { Component } from 'react';
import logo from './logo.svg';
import Rx from 'rxjs/Rx';
import './App.css';
import { Event, Stream, Pipeline, TimeEvent, TimeSeries, TimeRange } from 'pondjs';
import Ring from 'ringjs';
import { ChartContainer, ChartRow, YAxis, Charts, LineChart } from 'react-timeseries-charts';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialTime: new Date(),
      latestTime: new Date(),
      events: new Ring(200),
    }
  }

  componentWillMount() {
    this.stream = new Stream();
    const values$ = Rx.Observable.interval(60).map(x => ({value: Math.random() * 12000}));
    values$.subscribe(value => {
      const newEvents = this.state.events;
      const time = new Date();
      const event = new TimeEvent(time, value);
      newEvents.push(event);
      this.setState({
        latestTime: time,
        events: newEvents
      });
      this.stream.addEvent(event);
    })
  }

  render() {
    const rawSeries = new TimeSeries({
      name: 'raw',
      events: this.state.events.toArray()
    });
    let timeRange = rawSeries.timerange();
    if (!timeRange) {
      timeRange = new TimeRange(this.state.initialTime, this.state.latestTime);
    }
    return (
      <ChartContainer timeRange={timeRange}>
        <ChartRow height='150'>
          <YAxis
            id='y'
            label='Value'
            min={0} max={15000}
            type='linear' />
          <Charts>
            <LineChart
              axis='y'
              series={rawSeries} />
          </Charts>
        </ChartRow>
      </ChartContainer>
    );
  }
}

export default App;
