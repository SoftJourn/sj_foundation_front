import React, {Component} from 'react';
import { pledgeProject } from '../../actions/projectActions';
import '../../../node_modules/react-select/dist/react-select.css';
import SJCoin from '../../components/sjCoin';
import Modal from 'react-modal';
import classNames from 'classnames';
import {Link} from 'react-router';

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

export default class DonationModal extends Component {

  constructor(props) {
    super();
    this.state = {
      value: '',
      id: props.id,
      title: props.title,
      show: props.show,
      error: false,
      user: props.user,
      pledgeSum: props.pledgeSum,
      balance: props.balance,
      canPledgeMore: false,
      confirm: false,
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
    this.setState({
      value:'',
      confirm: false,

    });
    this.props.dispatch(pledgeProject(this.props.id, this.state.value));
    this.props.onClose();
  }

  handleDonate() {
    this.setState({
      confirm: true
    })
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
    if (!this.state.user.loggedIn) {
      return null;
    }
    const formClass = classNames('form-group', {'has-error': this.state.error});
    return (
      <div className="form-inline raw project-pledge-form">
        <Modal
          isOpen={this.state.show}
          onRequestClose={this.props.onClose}
          style={customStyles}
          contentLabel="A"
        >
          <div className="pledge-modal">
            <div className="modal-header">
              <h3 className="modal-title" id="">{this.state.title}</h3>
            </div>
            <div className="modal-body text-center">
              {this.state.confirm &&
                <div>
                  <button className="btn btn-donate btn-success" onClick={this.handleSubmit.bind(this)}>
                    Confirm donate <b><SJCoin />{this.state.value}</b>
                  </button>
                  <button className="btn btn-default" onClick={this.props.onClose}>
                    Cancel
                  </button>
                </div>
              }
              {!this.state.confirm &&
                <div>
                  <div className="form-inline">
                    <div className="form-group">
                      <input type="numbers" autofocus className="form-control" size="10" value={this.state.value} onChange={this.handleChange} placeholder="amount" />
                    </div>
                    <div className="form-group">
                      <button className="btn btn-donate btn-success" onClick={this.handleDonate.bind(this)}>
                        Donate
                      </button>
                    </div>
                    <div className="form-group">
                      <button className="btn btn-default" onClick={this.props.onClose}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}