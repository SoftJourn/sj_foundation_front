import React from 'react';
import { connect } from 'react-redux';
import { nextFormTab } from '../../actions/formActions';
import { getProjectsCategories } from '../../actions/projectActions';
import Input from '../input/Input';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import '../../../node_modules/react-datepicker/dist/react-datepicker.css';

export class TabMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            title: props.title,
            price: props.price,
            donateMore: props.donateMore,
            due: props.due,
            categoryId: props.categoryId
        }
    }

    componentDidMount() {
        this.props.dispatch(getProjectsCategories());
    }

    dispatchNext() {
        this.state.name = this.state.name.value;
        this.state.price = this.state.price.value;
        this.props.dispatch(nextFormTab(this.state));

        // TODO: its wrong - do it with react-tabs handlers!
        document.querySelector('#react-tabs-2').click();
    }

    render() {
        return (
            <div className="row">
                <div className="col tab-inner">
                    <Input className="input-full-width"
                           value={input => this.state.name = input}
                           label="Project name"
                           placeholder="Enter name here"/>

                    <Input label="Price"
                           value={input => this.state.price = input}
                           placeholder="0"/>

                    <div className="pretty p-default">
                        <input type="checkbox"/>
                        <div className="state">
                            <label>Can donate more</label>
                        </div>
                    </div>

                    <div>
                        <label>Due date</label>
                        <DatePicker />
                    </div>

                    <div>
                        <label>Category</label>
                        <Select
                            name="form-field-name"
                            value={{ value: 'Social', label: 'Social' }}
                            options={[
                                { value: 'Social', label: 'Social' },
                                { value: 'Art', label: 'Art' },
                                { value: 'Design', label: 'Design' },
                                { value: 'Film&Video', label: 'Film&Video' },
                                { value: 'Food', label: 'Food' }
                            ]}
                        />
                    </div>

                    <div className="text-center">
                        <button className="btn btn-prime" onClick={() => {this.dispatchNext()}}>Next</button>
                    </div>
                    
                </div>
            </div>
        );
    }

}

const mapStateToProps = ({form, projects}, ownProps) => {
    return {
        form: form,
        categories: projects.categories
    };
};

export default connect(mapStateToProps)(TabMain);