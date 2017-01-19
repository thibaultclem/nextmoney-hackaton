import React, { Component, View, Text } from 'react';
import Account from './Account';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from 'Recharts';

export default class FinancialDetail extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    var accountNodes = this.props.accounts ?
    this.props.accounts.map(function(account) {
      return (
        <Account
          key={account.account_key}
          account={account}
          />
      );
    })
    : null;

    var data = [];

    for (var key in this.props.wealthData) {
      if (this.props.wealthData.hasOwnProperty(key)) {
        data.push({subject: key, fullMark: 0.5, value: this.props.wealthData[key]});
      }
    }

    return (
      <div className="row customer-financial-detail">
        <div className="row">
          <div className="col-sm-7">
            {accountNodes}
          </div>
          <div className="col-sm-5">
            <RadarChart cx={200} cy={175} outerRadius={100} width={400} height={350} data={data}>
              <Radar name="Mike" dataKey="value" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6}/>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis domain={[0, 0.5]} tick='false'/>
            </RadarChart>
          </div>
        </div>
      </div>
);
}
}
