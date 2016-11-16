import React, {Component} from 'react';
import { pledgeProject } from '../actions/projectActions';
import '../../node_modules/react-select/dist/react-select.css';
import SJCoin from '../components/sjCoin';
import Modal from 'react-modal';

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

export default class PledgeModal extends Component {

  constructor(props) {
    super();
    this.state = {
      value: '',
      show: props.show,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      show: newProps.show
    });
  }

  handleChange(event) {
    let value = parseInt(event.target.value);
    value = value ? value : '';
    this.setState({value});
  }

  handleSubmit() {
    this.props.dispatch(pledgeProject(this.props.id, this.state.value));
  }

  closeModal() {
    this.setState({
      show: false,
    })
  }

  render() {
    return (
      <Modal
        isOpen={this.state.show}
        contentLabel="Back this project"
        onRequestClose={this.closeModal}
        style={customStyles}
      >
        <div>
            <div className="modal-header ">
              <h3 className="modal-title text-center" id="">Back this project</h3>
            </div>
            <div className="modal-body">
              <div className="form-inline">
                <div className="form-group">
                  <label className="sr-only" htmlFor="InputAmount">Amount</label>
                  <div className="input-group">
                    <div className="input-group-addon"><SJCoin/></div>
                    <input
                      type="text"
                      value={this.state.value}
                      size="8"
                      onChange={this.handleChange}
                      className="form-control"
                      id="InputAmount"
                      placeholder="amount"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.handleSubmit}
                  style={{marginLeft: '10px'}}
                >
                  Pledge
                </button>
              </div>
          </div>
        </div>
      </Modal>
    );
  }
}