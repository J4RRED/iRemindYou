import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment';
import Roll from 'react-reveal/Roll';
import ScrollableAnchor from 'react-scrollable-anchor';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: " ",
      dueDate: ''
    }
  }

  addReminder() {
    console.log('this.state.dueDate', this.state.dueDate);
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
    <ul className='list-group col-sm-4'>
      {
        reminders.map(reminder => {
          return (
            <li key={reminder.id} className='list-group-item'>
              <div className='list-item'>
                <div>{reminder.text}</div>
                <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
              </div>
              <div
                className='list-item delete-button'
                onClick={() => this.deleteReminder(reminder.id)}
                >
                &#x2715;
              </div>
            </li>
          )
        })
      }
    </ul>)
  }

  render() {
    return (
      /* jsx for title page only */
      <div className='App'>
        <section id='top-page-layout'>
          <div
            className='roller center-div center-all div-box'
            >
              {/*}<div className="opacity">Welcome to...</div>*/}
            <Roll top cascade>
              <a href='bottom-page'>
                iRemindYou
              </a>
            </Roll>
          </div>
        </section>

        {/* Actual jsx for reminder app */}
        <section id='bottom-page-layout'>
        <div
          className='title'>
          iRemindYou
        </div>
        <div className='form-inline reminder-form'>
          <div className='form-group'>
            <input
              className='form-control'
              placeholder='I have to...'
              onChange={event => this.setState({text: event.target.value})}
            />
            <input
              className='form-control'
              type='datetime-local'
              onChange={event => this.setState({dueDate: event.target.value})}
              />
          </div>
          <button
            type='button'
            className='btn btn-success button'
            onClick={() => this.addReminder()}
          >
            Add Reminder
          </button>
        </div>
        {/* return reminders list */}
        { this.renderReminders() }
        {/* clear all button */}
        <div
          className='btn btn-danger clear-button center-clear-btn'
          onClick={() => this.props.clearReminders()}
          >
            Clear Reminders
        </div>
      </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  }
}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);
