import React, { Component, View, Text } from 'react';
import CustomerHeader from './CustomerHeader';
import CustomerProfile from './CustomerProfile';
import CustomerDetail from './CustomerDetail';
import { PieChart, Pie, Sector, Cell } from 'Recharts';
const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300}];
const COLORS = ['#0088FE', '#eee'];

export default class Customer extends Component {

  constructor(props) {
    super(props);
    this.state= {displayMore: false}
    this.handleExpandClik = this.handleExpandClik.bind(this);
  }

  handleExpandClik(e, header) {
    header ? this.setState({displayMore: !this.state.displayMore}) :  this.setState({displayMore: true})
  }

  render() {
    return (
      <div className="job">
        <div className="panel panel-default customer">
          <CustomerHeader
            customer={this.props.customer}
            onClick={(event) => this.handleExpandClik(event, true)}
            />
          <div className="panel-body" onClick={this.handleExpandClik}>
            <div className="row">
              <div className="col-sm-4">
                <CustomerProfile customer={this.props.customer} />
              </div>
              <div className="col-sm-4">
              </div>
              <div className="col-sm-4">
                <div className="row">
                  <div className="col-sm-6">
                    Wealth Index: {this.props.customer.otherData.score}
                    <PieChart width={200} height={100} onMouseEnter={this.onPieEnter}>
                      <Pie
                        data={data}
                        cx={50}
                        cy={50}
                        innerRadius={30}
                        outerRadius={40}
                        fill="#8884d8"
                        paddingAngle={3}
                        >
                        {
                          data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                        }
                      </Pie>
                    </PieChart>
                  </div>
                  <div className="col-sm-6">
                    Confidence Index: {this.props.customer.otherData.confidence}
                    <PieChart width={200} height={100} onMouseEnter={this.onPieEnter}>
                      <Pie
                        data={data}
                        cx={50}
                        cy={50}
                        innerRadius={30}
                        outerRadius={40}
                        fill="#8884d8"
                        paddingAngle={3}
                        >
                        {
                          data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                        }
                      </Pie>
                    </PieChart>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              { this.state.displayMore ? <CustomerDetail
                customer={this.props.customer}
                /> : null}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
