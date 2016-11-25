import React, {Component} from 'react';
import { pledgeProject } from '../actions/projectActions';
import '../../node_modules/react-select/dist/react-select.css';
import SJCoin from '../components/sjCoin';
import Modal from 'react-modal';
import classNames from 'classnames';

const customStyles = {
  zIndex: 3,
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

export default class PledgeInput extends Component {

  constructor(props) {
    super();
    this.state = {
      value: '',
      show: props.show,
      error: false,
      pledgeSum: props.pledgeSum,
      balance: props.balance,
      canPledgeMore: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openConfirmation = this.openConfirmation.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      show: newProps.show,
      pledgeSum: newProps.pledgeSum,
      balance: newProps.balance,
      canPledgeMore: false,
    });
  }

  handleChange(event) {
    const {balance, pledgeSum, canPledgeMore} = this.state;
    let value = parseInt(event.target.value);
    value = value ? value : '';
    if (value > balance || (value > pledgeSum && canPledgeMore)) {
      this.setState({
        value,
        error: true,
      });
    } else {
      this.setState({
        value,
        error: false,
      });
    }
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
      <div className="form-inline raw project-pledge-form">
        <div className={formClass}>
          <label className="sr-only" htmlFor="InputAmount">Amount</label>
          <div className="input-group " style={{float: 'left'}}>
            {/*<div className="input-group-addon"><SJCoin/></div>*/}
            <input
              type="text"
              value={this.state.value}
              size="6"
              placeholder='amount'
              onChange={this.handleChange}
              className="form-control"
              id="InputAmount"
            />
          </div>
            <button
              type="button"
              className="btn btn-primary donate-button"
              onClick={this.openConfirmation}
              style={{marginLeft: '10px'}}
            >
              Donate
            </button>
        </div>
        <Modal
          isOpen={this.state.show}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <div className="pledge-modal">
            <div className="modal-header">
              <h3 className="modal-title text-center" id="">Confirm donation</h3>
            </div>
            <div className="modal-body text-center">
              <button className="btn btn-success" onClick={this.handleSubmit}>
                Donate <b><SJCoin />{this.state.value}</b>
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