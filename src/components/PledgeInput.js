import React, {Component} from 'react';
import { pledgeProject } from '../actions/projectActions';
import '../../node_modules/react-select/dist/react-select.css';
import SJCoin from '../components/sjCoin';
import Modal from 'react-modal';
import classNames from 'classnames';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class PledgeInput extends Component {

  constructor(props) {
    super();
    this.state = {
      value: '',
      show: props.show,
      error: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openConfirmation = this.openConfirmation.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      show: newProps.show
    });
  }

  handleChange(event) {
    let value = parseInt(event.target.value);
    value = value ? value : '';
    this.setState({
      value,
      error: false,
    });

  }

  handleSubmit() {
    this.props.dispatch(pledgeProject(this.props.id, this.state.value));
  }

  openConfirmation() {
    if (this.state.value == '') {
      this.setState({
        error: true,
      });
      return;
    }

    this.setState({
      show: true,
    });
  }

  closeModal() {
    this.setState({
      show: false,
    })
  }

  render() {
    const formClass = classNames('form-group', {'has-error': this.state.error});
    return (
      <div className="form-inline project-pledge-form">
        <div className={formClass}>
          <label className="sr-only" htmlFor="InputAmount">Amount</label>
          <div className="input-group">
            <div className="input-group-addon"><SJCoin/></div>
            <input
              type="text"
              value={this.state.value}
              size="5"
              onChange={this.handleChange}
              className="form-control"
              id="InputAmount"
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.openConfirmation}
            style={{marginLeft: '10px'}}
          >
            Pledge
          </button>
        </div>
        <Modal
          isOpen={this.state.show}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <div className="pledge-modal">
            <div className="modal-header">
              <h3 className="modal-title text-center" id="">Confirm pledge</h3>
            </div>
            <div className="modal-body text-center">
              <button className="btn btn-success" onClick={this.handleSubmit}>
                Pledge <b><SJCoin />{this.state.value}</b>
              </button>
              <button className="btn btn-default" onClick={this.closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}